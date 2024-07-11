<template>
  <div class="content-container">
    <KeepAlive>
      <component :is="state.activePage" ref="tcoRef" />
    </KeepAlive>
  </div>
</template>

<script setup>
import { calcState, GenerateCalcFunc } from "../components/TCO/data";
import { getAndSetConfigureParams } from "../../../global/customerApi";
const { reactive, provide, ref } = Vue;
const { useRouter, useRoute } = VueRouter;
const router = useRouter();
const route = useRoute();
const configureParams = {};
const tcoRef = ref(null);

getAndSetConfigureParams("toolkit-Independent-TCO")?.forEach((item) => {
  configureParams[item.key] = item.value;
});

const state = reactive({
  activePage: "Comprehensive",
  tcoCustomDtoList: null,
  ...configureParams,
  ...calcState,
});
const mutation = {
  chagneActive: (page) => {
    state.activePage = page;
  },
  wechat_postMessage: () => {
    wx.miniProgram.postMessage({
      data: {
        stateData: state,
      },
    });
    wx.miniProgram.navigateBack({
      delta: 1,
    });
  },
  ...GenerateCalcFunc(state),
};

provide("state", state);
provide("mutation", mutation);

if (route.query.active) {
  state.activePage = route.query.active;
  state.tcoCustomDtoList = null;
  const revertState = JSON.parse(decodeURIComponent(route.query.revertState));

  Object.keys(revertState).forEach((key) => {
    state[key] = revertState[key];
  });
  const handleWechatTCOWebViewBack = () => {
    window.history.pushState(null, null, null);
    window.onpopstate = function (e) {
      tcoRef.value.calcRes(false);
      wx.miniProgram.postMessage({
        data: {
          stateData: state,
        },
      });
      wx.miniProgram.navigateBack({
        delta: 1,
      });
    };
  };

  handleWechatTCOWebViewBack();
}
</script>

<script>
import Comprehensive from "../components/TCO/comprehensive.vue";
import Safe from "../components/TCO/safe.vue";
import Enviroment from "../components/TCO/environment.vue";
import Effcient from "../components/TCO/efficient.vue";

export default {
  components: {
    Comprehensive,
    Safe,
    Enviroment,
    Effcient,
  },
};
</script>

<style lang="scss" scoped></style>
