<template>
  <div id="to-img-marker">
    <header class="header-bar">
      <img class="classify-icon" src="../../../assets/tcocv.png" alt="" />
      <div style="display: flex; flex-wrap: wrap">
        <span style="display: inline-block; font-size: 20px; font-weight: bolder; color: #000">产品效益计算</span>
        <span class="text-tip"> </span>
      </div>
    </header>

    <div class="section-input">
      <van-field class="clac-res-field" maxlength="15" label-width="fit-content" input-align="right" autocomplete="off" disabled :border="false">
        <template #label>
          <span style="color: #646566"> 总节省成本（每年）（元）<van-icon name="info" style="cursor: pointer" @click="viewFormula(0)" /> </span>
        </template>
        <template #right-icon>
          <span style="font-weight: bolder; color: #000">{{ calcField.R1 }}</span>
        </template>
      </van-field>
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #646566; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%" @click="showProduct">
            美孚黑霸王™产品
            <span>
              {{ productSelChekcName }}
              <van-icon name="arrow" />
            </span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" label-width="fit-content" input-align="right" autocomplete="off" placeholder="请输入" :border="false" v-model="state.c_1" label="卡车数量 （辆）" clearable @clear="clearField('c_1')" />
    </div>

    <div class="section-title" />
    <div class="section-input">
      <van-field class="clac-res-field" maxlength="15" label-width="fit-content" input-align="right" autocomplete="off" disabled :border="false">
        <template #label>
          <span style="color: #646566">节省燃油费用（每年）（元）<van-icon name="info" style="cursor: pointer" @click="viewFormula(1)" /> </span>
        </template>
        <template #right-icon>
          <span style="font-weight: bolder; color: #000">{{ calcField.R2 }}</span>
        </template>
      </van-field>
      <van-field disabled maxlength="9" label-width="fit-content" input-align="right" autocomplete="off" placeholder="请输入" :border="false" v-model="state.c_2">
        <template #label>
          <span style="color: #646566">燃油节省率 （%）<span style="color: #d10000">*</span></span>
        </template>
      </van-field>
      <van-field maxlength="9" label-width="fit-content" input-align="right" autocomplete="off" placeholder="请输入" :border="false" v-model="state.c_3" label="百公里平均油耗 （升）" clearable @clear="clearField('c_3')" />
      <van-field maxlength="9" label-width="fit-content" input-align="right" autocomplete="off" placeholder="请输入" :border="false" v-model="state.c_4" label="车辆运行里程（每年）（万公里）" clearable @clear="clearField('c_4')" />
      <van-field maxlength="9" label-width="fit-content" input-align="right" autocomplete="off" placeholder="请输入" :border="false" v-model="state.c_5" label="柴油售价 （元/升）" clearable @clear="clearField('c_5')" />
    </div>

    <div class="section-title" />
    <div class="section-input">
      <van-field class="clac-res-field" maxlength="15" label-width="fit-content" input-align="right" autocomplete="off" disabled :border="false">
        <template #label>
          <span style="color: #646566">节省润滑油成本（每年）（元）<van-icon name="info" style="cursor: pointer" @click="viewFormula(2)" /> </span>
        </template>
        <template #right-icon>
          <span style="font-weight: bolder; color: #000">{{ calcField.R3 }}</span>
        </template>
      </van-field>
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #646566; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%" @click="showChangeFrequency(0)">
            年换油次数（之前）（次）
            <span>
              {{ beforSelNumber || "请选择" }}
              <van-icon name="arrow" />
            </span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #646566; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%" @click="showChangeFrequency(1)">
            年换油次数（目前）（次）
            <span>
              {{ afterSelNumber || "请选择" }}
              <van-icon name="arrow" />
            </span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" label-width="fit-content" input-align="right" autocomplete="off" placeholder="请输入" :border="false" v-model="state.c_8" label="换油量 （升/次）" clearable @clear="clearField('c_8')" />
      <van-field maxlength="9" label-width="fit-content" input-align="right" autocomplete="off" placeholder="请输入" :border="false" v-model="state.c_9" label="润滑油成本（之前）（元/升）" clearable @clear="clearField('c_9')" />
      <van-field maxlength="9" label-width="fit-content" input-align="right" autocomplete="off" placeholder="请输入" :border="false" v-model="state.c_10" label="润滑油成本（目前）（元/升）" clearable @clear="clearField('c_10')" />
    </div>

    <div class="section-title" />
    <div class="section-input">
      <van-field class="clac-res-field" maxlength="15" label-width="fit-content" input-align="right" autocomplete="off" disabled :border="false">
        <template #label>
          <span style="color: #646566">节省人工成本（每年）（元）<van-icon name="info" style="cursor: pointer" @click="viewFormula(3)" /> </span>
        </template>
        <template #right-icon>
          <span style="font-weight: bolder; color: #000">{{ calcField.R4 }}</span>
        </template>
      </van-field>
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #646566; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%" @click="showChangeFrequency(0)">
            年换油次数（之前）（次）
            <span>
              {{ beforSelNumber || "请选择" }}
              <van-icon name="arrow" />
            </span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #646566; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%" @click="showChangeFrequency(1)">
            年换油次数（目前）（次）
            <span>
              {{ afterSelNumber || "请选择" }}
              <van-icon name="arrow" />
            </span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" label-width="fit-content" input-align="right" autocomplete="off" placeholder="请输入" :border="false" v-model="state.c_13" label="换油所需时长 （小时/次）" clearable @clear="clearField('c_13')" />
      <van-field maxlength="9" label-width="fit-content" input-align="right" autocomplete="off" placeholder="请输入" :border="false" v-model="state.c_14" clearable @clear="clearField('c_14')">
        <template #label>
          <p style="color: #646566">每小时产值 （元）<van-icon name="info" style="cursor: pointer" @click="alertTip" /></p>
        </template>
      </van-field>
    </div>
  </div>

  <ShareButton background="rgba(255, 215, 0, 1)" color="#000" />
  <p class="tip">*经由中国节能协会(CECA)的燃油经济性评估测试，通过对比应用在重汽D10.38发动机,上的测试数据，美孚黑霸王TM畅行500 10W-40 / 400 10W-40 / 300 10W-40 / 200 15W-40同配方润沿油相较于美孚黑霸王T 超级 20W-50润滑油在使用中可达1.4% /1.592% / 1.296% / 1.222%的燃油经济性提升。实际使用的燃油节省受发动机型，天气，驾驶路况及目前所用机油黏度影响，会有差异。</p>
