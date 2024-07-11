<template>
  <div id="to-img-marker">
    <div class="section-title">黏度数值<span class="tip-text">推荐输入40℃时油品的黏度</span></div>
    <van-field :border="false" v-model="calcInput.Viscosity_Mix" placeholder="请输入" input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 190px"> 混合油品的目标黏度（cSt）</span>
      </template>
    </van-field>
    <van-field :border="false" v-model="calcInput.Viscosity_A" placeholder="请输入" input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px"> 油品A的黏度（cSt）</span>
      </template>
    </van-field>
    <van-field :border="false" v-model="calcInput.Viscosity_B" placeholder="请输入" input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px"> 油品B的黏度（cSt）</span>
      </template>
    </van-field>
    <div class="section-title">补充信息</div>
    <van-field :border="false" v-model="calcInput.Volume_Mix" placeholder="请输入" input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px"> 混合油品的体积（L）</span>
      </template>
    </van-field>

    <div class="section-title">
      计算结果
      <span class="viewformula-btn" @click="viewFormula">查看公式</span>
    </div>
    <van-field :border="false" label-width="120px" disabled input-align="right">
      <template #label>
        <span style="color: #646566">A油品体积百分比</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.VolumeA_P, '%')" />
        <CopyButton :copyVal="calcOutput.VolumeA_P" />
      </template>
    </van-field>
    <van-field :border="false" label-width="120px" disabled input-align="right">
      <template #label>
        <span style="color: #646566">A油品体积</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.VolumeA_Res, 'L')" />
        <CopyButton :copyVal="calcOutput.VolumeA_Res" />
      </template>
    </van-field>
    <van-field :border="false" label-width="120px" disabled input-align="right">
      <template #label>
        <span style="color: #646566">B油品体积百分比</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.VolumeB_P, '%')" />
        <CopyButton :copyVal="calcOutput.VolumeB_P" />
      </template>
    </van-field>
    <van-field :border="false" label-width="120px" disabled input-align="right">
      <template #label>
        <span style="color: #646566">B油品体积</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.VolumeB_Res, 'L')" />
        <CopyButton :copyVal="calcOutput.VolumeB_Res" />
      </template>
    </van-field>
  </div>
  <ShareButton />
  <van-dialog v-model:show="show" :show-cancel-button="false" confirm-button-color="#000">
    <div class="formula-title">公式</div>
    <div style="display: flex; justify-content: center">
      <img src="../../../../assets/u217.png" alt="" style="width: 60%" />
    </div>

    <div class="formula-title">其中</div>
    <div style="width: 100%; display: flex; justify-content: center">
      <img src="../../../../assets/u218.png" alt="" style="width: 60%" />
    </div>

    <template #footer>
      <div class="footer-btn" @click="closeDialog">确定</div>
    </template>
  </van-dialog>
</template>

<script setup>
import ShareButton from "../../../../components/ShareButton/index";
import CopyButton from "../../../../components/CopyButton/index.vue";
import { simpleDeepClone, getBaseLog, judgeClearValue } from "../../../../global/customerApi";
import * as VAL from "../../../../utils/validate";
const { ref, reactive, watch } = Vue;
const calcInput = reactive({ Viscosity_Mix: "", Viscosity_A: "", Viscosity_B: "", Volume_Mix: "" });
const calcOutput = reactive({ VolumeA_Res: "", VolumeB_Res: "", VolumeA_P: "", VolumeB_P: "" });
const show = ref(false);
const viewFormula = () => {
  show.value = true;
};
const closeDialog = () => {
  show.value = false;
};

watch(calcInput, (val) => {
  VAL.validateNumRange(val, "Viscosity_Mix", 0, 46000, 1);
  VAL.validateNumRange(val, "Viscosity_A", 0, 46000, 1);
  VAL.validateNumRange(val, "Viscosity_B", 0, 46000, 1);
  VAL.validateNumRange(val, "Volume_Mix", 0, 9999999, 1);
  calcRes();
});
const calcRes = () => {
  const { Viscosity_Mix: viscosityTarget, Viscosity_A: viscosityA, Viscosity_B: viscosityB, Volume_Mix: volumeMix } = simpleDeepClone(calcInput);
  const P_A = (getBaseLog(10, getBaseLog(10, viscosityTarget + 0.7)) - getBaseLog(10, getBaseLog(10, viscosityB + 0.7))) / (getBaseLog(10, getBaseLog(10, viscosityA + 0.7)) - getBaseLog(10, getBaseLog(10, viscosityB + 0.7)));
  const P_B = 1 - P_A;
  const VolumeA = volumeMix * P_A;
  const VolumeB = volumeMix * P_B;
  calcOutput.VolumeA_Res = VolumeA.toFixed(1);
  calcOutput.VolumeB_Res = VolumeB.toFixed(1);
  calcOutput.VolumeA_P = (P_A * 100).toFixed(2);
  calcOutput.VolumeB_P = (P_B * 100).toFixed(2);

  judgeClearValue(calcInput, calcOutput);
};
</script>

<style lang="scss" scoped>
:deep(.van-field__right-icon) {
  padding-right: 0;
}
</style>
