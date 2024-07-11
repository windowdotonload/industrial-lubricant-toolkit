<template>
  <div :class="ENV.value == 'web' ? 'toolkit-layout' : ''">
    <div :class="ENV.value == 'web' ? 'toolkit-box' : 'toolkit-box-wechat'">
      <router-view />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
#to-img-marker {
  background-color: #fff;
}
.toolkit-layout {
  background-color: #f7f8fa;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
}
.toolkit-box {
  position: relative;
  box-sizing: border-box;
  width: 440px;
  height: 95%;
  background: #f2f2f2;
  border-radius: 23px;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}
.toolkit-box-wechat {
  margin: 0;
  padding: 0;
  position: relative;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background: #f2f2f2;
  overflow-x: hidden;
  overflow-y: auto;
}

::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: #f9f9f9;
}

@media screen and (max-height: 750px) {
  .toolkit-box {
    width: 426px;
    height: 98%;
  }
}
</style>
