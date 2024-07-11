<template>
  <div class="form-item-container">
    <div class="white-block">
      <div class="product-header">
        <span>产品{{ itemIndex + 1 }}</span>
        <span style="color: #d10000; font-weight: normal; cursor: pointer" v-if="itemIndex > 0" @click="deleteItem">删除</span>
      </div>
      <van-field autocomplete="off" :maxlength="50" v-model="formData.productName" input-align="right" title-width="50%" label="产品名称" placeholder="请输入" :border="false" />
      <van-field autocomplete="off" v-model="formData.Temp_1" input-align="right" title-width="50%" label="温度1（°C）" placeholder="请输入" :border="false" />
      <van-field autocomplete="off" v-model="formData.KV_1" input-align="right" title-width="50%" label="黏度1（cSt）" placeholder="请输入" :border="false" />
      <van-field autocomplete="off" v-model="formData.Temp_2" input-align="right" title-width="50%" label="温度2（°C）" placeholder="请输入" :border="false" />
      <van-field autocomplete="off" v-model="formData.KV_2" input-align="right" title-width="50%" label="黏度2（cSt）" placeholder="请输入" :border="false" />
    </div>
  </div>
</template>

<script>
import ShareButton from "../../../../components/ShareButton/index";
import CopyButton from "../../../../components/CopyButton/index.vue";
import { simpleDeepClone, getBaseLog, judgeClearValue } from "../../../../global/customerApi";
import * as VAL from "../../../../utils/validate";
const { Toast } = vant;
let preInputVal = {
  productName: "",
  Temp_1: 40,
  Temp_2: 100,
  KV_1: "",
  KV_2: "",
};
export default {
  emits: ["deleteProduct"],
  props: {
    itemIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      formData: {
        productName: "",
        Temp_1: 40,
        Temp_2: 100,
        KV_1: "",
        KV_2: "",
      },
      tipMsgMap: {
        productName: "产品名称",
        Temp_1: "温度1",
        Temp_2: "温度2",
        KV_1: "黏度1",
        KV_2: "黏度2",
      },
    };
  },
  watch: {
    formData: {
      handler(val) {
        if (val.Temp_1 == val.Temp_2) {
          if (val.Temp_1 == preInputVal.Temp_1) this.formData.Temp_2 = "";
          if (val.Temp_2 == preInputVal.Temp_2) this.formData.Temp_1 = "";
          Toast("请输入不同温度");
        }
        VAL.validateNumRange(this.formData, "Temp_1", -40, 200, 1, true);
        VAL.validateNumRange(this.formData, "Temp_2", -40, 200, 1, true);
        VAL.validateNumRange(this.formData, "KV_1", 0, 46000, 1);
        VAL.validateNumRange(this.formData, "KV_2", 0, 46000, 1);
        preInputVal = Object.assign({}, val);
      },
      deep: true,
    },
  },
  methods: {
    validateFormItem() {
      const res = Object.keys(this.formData).every((key) => {
        if (!this.formData[key]) {
          const msg = `请填写 产品${this.itemIndex + 1} - ${this.tipMsgMap[key]}`;
          Toast(msg);
        }
        return this.formData[key];
      });
      return res;
    },
    contributeItemFormData() {
      return this.formData;
    },
    deleteItem() {
      this.$emit("deleteProduct", this.itemIndex);
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.van-cell) {
  background: #fff !important;
}
.product-header {
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: 16px;
  font-weight: bolder;
  justify-content: space-between;
}

.component-container {
  margin: 0;
  padding: 0;
  width: 100%;
}

.block-header {
  display: flex;
  height: 100px;
  align-items: center;
  padding: 0 20px;
  color: #000;
  font-weight: 700;
  font-size: 29px;
}

.white-block {
  background: #ffffff;
  border-radius: 11px;
  padding-bottom: 20px;
  margin-bottom: 10px;
}

.filed-bar {
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  height: 43px;
  padding: 20px 32px;
}

.filed-bar-label {
  color: #646566;
}

.radio-class {
  margin-left: 6px;
  font-size: 30px;
  color: #646566;
}

.copy_btn {
  font-size: 26px;
  display: inline-block;
  padding: 0 20px;
  border-radius: 30px;
  color: #001450;
  border: 1px solid #001450;
}
</style>
