<template>
  <div>
    <div class="switch-bar">
      <span class="switch-bar-item" :class="activeBar == '1' ? 'switch-bar-item-active' : ''" @click="switchBar('1')">两种油品混合</span>
      <span class="switch-bar-item" :class="activeBar == '2' ? 'switch-bar-item-active' : ''" @click="switchBar('2')">达到目标黏度</span>
    </div>
    <KeepAlive>
      <component :is="activeCom" />
    </KeepAlive>
  </div>
</template>

<script setup>
const { ref } = Vue;
const activeBar = ref("1");
const activeCom = ref("Postive");
const comMap = {
  1: "Postive",
  2: "Revert",
};
const switchBar = (activeTab) => {
  activeBar.value = activeTab;
  activeCom.value = comMap[activeTab];
};
</script>

<script>
import Postive from "../components/ViscousBlending/postive.vue";
import Revert from "../components/ViscousBlending/revert.vue";
export default {
  components: {
    Postive,
    Revert,
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
