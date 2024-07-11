<template>
  <div id="to-img-marker">
    <div class="section-title">轴承数据</div>
    <div class="section-input">
      <van-field :border="false" v-model="needlessInput.other1" input-align="right" maxlength="50" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px; cursor: pointer"> 轴承类型 </span>
        </template>
        <template #right-icon>
          <div style="display: flex; cursor: pointer; color: #c8c9cc" @click="openBearingTypePopup">
            {{ checkBearingType ? checkBearingType : "请选择" }}
            <van-icon name="arrow" />
          </div>
        </template>
      </van-field>
      <van-field :border="false" v-model="needlessInput.other2" placeholder="请输入" input-align="right" maxlength="50" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px">轴承型号（选填）</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.Diameter_In" placeholder="请输入" input-align="right" maxlength="50" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px">轴承内径（mm）</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.Diameter_Out" placeholder="请输入" input-align="right" maxlength="50" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px">轴承外径（mm）</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.W" placeholder="请输入" input-align="right" maxlength="50" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px">轴承宽度（mm）</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.V" placeholder="请输入" input-align="right" maxlength="50" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px">转速（转/分钟）</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.T" placeholder="请输入" input-align="right" maxlength="50" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px">轴承工作温度（℃）</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.Capacity" placeholder="请输入" input-align="right" maxlength="50" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 210px">润滑脂枪容量（克/滑脂枪行程）</span>
        </template>
      </van-field>
      <van-field :border="false" input-align="right" v-model="calcInput.K" placeholder="请选择轴承类型" disabled>
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px; cursor: pointer"> 常数K </span>
        </template>
      </van-field>
      <van-field :border="false" input-align="right" disabled label-width="170">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px; cursor: pointer"> 轴承安装方式系数 </span>
        </template>
        <template #right-icon>
          <div style="display: flex; cursor: pointer; color: #c8c9cc" @click="openPopup(1)">
            {{ checkItem[1] ? checkItem[1].name : "请选择" }}
            <van-icon name="arrow" />
          </div>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.Coef_E" placeholder="请输入" input-align="right" maxlength="50" autocomplete="off" label-width="200">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 200px">
            轴承安装环境系数（%）
            <span style="cursor: pointer" @click="alertTip3"><van-icon name="warning" /></span>
          </span>
        </template>
      </van-field>
    </div>

    <div class="section-title">计算结果</div>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px">加脂周期（小时）</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.Cycle_H, '小时')" />
        <CopyButton :copyVal="calcOutput.Cycle_H" copyUnit="小时" />
      </template>
    </van-field>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px">加脂周期（天）</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.Cycle_D, '天')" />
        <CopyButton :copyVal="calcOutput.Cycle_D" copyUnit="天" />
      </template>
    </van-field>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px">加脂量</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.Amount, '克')" />
        <CopyButton :copyVal="calcOutput.Amount" copyUnit="克" />
      </template>
    </van-field>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px">滑脂枪行程</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.Distance, '次')" />
        <CopyButton :copyVal="calcOutput.Distance" copyUnit="次" />
      </template>
    </van-field>
  </div>
  <ShareButton />
  <div id="selPppup"></div>
</template>

<script setup>
import ShareButton from "../../../components/ShareButton/index";
import CopyButton from "../../../components/CopyButton/index.vue";
import { showPopup } from "../../../components/Popup/index";
import { simpleDeepClone, getBaseLog } from "../../../global/customerApi";
import * as VAL from "../../../utils/validate";
import { bearingType, optionsMap, titleMap, calcPopupSelKeyMap } from "../components/replenishFat/data";
const { ref, reactive, watch } = Vue;
const { Dialog, ImagePreview } = vant;

