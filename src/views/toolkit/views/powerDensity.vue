vue
<template>
  <div>
    <div class="switch-bar">
      <span class="switch-bar-item" :class="activeBar == '1' ? 'switch-bar-item-active' : ''" @click="switchBar('1')">杆型加热元件</span>
      <span class="switch-bar-item" :class="activeBar == '2' ? 'switch-bar-item-active' : ''" @click="switchBar('2')">板型加热元件</span>
    </div>
    <KeepAlive>
      <component :is="activeCom" />
    </KeepAlive>
  </div>
</template>

<script setup>
const { ref } = Vue;
const activeBar = ref("1");
const activeCom = ref("RodElement");
const comMap = {
  1: "RodElement",
  2: "PlateElement",
};
const switchBar = (activeTab) => {
  activeBar.value = activeTab;
  activeCom.value = comMap[activeTab];
};
</script>
<script>
import RodElement from "../components/powerDenisty/RodElement.vue";
import PlateElement from "../components/powerDenisty/PlateElement.vue";
export default {
  components: {
    RodElement,
    PlateElement,
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
