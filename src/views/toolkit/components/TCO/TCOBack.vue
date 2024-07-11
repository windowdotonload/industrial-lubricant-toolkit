<template>
  <div class="tco-back" @click="goBack">返回</div>
</template>

<script setup>
import { ENV, delayExec } from "../../../../global/customerApi";
import { useToImg } from "../../../../utils/domToImg";

const { inject, defineProps } = Vue;
const { Toast } = vant;
const { useRouter, useRoute } = VueRouter;
const route = useRoute();
const state = inject("state");
const mutation = inject("mutation");
const saveImgNameMap = {
  Safe: "img_url_safe",
  Enviroment: "img_url_enviro",
  Effcient: "img_url_efficient",
};
const props = defineProps({
  parentCalcRes: {
    type: Function,
  },
});
const goBack = async () => {
  if (route.query.active) {
    wx.miniProgram.postMessage({
      data: {
        stateData: state,
      },
    });
    wx.miniProgram.navigateBack({
      delta: 1,
    });

    return;
  }

  if (ENV == "wechat") {
    Toast.loading({
      message: "请稍后...",
      forbidClick: true,
    });
    const exec = async () => {
      const { imgUrl } = await useToImg();
      Toast.clear();
      state[saveImgNameMap[state.activePage]] = imgUrl.value;
    };

    await delayExec(exec, 300);
  }

  mutation.chagneActive("Comprehensive");
};
</script>

<style lang="scss" scoped>
.tco-back {
  position: absolute;
  right: 12px;
  font-size: 13px;
  color: #001450;
  font-weight: 600;
  border: 1px solid #001450;
  padding: 2px 15px;
  border-radius: 12px;
  cursor: pointer;
}
</style>
