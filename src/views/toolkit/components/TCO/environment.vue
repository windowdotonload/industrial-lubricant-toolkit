<template>
  <div id="to-img-marker">
    <header class="header-bar">
      <img class="classify-icon" src="../../../../assets/logo2.png" alt="" />
      <div style="display: flex; flex-wrap: wrap">
        <span style="display: inline-block; font-size: 20px; font-weight: bolder; color: #000">环保</span>
        <!-- <span class="text-tip">减少废油排放</span> -->
      </div>
      <TCOBack :parentCalcRes="calcRes" />
    </header>

    <div class="section-title">
      减少废油排放
      <!-- <span class="viewformula-btn" @click="viewFormula(1)">查看公式</span> -->
    </div>
    <div class="section-input">
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #001450; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%">
            延长换油周期
            <span class="viewformula-btn" @click="viewFormula(1)" style="padding-right: 0; font-weight: bold">查看公式</span>
          </p>
        </template>
      </van-field>
      <van-field disabled maxlength="9" v-model.number="state.D" :border="false" label-width="250px" placeholder="0" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #c8c9cc; display: flex; align-items: center">
            每年减少换油量 D（{{ state.B_Changeoil_Unit || "L" }}）
            <Exchange :actions="[{ text: 'L' }, { text: 'kg' }]" @onSelectPopover="(val) => mutation.B_changeunit('B_Changeoil_Unit', val.text)" />
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" :border="false" v-model.number="state.bb" label="改善前年换油次数 bb（次）" label-width="230px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.cc" label="改善后年换油次数 cc（次）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.h" :label="`油箱容量 h（${state.B_Changeoil_Unit}）`" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.c" label="设备数量 c（台）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
    </div>
    <div class="section-title">
      <!-- 减少油耗 / 降低供油率
      <span class="viewformula-btn" @click="viewFormula(2)">查看公式</span> -->
    </div>
    <div class="section-input">
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #001450; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%">
            减少油耗 / 降低供油率
            <span class="viewformula-btn" @click="viewFormula(2)" style="padding-right: 0; font-weight: bold">查看公式</span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" disabled v-model.number="state.F" :border="false" label-width="250px" placeholder="0" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #c8c9cc; display: flex; align-items: center">
            每年减少油品添加量 F（{{ state.B_Addoil_Unit || "L" }}）
            <Exchange :actions="[{ text: 'L' }, { text: 'kg' }]" @onSelectPopover="(val) => mutation.B_changeunit('B_Addoil_Unit', val.text)" />
          </p>
        </template>
      </van-field>

      <van-field maxlength="9" :border="false" v-model.number="state.i" :label="`改善前油品年添加量 i（${state.B_Addoil_Unit}）`" label-width="230px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.j" :label="`改善后油品年添加量 j（${state.B_Addoil_Unit}）`" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.c" label="设备数量 c(台)" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
    </div>
    <div class="section-title">减少CO₂ 排放</div>
    <div class="section-input">
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #001450; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%">
            电力
            <span class="viewformula-btn" @click="viewFormula(3)" style="padding-right: 0; font-weight: bold">查看公式</span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" :border="false" disabled v-model.number="state.G" label="每年减少的CO₂排放（电力） G（吨）" label-width="250px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.k" label="设备功率 k（kW）" label-width="230px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state['l+']" label="年运行时间 l+（小时）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.m" label-width="200px" placeholder="0" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #646566; display: flex; align-items: center">电力能效提升 m（%）<van-icon name="warning" style="margin-left: 10px; cursor: pointer" color="#999" @click="alertTip(1)" /></p>
        </template>
      </van-field>
      <van-field maxlength="9" :border="false" v-model.number="state.TCOP1" disabled label-width="220px" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #c8c9cc; display: flex; align-items: center">我国每度电产生的CO₂（吨）<van-icon name="warning" style="margin-left: 10px; cursor: pointer" color="#999" @click="alertTip(2)" /></p>
        </template>
      </van-field>
      <van-field maxlength="9" :border="false" v-model.number="state.c" label="设备数量 c（台）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
    </div>
    <div class="section-input" style="margin-top: 10px">
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #001450; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%">
            <span>
              燃油
              <span style="color: #999; margin-left: 15px">
                {{ state.B_fuel_type }}
                <Exchange :actions="[{ text: '柴油' }, { text: '汽油' }]" @onSelectPopover="(val) => mutation.B_changeunit('B_fuel_type', val.text)" />
              </span>
            </span>
            <span class="viewformula-btn" @click="viewFormula(4)" style="padding-right: 0; font-weight: bold">查看公式</span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" :border="false" disabled v-model.number="state.H" label="每年减少的CO₂排放（燃油） H（吨）" label-width="250px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.n" label="车辆年运行里程 n（公里）" label-width="230px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state['o+']" label="车辆平均燃油耗量 o+（L/100km）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.p" label-width="220px" placeholder="0" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #646566; display: flex; align-items: center">燃油经济性提升 p（%）<van-icon name="warning" style="margin-left: 10px; cursor: pointer" color="#999" @click="alertTip(3)" /></p>
        </template>
      </van-field>
      <van-field maxlength="9" v-model.number="fuelParams" :border="false" disabled label-width="260px" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #c8c9cc; display: flex; align-items: center">我国每升燃油产生的CO₂（吨）<van-icon name="warning" style="margin-left: 10px; cursor: pointer" color="#999" @click="alertTip(4)" /></p>
        </template>
      </van-field>
      <van-field :border="false" v-model.number="state.c" label="设备数量 c（台）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
    </div>

    <CustomerFields :keyWordNames="{ L: '每年减少废油', kg: '每年减少废油', t: '每年减少CO₂排放' }" :exchangeUnitOptions="unitOptions" :exchangeUnit="true" ref="additionalRef_E" />
  </div>
  <div class="calc_btn" @click="calcRes">计算结果</div>
