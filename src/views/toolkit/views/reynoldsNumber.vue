<template>
  <div>
    <div class="switch-bar">
      <span class="switch-bar-item" :class="activeBar == '1' ? 'switch-bar-item-active' : ''" @click="switchBar('1')">核算目前雷诺数是否合适</span>
      <span class="switch-bar-item" :class="activeBar == '2' ? 'switch-bar-item-active' : ''" @click="switchBar('2')">计算润滑系统冲洗所需泵流量</span>
    </div>
    <KeepAlive>
      <component :is="activeCom" />
    </KeepAlive>
  </div>
</template>

<script setup>
const { ref } = Vue;
const activeBar = ref("1");
const activeCom = ref("Fitable");
const comMap = {
  1: "Fitable",
  2: "RequiredFlow",
};
const switchBar = (activeTab) => {
  activeBar.value = activeTab;
  activeCom.value = comMap[activeTab];
};
</script>
<script>
import Fitable from "../components/reynoldsNumber/Fitable.vue";
import RequiredFlow from "../components/reynoldsNumber/RequiredFlow.vue";
export default {
  components: {
    Fitable,
    RequiredFlow,
  },
};
</script>

<style lang="scss" scoped>
.switch-bar {
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0;
  padding: 0;
  height: 50px;
  .switch-bar-item {
    cursor: pointer;
    height: 100%;
    display: flex;
    width: 50%;
    font-size: 13px;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid #999;
  }
  .switch-bar-item-active {
    border-bottom: 2px solid #001450;
  }
}
</style>
