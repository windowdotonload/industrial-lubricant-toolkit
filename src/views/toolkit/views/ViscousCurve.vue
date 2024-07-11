<template>
  <div>
    <div id="to-img-marker">
      <div class="form-container">
        <FormItem :ref="`form-item-${item.formIndex}`" v-for="(item, i) in formList" :key="item.formIndex" :itemIndex="item.formIndex" @deleteProduct="deleteProduct" />
      </div>
      <div style="display: flex; justify-content: flex-end; padding: 0 20px">
        <div class="add-btn" @click="addProduct" v-if="formList.length < 3">
          <van-icon name="plus" />
          <span style="margin-left: 10px">添加产品</span>
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: center; padding: 0 20px; margin-bottom: 20px; height: 100px; align-items: center">
      <div class="generate-btn" @click="generateCharts">
        <span>生成图表</span>
      </div>
    </div>
  </div>
  <ShareButton />
</template>

<script>
import FormItem from "../components/viscousCurve/FormItem.vue";
import ShareButton from "../../../components/ShareButton/index";

export default {
  components: {
    FormItem,
    ShareButton,
  },
  data() {
    return {
      formList: [
        {
          formIndex: 0,
        },
      ],
      chartsData: [],
    };
  },
  methods: {
    addProduct(e) {
      const len = this.formList.length;
      this.formList.push({
        formIndex: len,
      });
    },
    deleteProduct(index) {
      this.formList.splice(index, 1);
      this.formList.forEach((item, i) => (item.formIndex = i));
    },
    generateCharts() {
      this.chartsData = [];

      const validateRes = this.formList.every((item) => {
        const FormItem = this.$refs[`form-item-${item.formIndex}`];
        this.chartsData.push(FormItem[0].contributeItemFormData());
        return FormItem[0].validateFormItem();
      });

      if (!validateRes) {
        return;
      }
      this.$router.push({
        name: "ViscousCurveChart",
        query: {
          chartData: JSON.stringify(this.chartsData),
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  box-sizing: border-box;
  padding: 10px;
}

.add-btn {
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
  background-color: #ffffff;
  padding: 5px 15px;
  color: #999999;
  font-size: 13px;
  cursor: pointer;
}

.generate-btn {
  cursor: pointer;
  border-radius: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #001450;
  padding: 5px 15px;
  color: #ffffff;
  font-size: 15px;
}
</style>