</template>

<script setup>
import * as VAL from "../../../utils/validate";
import { LOG } from "../../../utils/util";
import { configFE } from "../components/tcoCv/data";
import { getAndSetConfigureParams } from "../../../global/customerApi";
import { useToImg } from "../../../utils/domToImg";
import { showPopupCreateDom } from "../../../components/Popup/index";
import ShareButton from "../../../components/ShareButton/index";
import { ENV, delayExec } from "../../../global/customerApi";

const { ref, reactive, watch, inject, defineExpose } = Vue;
const { Dialog, Toast } = vant;
const { useRouter, useRoute } = VueRouter;
const route = useRoute();
const state = reactive({
  c_0: "",
  c_1: "",
  c_2: "",
  c_3: "",
  c_4: "",
  c_5: "",
  c_6: "",
  c_7: "",
  c_8: "",
  c_9: "",
  c_10: "",
  c_13: "",
  c_14: "",
});
const calcField = reactive({
  R1: "",
  R2: "",
  R3: "",
  R4: "",
});
let productSelCheck = null;
let productSelChekcName = ref("");
let beforeSelChange = null;
let beforSelNumber = ref("");
let afterSelchange = null;
let afterSelNumber = ref("");
const configuration = getAndSetConfigureParams("configuration");
configuration &&
  configuration.forEach((config) => {
    config.name = config.productName;
    config.value = config.key;
  });
configuration && LOG("[tcoCv configuration]", configuration);

