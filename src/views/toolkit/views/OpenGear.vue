<template>
  <div id="to-img-marker">
    <div class="section-title">基本信息</div>
    <div class="section-input">
      <van-field :border="false" input-align="right" disabled>
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px; cursor: pointer">润滑剂名称</span>
        </template>
        <template #right-icon>
          <div style="display: flex; cursor: pointer; color: #c8c9cc" @click="openPopup(0)">
            {{ checkItem[0] ? checkItem[0].name : "请选择" }}
            <van-icon name="arrow" />
          </div>
        </template>
      </van-field>
      <van-field :border="false" input-align="right" disabled>
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px; cursor: pointer">工作类型</span>
        </template>
        <template #right-icon>
          <div style="display: flex; cursor: pointer; color: #c8c9cc" @click="openPopup(1)">
            {{ checkItem[1] ? checkItem[1].name : "请选择" }}
            <van-icon name="arrow" />
          </div>
        </template>
      </van-field>
      <van-field :border="false" input-align="right" disabled>
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px; cursor: pointer">设备类型</span>
        </template>
        <template #right-icon>
          <div style="display: flex; cursor: pointer; color: #c8c9cc" @click="openPopup(2)">
            {{ checkItem[2] ? checkItem[2].name : "请选择" }}
            <van-icon name="arrow" />
          </div>
        </template>
      </van-field>
      <van-field :border="false" input-align="right" disabled>
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px; cursor: pointer">驱动类型</span>
        </template>
        <template #right-icon>
          <div style="display: flex; cursor: pointer; color: #c8c9cc" @click="openPopup(3)">
            {{ checkItem[3] ? checkItem[3].name : "请选择" }}
            <van-icon name="arrow" />
          </div>
        </template>
      </van-field>

      <div class="section-title">大齿轮参数</div>
      <div class="section-input">
        <van-field :border="false" v-model="calcInput.W" placeholder="请输入" input-align="right" maxlength="50" autocomplete="off">
          <template #label>
            <span style="color: #646566; display: inline-block; width: 170px">齿宽（m）</span>
          </template>
        </van-field>
        <van-field :border="false" v-model="calcInput.D" placeholder="请输入" input-align="right" maxlength="50" autocomplete="off">
          <template #label>
            <span style="color: #646566; display: inline-block; width: 170px">直径（m）</span>
          </template>
        </van-field>
        <van-field :border="false" v-model="calcInput.V" placeholder="请输入" input-align="right" maxlength="50" autocomplete="off">
          <template #label>
            <span style="color: #646566; display: inline-block; width: 170px">转速（转/分钟）</span>
          </template>
        </van-field>
      </div>

      <div class="section-title">喷射系统</div>
      <div class="section-input">
        <van-field :border="false" type="number" v-model.number="calcInput.R" placeholder="请输入" input-align="right" maxlength="50" autocomplete="off" label-width="220">
          <template #label>
            <span style="color: #646566; display: inline-block; width: 220px">
              喷射期间大齿轮旋转转数（转）
              <span style="cursor: pointer" @click="alertTip1"><van-icon name="warning" /></span>
            </span>
          </template>
        </van-field>
        <van-field :border="false" v-model="calcInput.C" placeholder="请输入" input-align="right" maxlength="50" autocomplete="off" label-width="170">
          <template #label>
            <span style="color: #646566; display: inline-block; width: 170px">
              喷射周期（分钟）
              <span style="cursor: pointer" @click="alertTip2"><van-icon name="warning" /></span>
            </span>
          </template>
        </van-field>
      </div>
    </div>

    <div class="section-title">计算结果</div>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px">喷射量</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.Amount, 'ml/分钟')" />
        <CopyButton :copyVal="calcOutput.Amount" copyUnit="ml/分钟" />
      </template>
    </van-field>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px">喷射时间</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.Time, '秒')" />
        <CopyButton :copyVal="calcOutput.Time" copyUnit="秒" />
      </template>
    </van-field>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px">喷射间隔</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.Delta, '秒')" />
        <CopyButton :copyVal="calcOutput.Delta" copyUnit="秒" />
      </template>
    </van-field>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px">润滑剂日消耗量</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.Consumption, 'L/日')" />
        <CopyButton :copyVal="calcOutput.Consumption" copyUnit="L/日" />
      </template>
    </van-field>
  </div>
  <ShareButton />
  <div id="selPppup"></div>
  <van-dialog use-slot title="填写提示" confirmButtonText="我知道了" :show="tipDialogOther" :show-cancel-button="false" @confirm="confirmDialog">
    <div class="tip-content-text">设备设定的喷射周期（为两次开始喷射间的时间）应小于或等于美孚产品在设备中的最大喷射周期（最大喷射周期参数参见下表）。</div>
    <div style="display: flex; justify-content: center; padding: 0 20rpx">
      <img :src="tipTable" @click="amplifyIMG" style="width: 100%" />
    </div>
  </van-dialog>
