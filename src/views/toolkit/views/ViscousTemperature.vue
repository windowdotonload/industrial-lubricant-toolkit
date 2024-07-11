<template>
  <div id="to-img-marker">
    <div class="section-title">黏温信息</div>
    <div class="section-input">
      <van-field :border="false" v-model="calcInput.Temp_1" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 210px">温度1（℃）</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.KV_1" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 260px">黏度1（cSt）</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.Temp_2" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 210px">温度2（℃）</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.KV_2" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 210px">黏度2（cSt）</span>
        </template>
      </van-field>
    </div>

    <div style="font-size: 12px; color: #d10000; margin-left: 12px; margin-bottom: -5px; margin-top: 10px">注意：计算结果仅在油品倾点20℃以上有参考意义</div>
    <div class="section-title">根据温度计算</div>
    <div class="section-input">
      <van-field :border="false" v-model="calcInput.Temp" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 210px">温度A（℃）</span>
        </template>
      </van-field>
    </div>
    <div class="section-title">计算结果</div>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 210px">黏度A</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.calc_RES1, 'cSt')" />
        <CopyButton :copyVal="calcOutput.calc_RES1" />
      </template>
    </van-field>

    <div class="section-title">根据黏度计算</div>
    <div class="section-input">
      <van-field :border="false" v-model="calcInput.KV" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 210px">黏度B（cSt）</span>
        </template>
      </van-field>
    </div>
    <div class="section-title">计算结果</div>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 210px">温度B</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.calc_RES2, '℃')" />
        <CopyButton :copyVal="calcOutput.calc_RES2" />
      </template>
    </van-field>
  </div>
  <ShareButton />
</template>

<script setup>
import ShareButton from "../../../components/ShareButton/index";
import CopyButton from "../../../components/CopyButton/index.vue";
import { simpleDeepClone, getBaseLog } from "../../../global/customerApi";
import * as VAL from "../../../utils/validate";

const { ref, reactive, watch, toRaw } = Vue;
const { Toast } = vant;

const calcInput = reactive({ Temp_1: 40, Temp_2: 100, KV_1: "", KV_2: "", Temp: "", KV: "" });
const calcOutput = reactive({ calc_RES1: "", calc_RES2: "" });
let Record = { Temp_1: 40, Temp_2: 100 };

watch(calcInput, (val) => {
  if (Record && val.Temp_1 == val.Temp_2) {
    Toast("请输入不同温度");
    if (val.Temp_1 == Record.Temp_1) calcInput.Temp_2 = "";
    if (val.Temp_2 == Record.Temp_2) calcInput.Temp_1 = "";
  }
  VAL.validateNumRange(val, "Temp_1", -40, 200, 1, true);
  VAL.validateNumRange(val, "Temp_2", -40, 200, 1, true);
  VAL.validateNumRange(val, "KV_1", 0, 46000, 1, true);
  VAL.validateNumRange(val, "KV_2", 0, 46000, 1, true);
  VAL.validateNumRange(val, "Temp", -40, 200, 1, true);
  VAL.validateNumRange(val, "KV", 0, 46000, 1, true);

  Record = Object.assign({}, { Temp_1: toRaw(calcInput).Temp_1, Temp_2: toRaw(calcInput).Temp_2 });

  calcRes(val);
});

const calcRes = () => {
  const { Temp_1, Temp_2, KV_1, KV_2, Temp, KV } = simpleDeepClone(calcInput);
  const Z1 = KV_1 + 0.7 + Math.exp(-1.47 - 1.84 * KV_1 - 0.51 * Math.pow(KV_1, 2));
  const Z2 = KV_2 + 0.7 + Math.exp(-1.47 - 1.84 * KV_2 - 0.51 * Math.pow(KV_2, 2));
  const B = (getBaseLog(10, getBaseLog(10, Z1)) - getBaseLog(10, getBaseLog(10, Z2))) / (getBaseLog(10, Temp_2 + 273.15) - getBaseLog(10, Temp_1 + 273.15));
  const A = getBaseLog(10, getBaseLog(10, Z2)) + B * getBaseLog(10, Temp_2 + 273.15);

  calcKV(Z1, Z2, B, A);
  calcTemp(Z1, Z2, B, A);
};
const calcKV = (Z1, Z2, B, A) => {
  const Temp = simpleDeepClone(calcInput).Temp;
  if (!Temp) {
    calcOutput.calc_RES1 = "";
  }
  const Z_KNOW = Math.pow(10, Math.pow(10, A - B * getBaseLog(10, Temp + 273.15)));
  const val = Z_KNOW - 0.7 - Math.exp(-0.7487 - 3.295 * (Z_KNOW - 0.7) + 0.6119 * (Math.pow(Z_KNOW - 0.7, 2) - 0.3193 * Math.pow(Z_KNOW - 0.7, 3)));
  calcOutput.calc_RES1 = val.toFixed(1);
};
const calcTemp = (Z1, Z2, B, A) => {
  const KV = simpleDeepClone(calcInput).KV;
  if (!KV) {
    calcOutput.calc_RES2 = "";
    return;
  }
  const Z_Input = KV + 0.7 + Math.exp(-1.47 - 1.84 * KV - 0.51 * Math.pow(KV, 2));
  const val = Math.pow(10, (A - getBaseLog(10, getBaseLog(10, Z_Input))) / B) - 273.15;
  calcOutput.calc_RES2 = val.toFixed(1);
};
</script>

<style lang="scss" scoped></style>