const calcFieldKey = ["R1", "R2", "R3", "R4"];
const handleConfigDataInit = () => {
  productSelCheck = configFE[0].key;
  productSelChekcName.value = configFE[0].productName;
  state.c_2 = configFE[0].savingRate;
};
handleConfigDataInit();
const frequencyList = [
  {
    name: "1",
    value: 1,
  },
  {
    name: "2",
    value: 2,
  },
  {
    name: "3",
    value: 3,
  },
  {
    name: "4",
    value: 4,
  },
  {
    name: "5",
    value: 5,
  },
  {
    name: "6",
    value: 6,
  },
  {
    name: "7",
    value: 7,
  },
  {
    name: "8",
    value: 8,
  },
  {
    name: "9",
    value: 9,
  },
  {
    name: "10",
    value: 10,
  },
];
const formula = [
  "年度总节省成本=(节省燃油费用（每年)+节省人工成本（每年）+节省润滑油成本（每年）)*卡车数量",
  "节省燃油费用（每年）= 百公里平均油耗*燃油节省率*柴油售价(每升）*车辆运行里程数（每年,万公里）/100",
  "节省润滑油成本（每年）=((年换油次数（之前）*润滑油成本（之前， 每升）)-(年换油次数（目前）*润滑油成本（目前， 每升）))*换油量（每次）",
  "节省人工成本（每年）=(年换油次数（之前）-年换油次数（目前）)*换油时长（每次）*每小时产值",
];
watch(state, (val) => {
  Object.keys(state).forEach((key) => {
    VAL.validateNumRange(val, key, 0, 999999999, 2, true);
  });
  calcRes();
});

const calcRes = () => {
  calcField.R2 = (state.c_3 * state.c_2 * state.c_5 * state.c_4).toFixed(2);
  calcField.R3 = ((state.c_6 * state.c_9 - state.c_7 * state.c_10) * state.c_8).toFixed(2);
  calcField.R4 = ((state.c_6 - state.c_7) * state.c_13 * state.c_14).toFixed(2);
  calcField.R1 = ((parseFloat(calcField.R2 || 0) + parseFloat(calcField.R3 || 0) + parseFloat(calcField.R4 || 0)) * (state.c_1 || 0)).toFixed(2);

  calcFieldKey.forEach((key) => {
    if (calcField[key] && calcField[key].toString().split(".")[0].length >= 13) {
      calcField[key] = parseFloat(calcField[key]) ? parseFloat(calcField[key]).toExponential(2) : "";
    }
    if (!parseFloat(calcField[key])) {
      calcField[key] = "";
    }
  });
};
const showProductCb = (val) => {
  productSelCheck = val.key;
  productSelChekcName.value = val.productName;
  state.c_2 = val.savingRate;
};

const showProduct = () => {
  showPopupCreateDom(configFE, productSelCheck, "产品选择", showProductCb);
};

const selNumber = (TYPE) => {
  return (val) => {
    if (TYPE == 0) {
      beforeSelChange = val.value;
      beforSelNumber.value = val.name;
      state.c_6 = val.value;
    } else {
      afterSelchange = val.value;
      afterSelNumber.value = val.name;
      state.c_7 = val.value;
    }
  };
};
const showChangeFrequency = (TYPE) => {
  const revertValue = TYPE == 0 ? beforeSelChange : afterSelchange;
  showPopupCreateDom(frequencyList, revertValue, "产品选择", selNumber(TYPE));
};

const alertTip = (index) => {
  Dialog.alert({
    title: "提示",
    message: "每小时效益",
    confirmButtonText: "我知道了",
  });
};
const viewFormula = (index) => {
  Dialog.alert({
    title: "公式",
    message: formula[index],
    confirmButtonText: "确定",
  });
};
const clearField = (key) => {
  state[key] = "";
};
</script>

<style lang="scss" scoped>
::v-deep .clac-res-field.van-cell {
  background: #fffbe5 !important;
  display: flex;
  align-items: center;
  &::before {
    content: "";
    display: inline-block;
    width: 3px;
    height: 16px;
    background: #ffd700;
    margin-right: 5px;
  }
}
::v-deep .clac-res-field.van-cell label {
  color: #646566 !important;
}
.header-bar {
  background-color: #ffd700;
  padding: 10px;
  display: flex;
  align-items: center;
  padding-bottom: 0;
  padding: 20px 16px;
}
.classify-icon {
  width: 32px;
  height: 32px;
  margin-right: 15px;
}
.text-tip {
  display: inline-block;
  font-size: 13px;
  width: 100%;
  color: #999;
}
.calc-res-field {
  color: #fffbe5;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.tip {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  font-size: 11px;
  line-height: 1.5;
  font-family: Microsoft Yahei, sans-serif;
  color: #5a5a5a;
}
</style>
