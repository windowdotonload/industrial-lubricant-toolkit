<template>
  <div id="to-img-marker">
    <div class="section-title">基本信息</div>

    <div class="section-input">
      <van-field :border="false" v-model="calcInput.p" label="15℃时密度（Kg/L）" label-width="220px" placeholder="请输入" input-align="right" autocomplete="off" />
      <van-field :border="false" v-model="calcInput.V" label="原始容积（L）" label-width="220px" placeholder="请输入" input-align="right" autocomplete="off" />
      <van-field :border="false" v-model="calcInput.To" label="原始温度(℃)" label-width="220px" placeholder="请输入" input-align="right" autocomplete="off" />
    </div>
    <div class="section-title">计算信息</div>
    <van-field :border="false" v-model="calcInput.Tn" label="新温度(℃)" placeholder="请输入" input-align="right" autocomplete="off" />
    <div class="section-title">
      计算结果
      <span class="viewformula-btn" @click="viewFormula">查看公式</span>
    </div>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566"> 15℃时热膨胀系数</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.C, '/℃')" />
        <CopyButton :copyVal="calcOutput.C" />
      </template>
    </van-field>
    <van-field :border="false" label="新容积" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566"> 新容积</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.NV, 'L')" />
        <CopyButton :copyVal="calcOutput.NV" />
      </template>
    </van-field>
  </div>
  <ShareButton />

  <van-dialog v-model:show="show" :show-cancel-button="false" confirm-button-color="#000">
    <div class="formula-title">公式</div>
    <img src="../../../assets/u125.jpg" alt="" style="width: 100%" />
    <div class="formula-title">其中</div>
    <div style="width: 100%; display: flex; justify-content: center; margin-bottom: 15px">
      <img src="../../../assets/u126.jpg" alt="" style="height: 170px" />
    </div>
    <template #footer>
      <div class="footer-btn" @click="closeDialog">确定</div>
    </template>
  </van-dialog>
</template>

<script setup>
import ShareButton from "../../../components/ShareButton/index";
import CopyButton from "../../../components/CopyButton/index.vue";
import { simpleDeepClone } from "../../../global/customerApi";
import * as VAL from "../../../utils/validate";

const { ref, reactive, watch } = Vue;
const calcInput = reactive({ p: "", V: "", To: "", Tn: "" });
const calcOutput = reactive({ C: "", NV: "" });
const show = ref(false);

watch(calcInput, (val) => {
  VAL.validateNumRange(val, "p", 0, 25, 4);
  VAL.validateNumRange(val, "V", 0, 9000000000);
  VAL.validateNumRange(val, "To", -60, 200, 1, true);
  VAL.validateNumRange(val, "Tn", -60, 200, 1, true);
  calcRes();
});

const calcRes = () => {
  const { p, V, To, Tn } = simpleDeepClone(calcInput);
  if (!p || !V || !To || !Tn) {
    calcOutput.NV = "";
    return;
  }
  const C = -1.5304 * Math.pow(10, -12) * Math.pow(1000 * p, 3) + 9.5634843 * Math.pow(10, -9) * Math.pow(1000 * p, 2) - 1.49601486651 * Math.pow(10, -5) * 1000 * p + 0.007563616;
  const NV = V + V * (C * (Tn - To));
  calcOutput.C = C.toFixed(6);
  calcOutput.NV = NV.toFixed(4);
};

const viewFormula = () => {
  show.value = true;
};
const closeDialog = () => {
  show.value = false;
};
</script>

<style lang="scss" scoped></style>