</template>

<script setup>
import * as VAL from "../../../../utils/validate";
import CustomerFields from "./customerFieldsCreate.vue";
import Exchange from "../../../../components/ExchangeSection/index.vue";
import TCOBack from "./TCOBack.vue";
import { useToImg } from "../../../../utils/domToImg";
import { ENV, delayExec } from "../../../../global/customerApi";

const { ref, computed, watch, inject, defineExpose } = Vue;
const { Dialog, Toast } = vant;
const { useRouter, useRoute } = VueRouter;
const route = useRoute();
const state = inject("state");
const mutation = inject("mutation");
const additionalRef_E = ref(null);
const fuelParams = computed(() => {
  return state.B_fuel_type == "柴油" ? state.TCOP2 : state.TCOP3;
});
const calcRes = async (triggerWechat = true) => {
  if (ENV == "wechat" && !route.query.active) {
    Toast.loading({
      message: "请稍后...",
      forbidClick: true,
    });

    const exec = async () => {
      const { imgUrl } = await useToImg();
      Toast.clear();
      state.img_url_enviro = imgUrl.value;
    };

    await delayExec(exec, 300);
  }

  mutation.calcEnviro_Gather(additionalRef_E.value.getSeparateFinalValue());
  mutation.calcSafe_Gather();
  mutation.calcEfficient_Gather();
  if (!triggerWechat) return;
  if (route.query.active) return mutation.wechat_postMessage();

  mutation.chagneActive("Comprehensive");
};
watch(state, (val) => {
  VAL.validateNumRange(val, "bb", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "cc", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "h", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "c", 0, 999999999, 0, true);
  VAL.validateNumRange(val, "i", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "j", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "k", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "l+", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "m", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "n", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "p", 0, 999999999, 2, true);

  mutation.calcEnviro_1();
  mutation.calcEnviro_2();
  mutation.calcEnviro_3();
  mutation.calcEnviro_4();
});
const unitOptions = ["L", "kg", "t"];
const tips = {
  tip1: "台架试验的能效提升参考：美孚 DTE 10 超凡系列高达 6%；美孚SHC 600及美孚SHC 齿轮油系列高达 3.6%。",
  tip2: `全国平均排放因子为 ${state.TCOP1} tCO₂/kWh。`,
  tip3: "美孚黑霸王1号™ 5W-30/5W-40 K150帮助节省燃油可高达2 - 2.6%。",
  tip4: `柴油燃烧排放因子为 ${state.TCOP2} tCO₂/L; 汽油燃烧排放因子为 ${state.TCOP3} tCO₂/L。`,
};
const formula = {
  formula1: "D = （bb - cc）  * h * c",
  formula2: "F = （i - j） * c",
  formula3: `G = k * (l+) * m% * ${state.TCOP1} * c`,
  formula4: `柴油：H = n * (o+) / 100 * p% * ${state.TCOP2} * c\n汽油：H=n * (o+) / 100 * p% * ${state.TCOP3} * c`,
};
const alertTip = (index) => {
  Dialog.alert({
    title: "填写提示",
    message: tips[`tip${index}`],
    confirmButtonText: "我知道了",
  });
};
const viewFormula = (index) => {
  Dialog.alert({
    title: "公式",
    message: formula[`formula${index}`],
    confirmButtonText: "确定",
  });
};
defineExpose({
  calcRes,
});
</script>

<style lang="scss" scoped>
.header-bar {
  background-color: #fff;
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
</style>
