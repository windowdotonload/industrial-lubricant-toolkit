<template>
  <div id="to-img-marker">
    <header class="header-bar">
      <img class="classify-icon" src="../../../../assets/logo3.png" alt="" />
      <div style="display: flex; flex-wrap: wrap">
        <span style="display: inline-block; font-size: 20px; font-weight: bolder; color: #000">高效</span>
        <span class="text-tip">
          <!-- 增加生产效益<van-icon name="warning" style="margin-left: 10px; cursor: pointer" color="#999" @click="alertTip(1)" /> -->
        </span>
      </div>
      <TCOBack :parentCalcRes="calcRes" />
    </header>

    <div class="section-title">
      增加生产效益<van-icon name="warning" style="margin-left: 10px; cursor: pointer" color="#999" @click="alertTip(1)" />
      <!-- <span class="viewformula-btn" @click="viewFormula(1)">查看公式</span> -->
    </div>
    <div class="section-input">
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #001450; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%">
            生产效益（非计划停机）
            <span class="viewformula-btn" @click="viewFormula(1)" style="padding-right: 0; font-weight: bold">查看公式</span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model="state.II" label="每年可增加生产效益(非计划停机)II(元)" label-width="280px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model.number="state.A" label="每年减少的非计划停机时间 A（小时）" label-width="250px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" disabled :border="false" v-model.number="state.aa" label="人数 aa（个）" label-width="250px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.q" label="每小时生产效益 q（元）" label-width="250px" placeholder="0" input-align="right" autocomplete="off" />
    </div>
    <div class="section-title">
      <!-- 生产效益（计划停机）
      <span class="viewformula-btn" @click="viewFormula(2)">查看公式</span> -->
    </div>
    <div class="section-input">
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #001450; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%">
            生产效益（计划停机）
            <span class="viewformula-btn" @click="viewFormula(2)" style="padding-right: 0; font-weight: bold">查看公式</span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" disabled :border="false" v-model.number="state.J" label="每年可增加生产效益（非计划停机） J（元）" label-width="290px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model.number="state.B" label="每年减少的非计划停机时间 B（小时）" label-width="250px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" disabled :border="false" v-model.number="state.aa" label="人数 aa（个）" label-width="250px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.q" label="每小时生产效益 q（元）" label-width="250px" placeholder="0" input-align="right" autocomplete="off" />
    </div>
    <div class="section-title">
      降低设备/耗材成本
      <!-- <span class="viewformula-btn" @click="viewFormula(3)">查看公式</span> -->
    </div>
    <div class="section-input">
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #001450; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%">
            设备/耗材成本
            <span class="viewformula-btn" @click="viewFormula(3)" style="padding-right: 0; font-weight: bold">查看公式</span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" disabled :border="false" v-model.number="state.K" label="每年减少的设备/耗材成本 K（元）" label-width="250px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.r" label="改善前设备/耗材年消耗量 r（个）" label-width="230px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.s" label="改善后设备/耗材年消耗量 s（个）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.t" label="设备/耗材单价 t（元）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" disabled :border="false" v-model.number="state.c" label="设备数量 c" label-width="220px" input-align="right" autocomplete="off" />
    </div>
    <div class="section-title">
      <span>
        降低人工成本
        <van-icon name="warning" style="margin-left: 10px; cursor: pointer" color="#999" @click="alertTip(2)" />
      </span>
    </div>
    <div class="section-input">
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #001450; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%">
            人工（非计划停机）
            <span class="viewformula-btn" @click="viewFormula(4)" style="padding-right: 0; font-weight: bold">查看公式</span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" disabled :border="false" v-model.number="state.L" label="每年节省的人工成本（非计划停机）L（元）" label-width="280px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model.number="state.A" label="每年减少的非计划停机时间 A（元）" label-width="230px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.u" label="小时人工成本 u（元）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
    </div>
    <div class="section-input" style="margin-top: 10px">
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #001450; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%">
            人工（计划停机）
            <span class="viewformula-btn" @click="viewFormula(5)" style="padding-right: 0; font-weight: bold">查看公式</span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" disabled :border="false" v-model.number="state.M" label="每年节省的人工成本（计划停机）M（元）" label-width="280px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model.number="state.B" label="每年减少的计划停机时间 B（小时）" label-width="230px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.u" label="小时人工成本 u（元）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
    </div>
    <div class="section-input" style="margin-top: 10px">
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #001450; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%">
            人工（非停机维护）
            <span class="viewformula-btn" @click="viewFormula(6)" style="padding-right: 0; font-weight: bold">查看公式</span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" disabled :border="false" v-model.number="state.N" label="每年节省的人工成本（非停机维护）N（元）" label-width="300px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model.number="state.C" label="每年减少的不停机维护时间 C（小时）" label-width="260px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.u" label="小时人工成本 u（元）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
    </div>
    <div class="section-title">降低用油成本</div>
    <div class="section-input">
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #001450; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%">
            油品添加
            <span class="viewformula-btn" @click="viewFormula(7)" style="padding-right: 0; font-weight: bold">查看公式</span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" disabled :border="false" v-model.number="state.OO" label="每年减少油品添加成本 OO（元）" label-width="250px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model.number="state.i" label="改善前油品年消耗量 i （L）" label-width="230px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.v" label="改善前油品的单价 v（元）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model.number="state.j" label="改善后油品年消耗量 j（L）" label-width="220px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.w" label="改善后油品的单价 w（元）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" disabled :border="false" v-model.number="state.c" label="设备数量 c（个）" label-width="220px" input-align="right" autocomplete="off" />
    </div>
    <div class="section-input" style="margin-top: 10px">
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #001450; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%">
            换油
            <span class="viewformula-btn" @click="viewFormula(8)" style="padding-right: 0; font-weight: bold">查看公式</span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" disabled :border="false" v-model.number="state.P" label="每年减少换油成本 P（元）" label-width="250px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model.number="state.bb" label="改善前年换油次数 bb （次）" label-width="230px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model.number="state.h" label="油箱容量 h（L）" label-width="220px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.v" label="改善前油品的单价 v（元）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model.number="state.cc" label="改善后年换油次数 cc（次）" label-width="220px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.w" label="改善后油品的单价 w（元）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" disabled :border="false" v-model.number="state.c" label="设备数量 c（个）" label-width="220px" input-align="right" autocomplete="off" />
    </div>
    <div class="section-title">
      降低废油处理成本
      <!-- <span class="viewformula-btn" @click="viewFormula(9)">查看公式</span> -->
    </div>
    <div class="section-input">
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #001450; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%">
            废油成本
            <span class="viewformula-btn" @click="viewFormula(9)" style="padding-right: 0; font-weight: bold">查看公式</span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" disabled :border="false" v-model.number="state.Q" label="每年减少废油处理成本 Q（元）" label-width="250px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model.number="state.D" label="每年减少换油 D（L）" label-width="230px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model.number="state.F" label="每年减少油品添加量 F（L）" label-width="220px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.xx" label="废油处理成本 xx（元/吨）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
    </div>
    <div class="section-title">能效改善</div>
    <div class="section-input">
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #001450; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%">
            电力
            <span class="viewformula-btn" @click="viewFormula(10)" style="padding-right: 0; font-weight: bold">查看公式</span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" disabled :border="false" v-model.number="state.R" label="电费节省 R（元）" label-width="250px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model.number="state.k" label="设备功率 k（kW）" label-width="230px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model.number="state['l+']" label="年运行时间 l+（小时）" label-width="220px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model.number="state.m" label-width="220px" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #c8c9cc; display: flex; align-items: center">
            电力能效提升 m（%）
            <!-- <van-icon name="warning" style="margin-left: 10px; cursor: pointer" color="#999" @click="alertTip(3)" /> -->
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" :border="false" v-model.number="state.y" label="本地参考工业电价 y（元/度）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" disabled :border="false" v-model.number="state.c" label="设备数量 c（个）" label-width="220px" input-align="right" autocomplete="off" />
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
            <span class="viewformula-btn" @click="viewFormula(11)" style="padding-right: 0; font-weight: bold">查看公式</span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" disabled :border="false" v-model.number="state.SS" label="燃油节省 SS（元）" label-width="250px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model.number="state.n" label="车辆年运行里程 n（公里）" label-width="230px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model.number="state['o+']" label="车辆平均燃油耗量 o+（L/100KM）" label-width="220px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" placeholder="0" disabled :border="false" v-model.number="state.p" label="燃油经济性提升 p（%）" label-width="220px" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.z" label="本地参考燃油价格 z（元/升）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" disabled :border="false" v-model.number="state.c" label="车量数量c（台）" label-width="220px" input-align="right" autocomplete="off" />
    </div>

    <CustomerFields keyWordName="每年产生效益" keyWordUnit="元" ref="additionalRef_ET" />
  </div>
  <div class="calc_btn" @click="calcRes">计算结果</div>
