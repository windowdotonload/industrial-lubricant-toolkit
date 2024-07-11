<template>
  <div class="textarea-container">
    <textarea rows="3" :maxlength="props.numLimit" v-model="inputVal" placeholder="请输入" />
    <span class="num-tip"> {{ inputValLen }}/{{ props.numLimit }}</span>
  </div>
</template>

<script setup>
const { defineProps, ref, defineEmits, watch, computed } = Vue;
const props = defineProps({
  numLimit: {
    type: Number,
    default: 100,
  },
  modelValue: {
    type: [String, Number],
  },
});
const emit = defineEmits(["update:modelValue"]);
const inputVal = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
const inputValLen = ref(0);
watch(
  inputVal,
  (val) => {
    inputValLen.value = val ? val.length : 0;
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.textarea-container {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f9f9f9;
  padding: 10px;
  padding-top: 0;
}
textarea {
  box-sizing: border-box;
  width: 100%;
  background: rgb(233, 233, 233, 0.5);
  border: none;
  border-radius: 6px;
  padding: 8px;
  color: #999;
  font-size: 13px;
}
.num-tip {
  position: absolute;
  color: #cccccc;
  bottom: 12px;
  right: 8%;
}
</style>
