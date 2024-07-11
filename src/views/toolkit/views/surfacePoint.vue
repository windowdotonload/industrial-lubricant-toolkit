<template>
  <div id="to-img-marker">
    <div class="section-title">基本信息 <span class="viewformula-btn" @click="viewFormula">查看示例</span></div>

    <div class="section-input">
      <van-field :border="false" v-model="calcInput.Tair" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 210px">零部件表面附近空气的温度（℃)</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.RHair" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 260px">零部件表面附近空气的相对湿度（％）</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.Tsur" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 210px">零部件表面温度（℃)</span>
        </template>
      </van-field>
    </div>

    <div class="section-title">计算结果</div>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 210px">零部件表面附近空气的绝对湿度</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.AHair)" />
        <CopyButton :copyVal="calcOutput.AHair" />
      </template>
    </van-field>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 230px">零部件表面附近饱和空气的绝对湿度</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.AHsaturation)" />
        <CopyButton :copyVal="calcOutput.AHsaturation" />
      </template>
    </van-field>
    <van-field :border="false" label-width="120px" disabled input-align="right">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 210px">是否产生凝结水</span>
      </template>
      <template #right-icon>
        <span :style="{ color: calcOutput.isCondensate ? '#646566' : '#d10000' }">
          {{ calcOutput.isCondensate || "缺少必要信息" }}
        </span>
      </template>
    </van-field>
  </div>
  <ShareButton />
  <van-overlay :show="show" @click="show = false">
    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center">
      <img src="../../../assets/Example.png" alt="" style="width: 90%" />
    </div>
  </van-overlay>
</template>

<script setup>
import ShareButton from "../../../components/ShareButton/index";
import CopyButton from "../../../components/CopyButton/index.vue";
import { simpleDeepClone, getBaseLog } from "../../../global/customerApi";
import { tempToHumidity } from "../components/surfacePoint/data";
import * as VAL from "../../../utils/validate";

const { ref, reactive, watch } = Vue;

const calcInput = reactive({ Tair: "", RHair: "", Tsur: "" });
const calcOutput = reactive({ AHair: "", AHsaturation: "", isCondensate: "" });
const show = ref(false);

watch(calcInput, (val) => {
  VAL.validateNumRange(val, "Tair", -20, 100, 1, true);
  VAL.validateNumRange(val, "Tsur", -20, 100, 1, true);
  VAL.validateNumRange(val, "RHair", 0, 100, 1, true);

  calcRes();
});

const calcRes = () => {
  if (!calcInput.Tair.toString() || !calcInput.RHair.toString() || !calcInput.Tsur.toString()) {
    calcOutput.AHair = "";
    calcOutput.AHsaturation = "";
    calcOutput.isCondensate = "";
    return;
  }
  const { Tair, RHair, Tsur } = simpleDeepClone(calcInput);

  const AHair = (tempToHumidity[parseInt(Tair)] * RHair) / 100;
  const AHsaturation = tempToHumidity[parseInt(Tsur)];
  calcOutput.AHair = AHair.toFixed(1);
  calcOutput.AHsaturation = AHsaturation;
  calcOutput.isCondensate = AHair >= AHsaturation ? "是" : "否";
};

const viewFormula = () => {
  show.value = true;
};
const closeDialog = () => {
  show.value = false;
};
</script>

<style lang="scss" scoped></style>
