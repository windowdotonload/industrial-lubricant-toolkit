<template>
  <span class="copy-btn" v-if="ENV.value == 'wechat' && checkVal()" @click="copy">复制</span>
</template>

<script setup>
import { copyText } from "../../global/customerApi";
const props = defineProps({
  copyVal: {
    type: [String, Number],
    default: "",
  },
  copyUnit: {
    type: String,
    default: "",
  },
});
const checkVal = () => {
  if (!props.copyVal || isNaN(props.copyVal) || Math.abs(props.copyVal) == Infinity) return false;
  return true;
};

const copy = () => {
  copyText(`${props.copyVal} ${props.copyUnit}`);
};
</script>

<style lang="scss" scoped>
.copy-btn {
  padding: 1px 8px;
  border-radius: 16px;
  border: 1px solid #001450;
  color: #001450;
  margin-left: 5px;
}
</style>