const calcInput = reactive({ V: "", T: "", K: "", W: "", Coef_E: 75, Capacity: "", Coef_Install: "", Diameter_Out: "", Diameter_In: "" });
const calcOutput = reactive({ Cycle_H: "", Cycle_D: "", Amount: "", Distance: "" });
const needlessInput = reactive({
  other1: "",
  other2: "",
});
const checkItem = reactive({
  0: "",
  1: "",
});
const checkBearingType = ref("");
const getRadioClickFunc = (key) => (item) => {
  calcInput[calcPopupSelKeyMap[key]] = item.value;
  checkItem[key] = item;
};
const getOptionsData = (key) => {
  return {
    options: optionsMap[key],
    title: titleMap[key],
    selCheckItem: checkItem,
    radioClick: getRadioClickFunc(key),
  };
};
const optionsData = (() => ({
  0: getOptionsData(0),
  1: getOptionsData(1),
  2: getOptionsData(2),
  3: getOptionsData(3),
}))();
const openPopup = (selTarget) => {
  const selTargetData = optionsData[selTarget];
  showPopup(selTargetData.options, selTargetData.selCheckItem[selTarget] ? selTargetData.selCheckItem[selTarget].value : "", selTargetData.title, selTargetData.radioClick);
};
const openBearingTypePopup = () => {
  showPopup(bearingType, checkBearingType.value, "选择轴承类型", (e) => {
    checkBearingType.value = e.name;
    calcInput.K = e.kVal;
  });
};
const alertTip1 = () => {
  Dialog.alert({
    title: "填写提示",
    "message-align": "left",
    message: "K=1, 球面滚子轴承或圆锥滚子轴承\nK=10, 球轴承\nK= 5, 圆柱滚子轴承或滚针轴承",
    confirmButtonText: "我知道了",
  });
};
const alertTip2 = () => {
  Dialog.alert({
    title: "填写提示",
    "message-align": "left",
    message: "轴承用于立轴，系数取0.5；其它情况，系数取1",
    confirmButtonText: "我知道了",
  });
};
const alertTip3 = () => {
  Dialog.alert({
    title: "填写提示",
    "message-align": "left",
    message: "轴承工作环境系数用于考虑从轴承工作环境对补脂周期的影响，取值范围为0-100%。轴承工作环境恶劣(如潮湿环境、灰尘环境等)时，补脂周期应酌情缩短，建议输入较小的轴承工作环境系数。",
    confirmButtonText: "我知道了",
  });
};

watch(calcInput, (val) => {
  VAL.validateNumRange(val, "V", 0, 999999, 2);
  VAL.validateNumRange(val, "T", 0, 999999, 1);
  VAL.validateNumRange(val, "W", 0, 9999, 3);
  VAL.validateNumRange(val, "Coef_E", 0, 100, 0);
  VAL.validateNumRange(val, "Capacity", 0, 9999, 0);
  VAL.validateNumRange(val, "Diameter_Out", 0, 9999, 3);
  VAL.validateNumRange(val, "Diameter_In", 0, 9999, 3);

  calcRes();
});

const calcRes = () => {
  const { V, T, K, W, Coef_E, Capacity, Coef_Install, Diameter_Out, Diameter_In } = simpleDeepClone(calcInput);
  let Cycle_H, Cycle_D;
  if (T > 70) {
    Cycle_H = ((K * 14000000 - 4 * Diameter_In) / (V * Math.sqrt(Diameter_In))) * Math.pow(1 / 2, (T - 70) / 15) * Coef_Install * (Coef_E / 100);
    Cycle_D = Cycle_H / 24;
  } else {
    Cycle_H = ((K * 14000000 - 4 * Diameter_In) / (V * Math.sqrt(Diameter_In))) * Coef_Install * (Coef_E / 100);
    Cycle_D = Cycle_H / 24;
  }
  const Amount = 0.005 * Diameter_Out * W;
  const Distance = Amount / Capacity;

  calcOutput.Cycle_H = Cycle_H.toFixed(1);
  calcOutput.Cycle_D = Cycle_D.toFixed(1);
  calcOutput.Amount = Number(Amount.toFixed(1));
  calcOutput.Distance = Distance.toFixed(1);
};
</script>

<style lang="scss" scoped>
.tip-content-text {
  box-sizing: border-box;
  padding: 10px;
  color: #999999;
  margin-bottom: 10px;
  font-size: 13px;
}
</style>
