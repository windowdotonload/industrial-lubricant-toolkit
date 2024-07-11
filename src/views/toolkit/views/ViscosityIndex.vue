<template>
  <div id="to-img-marker">
    <div class="section-title">黏度信息</div>
    <div class="section-input">
      <van-field :border="false" v-model="calcInput.KV_100" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 210px">黏度（100℃，cSt）</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.KV_40" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 260px">黏度（40℃，cSt）</span>
        </template>
      </van-field>
    </div>

    <div class="section-title">计算结果</div>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 210px">黏度指数</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.calc_Res)" />
        <CopyButton :copyVal="calcOutput.calc_Res" />
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
import { searchTable } from "../components/viscosityIndex/data";

const { ref, reactive, watch, toRaw } = Vue;
const { Toast } = vant;

const calcInput = reactive({ KV_100: "", KV_40: "" });
const calcOutput = reactive({ calc_Res: "" });

watch(calcInput, (val) => {
  VAL.validateNumRange(val, "KV_100", 0, 46000, 1, true);
  VAL.validateNumRange(val, "KV_40", 0, 46000, 1, true);

  calcRes(val);
});
const getSectionData = (searchKey) => {
  let res = {};
  Object.keys(searchTable).some((key) => {
    const section = key.split("-").map((item) => Number(item));
    if (searchKey > section[0] && searchKey <= section[1]) {
      res = searchTable[key];
      return true;
    }
  });
  return res;
};
const calcRes = () => {
  const { KV_40, KV_100 } = simpleDeepClone(calcInput);
  const preData = getSectionData(KV_100);
  const { a, b, c, d, e, f } = simpleDeepClone(preData);
  const L = a * Math.pow(KV_100, 2) + b * KV_100 + c;
  const H = d * Math.pow(KV_100, 2) + e * KV_100 + f;

  if (KV_40 > H) {
    const VI = ((L - KV_40) / (L - H)) * 100;
    calcOutput.calc_Res = Math.round(VI);
    return;
  }
  const VI = (Math.pow(10, (getBaseLog(10, H) - getBaseLog(10, KV_40)) / getBaseLog(10, KV_100)) - 1) / 0.00715 + 100;
  calcOutput.calc_Res = Math.round(VI);
};
</script>

<style lang="scss" scoped></style>
