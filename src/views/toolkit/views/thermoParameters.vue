<template>
  <div id="to-img-marker">
    <div class="section-title">基本信息</div>
    <div class="section-input">
      <van-field :border="false" input-align="right" disabled>
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px; cursor: pointer">基础油类型</span>
        </template>
        <template #right-icon>
          <div style="display: flex; cursor: pointer; color: #c8c9cc" @click="openPopup">
            {{ checkItem ? checkItem.name : "请选择" }}
            <van-icon name="arrow" />
          </div>
        </template>
      </van-field>
      <van-field :border="false" v-model="productName" placeholder="请输入" input-align="right" maxlength="50" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px">产品名称</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.skgl" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px">15°C时密度（Kg/L）</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.pourPoint" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px">倾点（℃）</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.flashPoint" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px">闪点（℃）</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.KV_40" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px">40℃时黏度（cSt）</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.KV_100" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px">100℃时黏度（cSt）</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.VNM" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px">黏度指数</span>
        </template>
      </van-field>
      <van-field :border="false" v-model="calcInput.t" placeholder="请输入" input-align="right" autocomplete="off">
        <template #label>
          <span style="color: #646566; display: inline-block; width: 170px">操作温度（℃）</span>
        </template>
      </van-field>
    </div>

    <div class="section-title">计算结果</div>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px">在操作温度下的黏度</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.cSt_t, 'cSt')" />
        <CopyButton :copyVal="calcOutput.cSt_t" />
      </template>
    </van-field>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px">15°C时密度</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.s, 'kg/m³')" />
        <CopyButton :copyVal="calcOutput.s" />
      </template>
    </van-field>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px">15°C时热膨胀系数</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.A)" />
        <CopyButton :copyVal="calcOutput.A" />
      </template>
    </van-field>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px">操作温度时密度</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.D, 'kg/L')" />
        <CopyButton :copyVal="calcOutput.D" />
      </template>
    </van-field>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px">比热</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.Cp, 'kJ/kgk')" />
        <CopyButton :copyVal="calcOutput.Cp" />
      </template>
    </van-field>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px">导热系数</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.λ, 'W/mk')" />
        <CopyButton :copyVal="calcOutput.λ" />
      </template>
    </van-field>
    <van-field :border="false" label-width="120px" disabled input-align="right" autocomplete="off">
      <template #label>
        <span style="color: #646566; display: inline-block; width: 170px">热扩散系数</span>
      </template>
      <template #right-icon>
        <span style="color: #646566" v-html="toolkit_EmptyVal(calcOutput.X, 'm²/s')" />
        <CopyButton :copyVal="calcOutput.X" />
      </template>
    </van-field>
  </div>
  <ShareButton />
  <div id="selPppup"></div>
</template>

<script setup>
import ShareButton from "../../../components/ShareButton/index";
import CopyButton from "../../../components/CopyButton/index.vue";
import { showPopup } from "../../../components/Popup/index";
import { oilType, typeToRes } from "../components/thermoPatamerters/data";
import { simpleDeepClone, getBaseLog } from "../../../global/customerApi";
import * as VAL from "../../../utils/validate";

const { ref, reactive, watch } = Vue;

const calcInput = reactive({ skgl: "", KV_40: "", KV_100: "", t: "", pourPoint: "", flashPoint: "", VNM: "" });
const calcOutput = reactive({ s: "", A: "", D: "", Cp: "", λ: "", X: "", cSt_t: "" });
const productName = ref("");
const checkItem = ref(null);
const radioClick = (item) => {
  checkItem.value = item;
};
const openPopup = () => {
  showPopup(oilType, checkItem.value ? checkItem.value.value : "", "选择基础油类型", radioClick);
};

watch(calcInput, (val) => {
  VAL.validateNumRange(val, "skgl", 0, 25, 4);
  VAL.validateNumRange(val, "pourPoint", -100, 200, 1, true);
  VAL.validateNumRange(val, "flashPoint", -100, 500, 1, true);
  VAL.validateNumRange(val, "t", -100, 200, 1, true);
  VAL.validateNumRange(val, "KV_40", 0, 1000000, 1);
  VAL.validateNumRange(val, "KV_100", 0, 1000000, 1);
  VAL.validateNumRange(val, "VNM", 0, 10000, 1);

  calcRes();
});
watch(
  () => checkItem.value,
  () => {
    calcRes();
  }
);

const calcRes = () => {
  const { skgl, KV_40, KV_100, t } = simpleDeepClone(calcInput);
  if (!checkItem.value) return;
  const { Coef_D, A1, B1, A2, B2 } = simpleDeepClone(typeToRes[checkItem.value.value]);
  const s = skgl * 1000;
  const expansionA = 0.6274 / s;
  const D = s / (1 + Coef_D * (t - 15)) / 1000;
  const Cp = (A1 + B1 * t) / Math.sqrt(skgl);
  const λ = (A2 - B2 * t) / skgl;
  const X = λ / (D * Cp);

  const Temp_1 = 40;
  const Temp_2 = 100;
  const Z1 = KV_40 + 0.7 + Math.exp(-1.47 - 1.84 * KV_40 - 0.51 * Math.pow(KV_40, 2));
  const Z2 = KV_100 + 0.7 + Math.exp(-1.47 - 1.84 * KV_100 - 0.51 * Math.pow(KV_100, 2));
  const B = (getBaseLog(10, getBaseLog(10, Z1)) - getBaseLog(10, getBaseLog(10, Z2))) / (getBaseLog(10, Temp_2 + 273.15) - getBaseLog(10, Temp_1 + 273.15));
  const A = getBaseLog(10, getBaseLog(10, Z2)) + B * getBaseLog(10, Temp_2 + 273.15);
  const Z_Known = Math.pow(10, Math.pow(10, A - B * getBaseLog(10, t + 273.15)));
  const KV = Z_Known - 0.7 - Math.exp(-0.7487 - 3.295 * (Z_Known - 0.7) + 0.6119 * Math.pow(Z_Known - 0.7, 2) - 0.3193 * Math.pow(Z_Known - 0.7, 3));
  const cSt_t = KV;

  calcOutput.s = s.toFixed(1);
  calcOutput.A = expansionA.toFixed(5);
  calcOutput.D = D.toFixed(4);
  calcOutput.Cp = Cp.toFixed(4);
  calcOutput.λ = λ.toFixed(5);
  calcOutput.X = X.toFixed(4);
  calcOutput.cSt_t = cSt_t.toFixed(5);

  if (!calcInput.skgl.toString()) {
    calcOutput.s = "";
    calcOutput.A = "";
  }
  if (!calcInput.skgl.toString() || !calcInput.t.toString()) {
    calcOutput.D = "";
    calcOutput.Cp = "";
    calcOutput.λ = "";
    calcOutput.X = "";
  }
  if (!calcInput.t.toString() || !calcInput.KV_40.toString() || !calcInput.KV_100.toString()) {
    calcOutput.cSt_t = "";
  }
};
</script>

<style lang="scss" scoped></style>
