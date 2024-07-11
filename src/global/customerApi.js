const { Toast } = vant;
const { ref, isRef, isReactive } = Vue;
export const ENV = navigator.userAgent.includes("Mobile") ? "wechat" : "web";
export const copyText = (val) => {
  const input = document.createElement("input");
  input.setAttribute("readonly", "readonly");
  input.setAttribute("value", val);
  document.body.appendChild(input);
  input.setSelectionRange(0, 99999);
  if (document.execCommand("copy")) {
    document.execCommand("copy");
    Toast(val);
  }
  document.body.removeChild(input);
};
export const getBaseLog = (x, y) => {
  // 以x为底y的对数 ex：getBaseLog（3，9） = 2
  return Number(Math.log(y) / Math.log(x));
};
export const toNumber = (val) => {
  /**
   * @description:
   * @param {Object} val
   * @return {*}
   */
  Object.keys(val).forEach((key) => {
    val[key] = isNaN(Number(val[key])) ? val[key] : Number(val[key]);
  });
  return val;
};
export const simpleDeepClone = (val) => toNumber(JSON.parse(JSON.stringify(val)));
export const resetValue = (target, keys) => {
  if (isRef(target)) {
    target.value = "";
    return;
  } else if (isReactive(target)) {
    if (!keys) {
      Object.keys(target).forEach((key) => (target[key] = ""));
      return;
    }
    keys.forEach((key) => (target[key] = ""));
  }
};
export const judgeClearValue = (target, resetTarget, judgeKeys, resetKey) => {
  if (!judgeKeys) {
    Object.keys(target).some((key) => {
      if (!target[key]) {
        resetValue(resetTarget, resetKey);
        return true;
      }
    });
    return;
  }
  judgeKeys.some((key) => {
    if (!target[key]) {
      resetValue(resetTarget, resetKey);
      return true;
    }
  });
};
export const getAndSetConfigureParams = (key = "toolkit-params") => {
  const tempArr = window.location.hash.split("?");
  let params = null;

  if (tempArr.length > 1) {
    params = JSON.parse(decodeURIComponent(window.location.hash.split("?")[1].split("=")[1].split("&")[0]));
    sessionStorage.setItem(key, JSON.stringify(params));
  }
  return params;
};
export const delayExec = (func, delay) => {
  return new Promise((res) => {
    setTimeout(async () => {
      await func();
      res("overload");
    }, delay);
  });
};

export const loadGlobalProperties = (app) => {
  app.config.globalProperties.ENV = ref(ENV);
  app.config.globalProperties.copyText = copyText;
  app.config.globalProperties.getBaseLog = getBaseLog;
  app.config.globalProperties.toNumber = toNumber;
  app.config.globalProperties.toolkit_EmptyVal = (value, unit) => {
    if (!value || isNaN(value) || Math.abs(value) == Infinity) return "<span style='color:#d10000'>缺少必要信息</span>";
    return `<span>${value}</span> ${unit || ""}`;
  };
  app.config.globalProperties.toolkit_count_empty_value = (value,flag) => {
    let str = ''
    if(!value){
      str = flag ? '暂时无法推荐产品' : '缺少必要信息'
    }
    if (!value) return `<span style='color:#d10000'>${str}</span>`;
    return `<span>${value}</span>`;
  };
  app.config.globalProperties.toolkit_count_empty_value_LP = (value,flag) => {
    let str = ''
    if(!value){
      str = flag ? '暂时无法计算' : '缺少必要信息'
    }
    if (!value) return `<span>${str}</span>`;
    return `<span>${value}</span>`;
  };
};
