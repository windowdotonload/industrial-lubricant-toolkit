const { Toast } = vant;
let validateValidNumT = null,
  validateFloatT = null,
  validateNumRangeT = null;
const delay = 800;

export const wecaht_toast = (msg) => {
  Toast(msg);
};

export const clearStamp = (stamp) => {
  if (stamp) {
    clearTimeout(stamp);
    stamp = null;
  }
};

export const validateValidNum = (target, key, reserveZero) => {
  if (!target[key].toString()) return;
  const value = target[key];
  if (isNaN(value) && value != "-") {
    clearStamp(validateValidNumT);
    validateValidNumT = setTimeout(() => {
      target[key] = "";
    }, 100);
    wecaht_toast("请输入数字");
    return;
  } else {
    clearStamp(validateValidNumT);
    if (reserveZero) {
      if (!target[key].toString().includes(".") && target[key] != 0) target[key] = target[key].toString().replace(/^0+/, "");
      return;
    }
    if (!target[key].toString().includes(".")) target[key] = target[key].toString().replace(/^0+/, "");
  }
};

export const validateFloat = (target, key, floatNum = 1) => {
  const value = target[key];
  if (floatNum == 0 && value.toString().includes(".")) {
    validateFloatT = setTimeout(() => {
      target[key] = parseInt(Math.floor(value));
    }, 0);
    return;
  }
  const strVal = value.toString();
  const splitDot = strVal.split(".");
  const split_1 = splitDot[1];
  if (!split_1) return;
  if (split_1.length > floatNum) {
    splitDot[1] = splitDot[1].substr(0, floatNum);
    const newSetval = parseFloat(splitDot.join("."));
    validateFloatT = setTimeout(() => {
      target[key] = newSetval;
    }, 10);
  }
};

export const validateNumRange = (target, key, min = 0, max = 100, floatNum = 1, reserveZero = false) => {
  validateValidNum(target, key, reserveZero);
  validateFloat(target, key, floatNum);
  const value = target[key];

  if (value < min || value > max) {
    wecaht_toast(`请输入${min}-${max}的${min < 0 ? "数字" : "正数"}`);
    validateNumRangeT = setTimeout(() => {
      target[key] = value < min ? min : max;
    }, delay);
  }
};

export const validateVolume = (value, key, vm) => {
  validateNumRange(value, key, vm, 0, 9999999);
};

export const validateViscosity = (value, key, vm) => {
  validateValidNum(value);
  if (value < 0 || value > 46000) {
    wecaht_toast("请输入0 - 46 000内数字");
  }
  validateFloat(value, key, vm);
};

export const validateTemperature = (() => {
  const tempRecord = {
    Temp_1: null,
    Temp_2: null,
  };
  return (value, key, vm, checkTempSame = false) => {
    validateValidNum(value);
    if (value < -40 || value > 200) {
      wecaht_toast("请输入-40 - 200内数字");
    }
    validateFloat(value, key, vm);
    if (!checkTempSame) return;
    if (vm.data.formData.Temp_1 == vm.data.formData.Temp_2 && value) {
      wecaht_toast("请输入不同温度");
      if (value != tempRecord[key]) {
      }
    }
    tempRecord[key] = value;
  };
})();
