<template>
  <div v-show="fieldsArr.length > 0">
    <div class="section-input" v-for="(item, index) in fieldsArr" :key="item.__id" style="margin-top: 10px; margin-bottom: 10px">
      <van-field :border="false" disabled label-width="100%" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #646566; display: flex; justify-content: space-between; width: 100%">自定义项目{{ index + 1 }} <span style="font-size: 13px; color: #d10000; margin-left: 10px; cursor: pointer" @click="deleteFiled(item)">删除</span></p>
        </template>
      </van-field>
      <van-field maxlength="15" :border="false" v-model="fieldsArr[index].field1.value" label="自定义名称" label-width="200px" placeholder="请输入" input-align="right" autocomplete="off" />
      <van-field :disabled="item.disabled" :border="false" maxlength="9" v-model="item.field2.value" @update:model-value="inputCustomerVal(item)" label-width="200px" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #646566; display: flex; align-items: center">
            {{ props.exchangeUnit ? keyWordNames[item.field2.unit] : props.keyWordName }}
            <span>
              （{{ props.exchangeUnit || props.exchangeUnitOptions ? item.field2.unit : props.keyWordUnit }}）
              <Exchange v-if="props.exchangeUnit" :actions="actions" @onSelectPopover="(actions) => onSelectPopover(actions, item)" />
            </span>
          </p>
        </template>
      </van-field>
      <van-field :border="false" disabled label="描述" label-width="220px" input-align="right" autocomplete="off">
        <template #label>
          <p style="color: #646566; display: flex; justify-content: space-between; width: 100%">描述</p>
        </template>
      </van-field>
      <TextArea v-model="item.field3.value" />
    </div>
  </div>
  <div class="create-field-btn" v-show="fieldsArr.length < 10" @click="createField"><van-icon name="plus" style="margin-right: 10px" />添加自定义字段</div>
</template>

<script setup>
import TextArea from "../../../../components/TextArea/index.vue";
import Exchange from "../../../../components/ExchangeSection/index.vue";
import { validateNumRange } from "../../../../utils/validate";
const { defineProps, computed, ref, defineExpose, inject, watch, toRaw, nextTick } = Vue;
const { useRoute } = VueRouter;
const props = defineProps({
  keyWordName: {
    type: String,
  },
  keyWordNames: {
    type: Object,
  },
  keyWordUnit: {
    type: String,
  },
  exchangeUnit: {
    type: Boolean,
    default: false,
  },
  exchangeUnitOptions: {
    type: Array,
  },
});

const route = useRoute();
const state = inject("state");
const mutation = inject("mutation");
const fieldsArr = ref([]);
const { Toast } = vant;
const actions = computed(() => props.exchangeUnitOptions.map((item) => ({ text: item })));
if (route.query.active && route.query.tcoCustomDtoList) {
  const tcoCustomDtoList = JSON.parse(decodeURIComponent(route.query.tcoCustomDtoList));
  if (tcoCustomDtoList && tcoCustomDtoList.length) {
    tcoCustomDtoList.forEach((field, index) => {
      fieldsArr.value.push({
        __id: index + new Date().getTime().toString(),
        index: index,
        field1: { label: "自定义名称", value: field.name || "" },
        field2: { label: ``, value: field.value || "", unit: props.exchangeUnitOptions ? field.unit || props.exchangeUnitOptions[0] : "" },
        field3: { label: "描述", value: field.desc || "" },
      });
      state.tcoCustomDtoList = toRaw(fieldsArr.value);
    });
  }
}

const createField = () => {
  const len = fieldsArr.value.length;
  fieldsArr.value.push({
    __id: len + new Date().getTime().toString(),
    index: len,
    field1: { label: "自定义名称", value: "" },
    field2: { label: `${props.keyWordName}(${props.keyWordUnit})`, value: "", unit: props.exchangeUnitOptions ? props.exchangeUnitOptions[0] : "" },
    field3: { label: "描述", value: "" },
  });
};
const inputCustomerVal = (item) => {
  if (isNaN(item.field2.value)) {
    item.field2.value = "0";
    item.disabled = true;
    nextTick(() => {
      item.disabled = false;
    });
    return Toast("请输入数字");
  }
  validateNumRange(item.field2, "value", 0, 999999999, 2, true);
};
const deleteFiled = (item) => {
  const index = fieldsArr.value.findIndex((searchItem) => searchItem.__id == item.__id);
  fieldsArr.value.splice(index, 1);
};

const onSelectPopover = (actions, item) => {
  item.field2.unit = actions.text;
};
const getFinalValue = () => {
  let sum = 0;
  fieldsArr.value.forEach((field) => {
    sum += Number(field.field2.value);
  });
  return sum;
};
const getSeparateFinalValue = () => {
  if (!props.exchangeUnit) return;
  const sum = {
    res1: 0,
    res2: 0,
  };
  fieldsArr.value.forEach((field) => {
    const { field2 } = field;
    if (field2.unit == "L") {
      sum.res1 += Number(field2.value);
    } else if (field2.unit == "kg") {
      sum.res1 += Number(field2.value) / 0.87;
    } else if (field2.unit == "t") {
      sum.res2 += Number(field2.value);
    }
  });
  return sum;
};
const clear = () => {
  fieldsArr.value = [];
};
watch(
  () => fieldsArr.value.length,
  (val) => {
    state.tcoCustomDtoList = toRaw(fieldsArr.value);
  }
);
defineExpose({
  getFinalValue,
  getSeparateFinalValue,
  clear,
});
</script>

<style lang="scss" scoped>
.create-field-btn {
  padding: 10px;
  box-sizing: border-box;
  padding: 10px;
  justify-content: center;
  background-color: #fff;
  margin: 8px 20px;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #999;
  border-radius: 8px;
  color: #001450;
  border: 1px solid #001450;
  background-color: #fff;
  cursor: pointer;
}
</style>
