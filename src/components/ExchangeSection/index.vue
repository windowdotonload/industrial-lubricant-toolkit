<template>
  <van-popover v-model:show="showPopover" :actions="actions" @select="onSelectPopover">
    <template #reference>
      <van-icon name="exchange" style="cursor: pointer" :color="props.color" />
    </template>
  </van-popover>
</template>

<script setup>
const { ref, defineProps, defineEmits } = Vue;
const props = defineProps({
  color: {
    type: String,
    default: "#646566",
  },
  actions: {
    type: Array,
    required: true,
  },
});
const emits = defineEmits(["onSelectPopover"]);
const showPopover = ref(false);
const onSelectPopover = (actions) => {
  emits("onSelectPopover", actions);
};
</script>

<style lang="scss" scoped></style>
