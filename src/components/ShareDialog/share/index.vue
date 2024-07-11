<template>
  <van-dialog :show="show" :show-cancel-button="false" :show-confirm-button="false" confirm-button-color="#000">
    <div class="share-content">
      <div class="img-box">
        <van-loading v-if="!imgUrl" />
        <van-image scale-down v-if="imgUrl" class="preview-img" :src="imgUrl" alt="" />
      </div>
      <div class="save-btn" @click="savePicture">保存图片到相册</div>
    </div>
  </van-dialog>
  <div v-show="show">
    <van-icon @click="closeDialog" name="close" size="28px" color="#fff" style="position: absolute; z-index: 99999; top: 75%; left: 50%; transform: translateX(-50%); cursor: pointer" />
  </div>
</template>

<script setup>
import { judgeIndirectSave } from "../util.js";
const { defineProps, defineEmits } = Vue;
const emits = defineEmits(["close"]);
const props = defineProps({
  show: { type: Boolean, default: false },
  imgUrl: { type: String, default: "" },
  loading: { type: Boolean, default: false },
});

const savePicture = () => {
  wx.miniProgram.postMessage({
    data: {
      imgData: props.imgUrl,
    },
  });
  if (judgeIndirectSave(closeDialog)) return;
  wx.miniProgram.navigateBack({ delta: 1 });
};
const closeDialog = () => {
  emits("close");
};
</script>

<style lang="scss" scoped>
.share-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 18px 0;
  height: 390px;
  flex-wrap: wrap;
}
.img-box {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 80%;
  height: 80%;
  box-shadow: 0 0 5px rgba(153, 153, 153, 0.5);
  border-radius: 12px;
}
.preview-img {
  width: 100%;
  height: 100%;
}

.save-btn {
  font-size: 15px;
  color: #fff;
  background-color: #008888;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
}
.close-icon {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
