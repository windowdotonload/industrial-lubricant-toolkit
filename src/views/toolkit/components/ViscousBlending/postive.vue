<template>
  <div id="to-img-marker">
    <div class="section-title">黏度数值<span class="tip-text">推荐输入40℃时油品的黏度</span></div>
    <van-field :border="false" v-model="calcInput.V_A" placeholder="请输入" input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px"> 油品A的黏度（cSt）</span>
      </template>
    </van-field>
    <van-field :border="false" v-model="calcInput.V_B" placeholder="请输入" input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px"> 油品B的黏度（cSt）</span>
      </template>
    </van-field>
    <div class="section-title">混合比例</div>
    <van-field :border="false" input-align="right" autocomplete="off" disabled>
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px"> 混合比例</span>
      </template>
      <template #right-icon>
        <van-radio-group style="padding: 0" checked-color="#001450" v-model="inputType" direction="horizontal">
          <van-radio name="percent">按比例输入</van-radio>
          <van-radio name="volume">按体积输入</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field v-show="inputType == 'percent'" :border="false" v-model="calcInput.P_A" placeholder="请输入" input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px"> 油品A的比例（%）</span>
      </template>
    </van-field>
    <van-field v-show="inputType == 'volume'" :border="false" v-model="calcInput.Volume_A" placeholder="请输入" input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px"> 油品A的体积（L）</span>
      </template>
    </van-field>
    <van-field v-show="inputType == 'volume'" :border="false" v-model="calcInput.Volume_B" placeholder="请输入" input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px"> 油品B的体积（L）</span>
      </template>
    </van-field>

    <div class="section-title">
      计算结果
      <span class="viewformula-btn" @click="viewFormula">查看公式</span>
    </div>
    <van-field :border="false" label-width="120px" disabled input-align="right">
      <template #label>
        <span style="color: #646566">混合油品黏度</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.Res, 'cSt')" />
        <CopyButton :copyVal="calcOutput.Res" />
      </template>
    </van-field>
  </div>
  <ShareButton />
  <van-dialog v-model:show="show" :show-cancel-button="false" confirm-button-color="#000">
    <div class="formula-title">公式</div>
    <div style="display: flex; justify-content: center">
      <img src="../../../../assets/u215.png" alt="" style="width: 60%" />
    </div>

    <div class="formula-title">其中</div>
    <div style="width: 100%; display: flex; justify-content: center">
      <img src="../../../../assets/u216.png" alt="" style="width: 60%" />
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
const calcInput = reactive({ V_A: "", V_B: "", P_A: "", Volume_A: "", Volume_B: "" });
const calcOutput = reactive({ Res: "" });
const inputType = ref("percent");
const show = ref(false);
const viewFormula = () => {
  show.value = true;
};
const closeDialog = () => {
  show.value = false;
};

watch(
  () => inputType.value,
  () => {
    calcOutput.Res = "";
  }
);
watch([calcInput, inputType], ([val, _]) => {
  VAL.validateNumRange(val, "V_A", 0, 46000, 1);
  VAL.validateNumRange(val, "V_B", 0, 46000, 1);
  if (inputType.value == "percent") calc_percent(val);
  else calc_volume(val);
});
const calc_percent = (val) => {
  VAL.validateNumRange(val, "P_A", 0, 100, 1);
  const { V_A: viscosityA, V_B: viscosityB, P_A: ARatio } = simpleDeepClone(calcInput);

  const WA = getBaseLog(10, getBaseLog(10, viscosityA + 0.7));
  const WB = getBaseLog(10, getBaseLog(10, viscosityB + 0.7));
  const P_A = ARatio / 100;
  const WBlend = P_A * WA + (1 - P_A) * WB;
  const Viscosity_Mix = Math.pow(10, Math.pow(10, WBlend)) - 0.7;
  calcOutput.Res = Viscosity_Mix.toFixed(1);
  judgeClearValue(val, calcOutput, ["V_A", "V_B", "P_A"]);
};

const calc_volume = (val) => {
  VAL.validateNumRange(val, "Volume_A", 0, 9999999, 1);
  VAL.validateNumRange(val, "Volume_B", 0, 9999999, 1);
  const { V_A: viscosityA, V_B: viscosityB, Volume_A: volumeA, Volume_B: volumeB } = simpleDeepClone(calcInput);

  const WA = getBaseLog(10, getBaseLog(10, viscosityA + 0.7));
  const WB = getBaseLog(10, getBaseLog(10, viscosityB + 0.7));
  const P_A = volumeA / (volumeA + volumeB);
  const WBlend = P_A * WA + (1 - P_A) * WB;
  const Viscosity_Mix = Math.pow(10, Math.pow(10, WBlend)) - 0.7;
  calcOutput.Res = Viscosity_Mix.toFixed(1);
  judgeClearValue(val, calcOutput, ["V_A", "V_B", "Volume_A", "Volume_B"]);
};
</script>

<style lang="scss" scoped>
:deep(.van-field__right-icon) {
  padding-right: 0;
}
</style>