</template>

<script setup>
import ShareButton from "../../../components/ShareButton/index";
import CopyButton from "../../../components/CopyButton/index.vue";
import { showPopup } from "../../../components/Popup/index";
import { simpleDeepClone, getBaseLog } from "../../../global/customerApi";
import tipTable from "../../../assets/tip-table.png";
import * as VAL from "../../../utils/validate";
import { get_LubType, get_CoefWork, get_CoefDevice, get_CoefDrive, get_CoefLub } from "../components/openGear/data.js";
import { optionsMap, titleMap, calcPopupSelKeyMap } from "../components/openGear/data";
const { ref, reactive, watch } = Vue;
const { Dialog, ImagePreview } = vant;

const calcInput = reactive({ Lub: "", W: "", D: "", Work: "", Device: "", Drive: "", V: "", R: "", C: "" });
const calcOutput = reactive({ Amount: "", Time: "", Delta: "", Consumption: "" });
const tipDialogOther = ref(false);
const checkItem = reactive({
  0: "",
  1: "",
  2: "",
  3: "",
});
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
const alertTip1 = () => {
  Dialog.alert({
    title: "填写提示",
    "message-align": "left",
    message: "为了保证开式齿轮的润滑效果，同时又可为客户节省润滑成本，喷射期间大齿轮至少旋转 1 转，最好 2 转，确保大齿轮齿轮完全覆盖。",
    confirmButtonText: "我知道了",
  });
};
const alertTip2 = () => {
  tipDialogOther.value = true;
};
const confirmDialog = () => {
  tipDialogOther.value = false;
};
const amplifyIMG = () => {
  ImagePreview({
    images: [tipTable],
    closeable: true,
  });
};

watch(calcInput, (val) => {
  VAL.validateNumRange(val, "W", 0, 10, 1);
  VAL.validateNumRange(val, "D", 0, 100, 3);
  VAL.validateNumRange(val, "V", 0, 100, 3);
  VAL.validateNumRange(val, "R", 0, 10, 0);
  VAL.validateNumRange(val, "C", 0, 50, 2);

  calcRes();
});

const calcRes = () => {
  let { Lub, W, D, Work, Device, Drive, V, R, C } = simpleDeepClone(calcInput);
  W = W < 0.2 ? 0.2 : W;
  const Lub_Type = get_LubType(Lub);
  const Coef_Work = get_CoefWork(Work);
  const Coef_Device = get_CoefDevice(Device);
  const Coef_Drive = get_CoefDrive(Drive, Lub_Type);
  const Coef_Lub = get_CoefLub(W, D, Lub_Type);
  const Coef_V = (C * V) / R;
  const Amount = Coef_Lub * Coef_V * Coef_Work * Coef_Device * Coef_Drive;
  const Time = (R / V) * 60;
  const Delta = C * 60 - Time;
  const Consumption = ((((Time / 60) * Amount) / 1000) * 24 * 60) / C;
  // if (!Amount || !Time || !Delta || !Consumption) {
  //   judgeClearValue(calcInput, calcOutput);
  //   return;
  // }

  calcOutput.Amount = Amount.toFixed(2);
  calcOutput.Time = Time.toFixed(1);
  calcOutput.Delta = Delta.toFixed(1);
  calcOutput.Consumption = Consumption.toFixed(4);
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
