<template>
  <div id="to-img-marker">
    <div class="section-title">计算信息</div>
    <van-field :border="false" v-model="calcInput.Re" placeholder="请输入" input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px"> 冲洗目标雷诺数</span>
      </template>
    </van-field>
    <van-field :border="false" v-model="calcInput.Vl" placeholder="请输入" input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 190px"> 冲洗油40℃时黏度（cSt）</span>
      </template>
    </van-field>
    <van-field :border="false" v-model="calcInput.Vh" placeholder="请输入" input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 190px"> 冲洗油100℃时黏度（cSt）</span>
      </template>
    </van-field>
    <van-field :border="false" v-model="calcInput.T" placeholder="请输入" input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px"> 冲洗油冲洗时温度（℃）</span>
      </template>
    </van-field>
    <van-field :border="false" v-model="calcInput.d" placeholder="请输入" input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px"> 油管内径（mm）</span>
      </template>
    </van-field>

    <div class="section-title">计算结果</div>
    <van-field :border="false" label-width="120px" disabled input-align="right">
      <template #label>
        <span style="color: #646566"> 泵流量</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.Q, 'm³/h')" />
        <CopyButton :copyVal="calcOutput.Q" />
      </template>
    </van-field>
  </div>
  <ShareButton />
</template>

<script setup>
import ShareButton from "../../../../components/ShareButton/index";
import CopyButton from "../../../../components/CopyButton/index.vue";
import { simpleDeepClone, getBaseLog } from "../../../../global/customerApi";
import * as VAL from "../../../../utils/validate";
const { reactive, watch } = Vue;
const calcInput = reactive({ Re: "", d: "", Vl: "", Vh: "", T: "" });
const calcOutput = reactive({ Q: "" });

watch(calcInput, (val) => {
  VAL.validateNumRange(val, "Re", 0, 9000000, 3);
  VAL.validateNumRange(val, "d", 0, 90000, 3);
  VAL.validateNumRange(val, "Vl", 0, 1000000);
  VAL.validateNumRange(val, "Vh", 0, 1000000);
  VAL.validateNumRange(val, "T", -100, 200, 1, true);
  calcRes();
});
const calcRes = () => {
  if (!calcInput.Re || !calcInput.d || !calcInput.Vl || !calcInput.Vh || !calcInput.T) {
    calcOutput.Q = "";
    return;
  }
  const { Re, d, Vl, Vh, T } = simpleDeepClone(calcInput);
  const C = (getBaseLog(10, getBaseLog(10, Vh + 0.6)) - getBaseLog(10, getBaseLog(10, Vl + 0.6))) / (getBaseLog(10, 313) - getBaseLog(10, 373));
  const B = C * getBaseLog(10, 313) + getBaseLog(10, getBaseLog(10, Vl + 0.6));
  const TC = T + 273;

  const Vt = Math.pow(10, Math.pow(10, B - C * getBaseLog(10, TC))) - 0.6;
  const S = (Re * Vt) / d / 1000;
  const Q = (d * d * 3.1415926 * 36 * S) / 4 / 10000;
  calcOutput.Q = Q.toString().split(".")[0].length < 12 ? Q.toFixed(3) : Q.toExponential(5);
};
</script>

<style lang="scss" scoped></style>