</template>

<script setup>
import * as VAL from "../../../../utils/validate";
import TCOBack from "./TCOBack.vue";
import CustomerFields from "./customerFieldsCreate.vue";
import Exchange from "../../../../components/ExchangeSection/index.vue";
import { useToImg } from "../../../../utils/domToImg";
import { ENV, delayExec } from "../../../../global/customerApi";

const { ref, reactive, watch, inject, defineExpose } = Vue;
const { Dialog, Toast } = vant;
const { useRouter, useRoute } = VueRouter;
const route = useRoute();
const state = inject("state");
const mutation = inject("mutation");
const additionalRef_ET = ref(null);
const calcRes = async (triggerWechat = true) => {
  if (ENV == "wechat" && !route.query.active) {
    Toast.loading({
      message: "请稍后...",
      forbidClick: true,
    });
    const exec = async () => {
      const { imgUrl } = await useToImg();
      Toast.clear();
      state.img_url_efficient = imgUrl.value;
    };

    await delayExec(exec, 300);
  }
  mutation.calcEfficient_Gather(additionalRef_ET.value.getFinalValue());
  mutation.calcEnviro_Gather();
  mutation.calcSafe_Gather();
  if (!triggerWechat) return;
  if (route.query.active) return mutation.wechat_postMessage();

  mutation.chagneActive("Comprehensive");
};
watch(state, (val) => {
  VAL.validateNumRange(val, "q", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "r", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "s", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "t", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "u", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "v", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "w", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "xx", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "y", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "z", 0, 999999999, 2, true);

  mutation.calcEfficient_sequence();
});
const tips = {
  tip1: "减少设备停机，增加设备运行生产的可用性，从而增加潜在生产效益。须明确该设备停机是否停产，如不是则不计算该部分",
  tip2: "减少设备维护，从而释放人工劳力，或节省人工维护成本。",
  tip3: "台架试验的能效提升参考：美孚 DTE 10 超凡系列高达 6%；美孚SHC 600及美孚SHC 齿轮油系列高达 3.6%.。",
};
const formula = {
  formula1: "II = A / aa * q",
  formula2: "J = B / aa * q",
  formula3: "K =（r-s） * t * c",
  formula4: "L = A * u",
  formula5: "M = B * u",
  formula6: "N = C * u",
  formula7: "OO =（i * v - j * w） * c",
  formula8: "P =（bb * h * v - cc * h * w）* c",
  formula9: "Q =（D + F）/ 1000 * xx",
  formula10: "R = k *（l+） * m% * y * c",
  formula11: "SS = n * （o+）/ 100 * p% * z * c",
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
