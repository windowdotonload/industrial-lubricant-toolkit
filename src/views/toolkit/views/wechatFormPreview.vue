<template>
  <div v-for="item in formContentList" :key="item.id">
    <van-field v-model="item.default" :label="item.fieldName" label-width="fit-content" placeholder="请输入" v-if="item.componentType == 1" input-align="right" :border="false" disabled />
    <van-field :label="item.fieldName" label-width="fit-content" :placeholder="item.default || '请选择'" v-if="item.componentType == 2 || item.componentType == 5 || item.componentType == 6 || item.componentType == 9" input-align="right" :border="false" disabled>
      <template v-slot:right-icon>
        <van-icon name="arrow" />
      </template>
    </van-field>
    <div v-if="item.componentType == 3">
      <van-field label-width="fit-content" :label="item.fieldName" input-align="right" disabled :border="false">
        <template v-slot:right-icon>
          <van-radio-group v-if="item.componentType == 3 && !item.options" v-model="item.default" disabled style="display: flex; flex-wrap: nowrap">
            <van-radio>选项 1</van-radio>
            <van-radio>选项 2</van-radio>
          </van-radio-group>
          <van-radio-group v-if="item.componentType == 3 && item.options && item.options.length < 3" v-model="item.default" disabled style="display: flex; flex-wrap: nowrap">
            <van-radio v-for="k in item.options" :key="k.value" :name="k.value">{{ k.label || k.value }}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-cell :border="false" v-if="item.componentType == 3 && item.options && item.options.length >= 3">
        <van-radio-group disabled v-model="item.default">
          <van-radio v-for="k in item.options" :key="k.value" :name="k.value" style="margin-bottom: 10px">{{ k.label || k.value }}</van-radio>
        </van-radio-group>
      </van-cell>
    </div>
    <div v-if="item.componentType == 4">
      <van-field label-width="fit-content" :label="item.fieldName" input-align="right" disabled :border="false">
        <template v-slot:right-icon>
          <van-checkbox-group v-if="item.componentType == 4 && !item.options" disabled style="display: flex; flex-wrap: nowrap" v-model="item.default">
            <van-checkbox shape="square">选项 1</van-checkbox>
            <van-checkbox shape="square"> 选项 2</van-checkbox>
          </van-checkbox-group>
          <van-checkbox-group v-model="item.default" v-if="item.componentType == 4 && item.options && item.options.length < 3" disabled style="display: flex; flex-wrap: nowrap">
            <van-checkbox v-for="k in item.options" :key="k.value" shape="square" :name="k.value">{{ k.label || k.value }}</van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field>
      <van-cell :border="false" v-if="item.componentType == 4 && item.options && item.options.length >= 3">
        <van-checkbox-group disabled shape="square" v-model="item.default">
          <van-checkbox v-for="k in item.options" :key="k.value" style="margin-bottom: 10px" :name="k.value">{{ k.label || k.value }}</van-checkbox>
        </van-checkbox-group>
      </van-cell>
    </div>
    <div v-if="item.componentType == 7">
      <van-field label-width="fit-content" :label="item.fieldName" input-align="right" disabled :border="false">
        <template v-slot:label> {{ item.fieldName }} <span>（单个文件大小上限50M）</span> </template>
      </van-field>
      <van-cell :border="false" disabled style="padding-top: 0">
        <span style="color: #001450"> 添加附件</span>
      </van-cell>
    </div>
    <div v-if="item.componentType == 8">
      <van-field label-width="fit-content" :label="item.fieldName" input-align="right" disabled :border="false">
        <template v-slot:label> {{ item.fieldName }} <span>（单个文件大小上限20M）</span> </template>
      </van-field>
      <van-cell :border="false" disabled style="padding-top: 0">
        <div class="upload-icon">
          <van-icon name="plus" style="font-size: 18px" />
        </div>
      </van-cell>
    </div>
    <van-field :label="item.fieldName" label-width="fit-content" placeholder="请填写表格" v-if="item.componentType == 10" input-align="right" :border="false" disabled>
      <template v-slot:right-icon>
        <van-icon name="arrow" />
      </template>
    </van-field>
    <div v-if="item.componentType == 11" style="background: #f9f9f9; padding-left: 15px">
      <div v-if="item.textStyle == 1" style="font-weigth: bloder; font-size: 23px">{{ item.textContent }}</div>
      <div v-else>{{ item.textContent }}</div>
    </div>
  </div>
</template>

<script setup>
const { ref, reactive, watch, toRaw } = Vue;
const formContentList = JSON.parse(decodeURIComponent(location.hash.split("?")[1].split("=")[1])).map((item) => {
  item.id = item.__uuid;
  return item._configField;
});
</script>

<style lang="scss" scoped>
:deep(.van-radio) {
  margin-right: 10px;
}
:deep(.van-checkbox) {
  margin-right: 8px;
}
:deep(.van-radio:last-child) {
  margin-right: 0;
}
:deep(.van-checkbox:last-child) {
  margin-right: 0;
}
:deep(.van-checkbox__icon .van-badge__wrapper) {
  border-radius: 3px;
}
.upload-icon {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  background: rgb(204, 204, 204, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
