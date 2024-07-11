<template>
  <div id="to-img-marker">
    <!-- Safe -->
    <div class="classify-section" style="display: flex; align-items: center; margin-bottom: 10px; flex-wrap: wrap">
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%">
        <div style="display: flex; align-items: center">
          <img src="../../../../assets/logo1.png" alt="" />
          <span style="display: inline-block; font-size: 20px; font-weight: bolder; color: #000">安全</span>
        </div>
        <div class="calc-btn" @click="goPage('Safe')">计算</div>
      </div>

      <div class="classify-result-box">
        <span>减少设备维护人员与设备的接触时间</span>
        <span style="color: #000; font-weight: bold">{{ showCalcRes(state.A_Gather_Res) }} 小时</span>
      </div>
    </div>
    <!-- Environment -->
    <div class="classify-section" style="display: flex; align-items: center; margin-bottom: 10px; flex-wrap: wrap">
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%">
        <div style="display: flex; align-items: center">
          <img src="../../../../assets/logo2.png" alt="" />
          <span style="display: inline-block; font-size: 20px; font-weight: bolder; color: #000">环保</span>
        </div>
        <div class="calc-btn" @click="goPage('Enviroment')">计算</div>
      </div>

      <div class="classify-result-box">
        <div style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 10px; cursor: pointer" @click="selUnit">
          <span>减少废油的产生和处置</span>
          <span style="color: #000; font-weight: bold">{{ showCalcRes(state.B_Gather_Res_1) }} {{ checkUnitName }}<van-icon name="arrow" color="#999" /></span>
        </div>
        <div style="display: flex; justify-content: space-between; width: 100%">
          <span>减少CO₂ 排放</span>
          <span style="color: #000; font-weight: bold">{{ showCalcRes(state.B_Gather_Res_2) }} 吨</span>
        </div>
      </div>
    </div>
    <!-- Efficient -->
    <div class="classify-section" style="display: flex; align-items: center; margin-bottom: 10px; flex-wrap: wrap">
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%">
        <div style="display: flex; align-items: center">
          <img src="../../../../assets/logo3.png" alt="" />
          <span style="display: inline-block; font-size: 20px; font-weight: bolder; color: #000">高效</span>
        </div>
        <div class="calc-btn" @click="goPage('Effcient')">计算</div>
      </div>

      <div class="classify-result-box">
        <span>降低设备维护成本和非计划停机损失，增加效益</span>
        <span style="color: #000; font-weight: bold">{{ showCalcRes(state.C_Gather_Res) }} 元</span>
      </div>
    </div>
  </div>

  <ShareButton @click="postImgUrl" :isConfirm="true" />
  <div id="selPppup"></div>
</template>

<script setup>
import { showPopup } from "../../../../components/Popup/index";
import ShareButton from "../../../../components/ShareButton/index";
import { delayExec } from "../../../../global/customerApi";
const { inject, ref, onActivated } = Vue;
const state = inject("state");
const mutation = inject("mutation");
const goPage = (page) => {
  mutation.chagneActive(page);
};
const postImgUrl = () => {
  ["img_url_safe", "img_url_enviro", "img_url_efficient"].forEach((key) => {
    if (state[key]) {
      wx.miniProgram.postMessage({
        data: {
          imgData: state[key],
        },
      });
    }
  });
};
const options = [
  {
    value: 1,
    name: "L",
  },
  {
    value: 2,
    name: "kg",
  },
];
const checkUnitName = ref("L");
const checkVal = ref(1);

const cb = (val) => {
  if (checkVal.value != val.value) {
    const cur_value = state.B_Gather_Res_1;

    if (val.value == 1) {
      state.B_Gather_Res_1 = cur_value / 0.87;
    } else if (val.value == 2) {
      state.B_Gather_Res_1 = cur_value * 0.87;
    }
  }
  checkUnitName.value = val.name;
  checkVal.value = val.value;
};
const selUnit = () => {
  showPopup(options, checkVal.value, "单位选择", cb);
};
const showCalcRes = (val = 0) => {
  if (isNaN(val)) return val;
  return parseInt(Number(val).toFixed(3)).toString().length < 10 ? Number(val).toFixed(2) : val.toExponential(3);
};
onActivated(() => {
  checkUnitName.value = "L";
  checkVal.value = 1;
});
</script>

<style lang="scss" scoped>
img {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}
span {
  font-size: 13px;
}
.calc-btn {
  border: 1px solid #001450;
  padding: 1px 10px;
  border-radius: 16px;
  color: #001450;
  font-size: 13px;
  cursor: pointer;
  font-weight: 600;
}
.classify-result-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #f9f9f9;
  padding: 10px;
  width: 100%;
  margin-top: 10px;
  border-radius: 8px;
  color: #999;
}
.classify-section {
  padding: 18px;
  background-color: #fff;
  margin-bottom: 15px;
}
</style>
