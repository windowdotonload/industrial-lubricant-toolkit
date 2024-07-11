<template>
  <div id="to-img-marker">
    <header class="header-bar">
      <img class="classify-icon" src="../../../../assets/logo1.png" alt="" />
      <div style="display: flex; flex-wrap: wrap">
        <span style="display: inline-block; font-size: 20px; font-weight: bolder; color: #000">安全</span>
        <!-- <span class="text-tip">减少设备维护人员与设备的接触时间</span> -->
      </div>
      <TCOBack :parentCalcRes="calcRes" />
    </header>

    <div class="section-title">
      减少设备维护人员与设备的接触时间
      <!-- <van-icon name="warning" style="margin-left: 10px; cursor: pointer" color="#999" @click="alertTip(1)" />
      <span class="viewformula-btn" @click="viewFormula(1)">查看公式</span> -->
    </div>
    <div class="section-input">
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #001450; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%">
            <span> 减少非计划停机<van-icon name="warning" style="margin-left: 10px; cursor: pointer" color="#999" @click="alertTip(1)" /> </span>
            <span class="viewformula-btn" @click="viewFormula(1)" style="padding-right: 0; font-weight: bold">查看公式</span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" disabled :border="false" v-model.number.number="state.A" label="每年减少的非计划停机时间 A（小时）" label-width="250px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number.number="state.a" label="每年减少的非计划停机次数 a（次）" label-width="230px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number="state.b" label="每次非计划停机时间 b(小时)" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number.number="state.c" label="设备数量 c（台）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" disabled :border="false" v-model.number.number="state.aa" label="人数 aa（个）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
    </div>

    <div class="section-title">
      <!-- 减少计划性停机
      <van-icon name="warning" style="margin-left: 10px; cursor: pointer" color="#999" @click="alertTip(2)" />
      <span class="viewformula-btn" @click="viewFormula(2)">查看公式</span> -->
    </div>
    <div class="section-input">
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #001450; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%">
            <span> 减少计划性停机<van-icon name="warning" style="margin-left: 10px; cursor: pointer" color="#999" @click="alertTip(2)" /> </span>
            <span class="viewformula-btn" @click="viewFormula(2)" style="padding-right: 0; font-weight: bold">查看公式</span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" disabled :border="false" v-model.number.number="state.B" label="每年减少的计划停机时间 B（小时）" label-width="250px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number.number="state.d" label="每年减少的计划停机次数 d（次）" label-width="230px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number.number="state.e" label="每次计划停机时间 e(小时)" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number.number="state.c" label="设备数量 c（台）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" disabled :border="false" v-model.number.number="state.aa" label="人数 aa（个）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
    </div>

    <div class="section-title">
      <!-- 减少不停机维护
      <van-icon name="warning" style="margin-left: 10px; cursor: pointer" color="#999" @click="alertTip(3)" />
      <span class="viewformula-btn" @click="viewFormula(3)">查看公式</span> -->
    </div>
    <div class="section-input">
      <van-field maxlength="9" :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #001450; display: flex; align-items: center; display: flex; justify-content: space-between; width: 100%">
            <span> 减少不停机维护<van-icon name="warning" style="margin-left: 10px; cursor: pointer" color="#999" @click="alertTip(3)" /> </span>
            <span class="viewformula-btn" @click="viewFormula(3)" style="padding-right: 0; font-weight: bold">查看公式</span>
          </p>
        </template>
      </van-field>
      <van-field maxlength="9" disabled :border="false" v-model.number.number="state.C" label="每年减少的不停机维护时间 C（小时）" label-width="250px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number.number="state.f" label="每年减少的不停机维护次数 f（次）" label-width="230px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number.number="state.g" label="每次不停机维护时间 g(小时)" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" :border="false" v-model.number.number="state.c" label="设备数量 c（台）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
      <van-field maxlength="9" disabled :border="false" v-model.number.number="state.aa" label="人数 aa（个）" label-width="220px" placeholder="0" input-align="right" autocomplete="off" />
    </div>

    <CustomerFields keyWordName="减少接触时间" keyWordUnit="小时" ref="additionalRef" />
  </div>

  <div class="calc_btn" @click="calcRes">计算结果</div>
</template>

<script setup>
import * as VAL from "../../../../utils/validate";
import CustomerFields from "./customerFieldsCreate.vue";
import TCOBack from "./TCOBack.vue";
import { useToImg } from "../../../../utils/domToImg";
import { ENV, delayExec } from "../../../../global/customerApi";

const { ref, inject, watch, defineExpose } = Vue;
const { useRouter, useRoute } = VueRouter;
const route = useRoute();
const { Dialog, Toast } = vant;
const state = inject("state");
const mutation = inject("mutation");
const additionalRef = ref(null);

watch(state, (val) => {
  VAL.validateNumRange(val, "a", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "b", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "c", 0, 999999999, 0, true);
  VAL.validateNumRange(val, "d", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "e", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "f", 0, 999999999, 2, true);
  VAL.validateNumRange(val, "g", 0, 999999999, 2, true);

  mutation.calcSafe_1();
  mutation.calcSafe_2();
  mutation.calcSafe_3();
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
      state.img_url_safe = imgUrl.value;
    };

    await delayExec(exec, 300);
  }

  mutation.calcSafe_Gather(additionalRef.value.getFinalValue());
  mutation.calcEnviro_Gather();
  mutation.calcEfficient_Gather();
  if (!triggerWechat) return;
  if (route.query.active) return mutation.wechat_postMessage();

  mutation.chagneActive("Comprehensive");
};
const tips = {
  tip1: "因延长设备寿命、减少设备损坏而减少计划外的停机换油或设备更换。",
  tip2: "因长效润滑剂而减少计划性的换油或维护。如更换长效柴机油而使得每年的计划停机换油维护减少。",
  tip3: "如因改善油耗、泄漏而减少的不停机加油等维护；更换备用的过滤器滤芯、油泵等。",
};
const formula = {
  formula1: "A = a * b * c * aa",
  formula2: "B = d * e * c * aa",
  formula3: "C = f * g * c * aa",
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
  position: relative;
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
