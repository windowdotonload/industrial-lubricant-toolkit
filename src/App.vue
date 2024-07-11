<script setup></script>

<template>
  <router-view />
</template>

<style lang="scss">
.toolkit-box-outer {
  box-sizing: border-box;
  width: 440px;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.toolkit-box-outer-wechat {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.section-title {
  box-sizing: border-box;
  padding: 12px;
  font-size: 16px;
  font-weight: 700;
  background-color: #f2f2f2;
}
.section-input {
  background-color: #fff;
}
.viewformula-btn {
  padding: 2px 8px;
  border-radius: 16px;
  font-size: 15px;
  color: #008888;
  float: right;
  cursor: pointer;
}

.formula-title {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 700;
  text-align: center;
}
.tip-text {
  margin-left: 5px;
  font-size: 13px;
  color: #666;
  font-weight: normal;
}
.footer-btn {
  font-weight: 700;
  border-top: 1px solid #e9e9e9;
  text-align: center;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}
.van-overlay {
  position: absolute;
}
.van-cell {
  background: #f9f9f9 !important;
}
.calc_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  box-sizing: border-box;
  width: 92%;
  margin: 0 auto;
  background: #dd0000;
  padding: 10px;
  color: #fff;
  border-radius: 26px;
  margin-top: 10px;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
