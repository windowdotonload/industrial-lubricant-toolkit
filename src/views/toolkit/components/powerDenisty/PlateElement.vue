<template>
  <div id="to-img-marker">
    <div class="section-title">计算信息</div>
    <van-field :border="false" v-model="calcInput.w" placeholder="请输入" input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px"> 板加热元件宽度（cm）</span>
      </template>
    </van-field>
    <van-field :border="false" v-model="calcInput.l" placeholder="请输入" input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px"> 板加热元件长度（cm）</span>
      </template>
    </van-field>
    <van-field :border="false" v-model="calcInput.P" placeholder="请输入" input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px"> 加热元件额定功率（W）</span>
      </template>
    </van-field>

    <div class="section-title">
      计算结果
      <span class="viewformula-btn" @click="viewFormula">查看公式</span>
    </div>
    <van-field :border="false" label-width="120px" disabled input-align="right">
      <template #label>
        <span style="color: #646566">板加热元件表面积</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.A, 'cm²')" />
        <CopyButton :copyVal="calcOutput.A" />
      </template>
    </van-field>
    <van-field :border="false" label-width="120px" disabled input-align="right">
      <template #label>
        <span style="color: #646566">加热元件功率密度</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.NV, 'W/cm²')" />
        <CopyButton :copyVal="calcOutput.NV" />
      </template>
    </van-field>
  </div>
  <ShareButton />

  <van-dialog v-model:show="show" :show-cancel-button="false" confirm-button-color="#000">
    <div class="formula-title">公式</div>
    <div style="display: flex; justify-content: center">
      <img src="../../../../assets/u213.png" alt="" style="height: 50px" />
    </div>
    <div style="display: flex; justify-content: center">
      <img src="../../../../assets/u201_1.png" alt="" style="height: 80px" />
    </div>

    <div class="formula-title">其中</div>
    <div style="width: 100%; display: flex; justify-content: center">
      <img src="../../../../assets/u214.png" alt="" style="height: 170px" />
    </div>
    <div style="display: flex; justify-content: center">
      <img src="../../../../assets/u202.png" alt="" style="height: 50px" />
    </div>

    <template #footer>
      <div class="footer-btn" @click="closeDialog">确定</div>
    </template>
  </van-dialog>
</template>

<script setup>
import ShareButton from "../../../../components/ShareButton/index";
import CopyButton from "../../../../components/CopyButton/index.vue";
import { simpleDeepClone, getBaseLog } from "../../../../global/customerApi";
import * as VAL from "../../../../utils/validate";
const { reactive, ref, watch } = Vue;
const calcInput = reactive({ w: "", l: "", P: "" });
const calcOutput = reactive({ A: "", NV: "" });
const show = ref(false);
const viewFormula = () => {
  show.value = true;
};
const closeDialog = () => {
  show.value = false;
};

watch(calcInput, (val) => {
  VAL.validateNumRange(val, "w", 0, 1000, 3);
  VAL.validateNumRange(val, "l", 0, 1000, 3);
  VAL.validateNumRange(val, "P", 0, 10000000, 3);

  calcRes();
});
const calcRes = () => {
  if (!calcInput.w || !calcInput.l || !calcInput.P) {
    calcOutput.A = "";
    calcOutput.NV = "";
    return;
  }
  const { w, l, P } = simpleDeepClone(calcInput);
  const A = w * l;
  const NV = P / A;
  calcOutput.A = A.toFixed(3);
  calcOutput.NV = NV.toFixed(3);
};
</script>

<style lang="scss" scoped></style>
