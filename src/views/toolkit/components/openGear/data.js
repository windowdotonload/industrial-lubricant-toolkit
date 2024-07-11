export const selectOptions1th = [
  {
    value: 1,
    name: "美孚SHC齿轮油6800",
  },
  {
    value: 2,
    name: "美孚SHC 齿轮油22M/46M",
  },
  {
    value: 3,
    name: "美孚齿轮润滑剂OGL 007",
  },
  {
    value: 4,
    name: "美孚特嘉325 NC/375 NC",
  },
  {
    value: 5,
    name: "美孚得耐格600/800/2000/4000开式齿轮润滑脂",
  },
];

export const selectOptions2nd = [
  {
    value: 1,
    name: "正常运行",
  },
  {
    value: 2,
    name: "磨合期运行",
  },
];

export const selectOptions3th = [
  {
    value: 1,
    name: "磨机",
  },
  {
    value: 2,
    name: "回转窑/干燥机",
  },
];

export const selectOptions4th = [
  {
    value: 1,
    name: "单齿轮驱动",
  },
  {
    value: 2,
    name: "双齿轮驱动",
  },
];

export const optionsMap = {
  0: selectOptions1th,
  1: selectOptions2nd,
  2: selectOptions3th,
  3: selectOptions4th,
};

export const titleMap = {
  0: "选择润滑剂名称",
  1: "选择工作类型",
  2: "选择设备类型",
  3: "选择驱动类型",
};

export const calcPopupSelKeyMap = {
  0: "Lub",
  1: "Work",
  2: "Device",
  3: "Drive",
};

export const get_LubType = (val) => {
  let res = null;
  if (val == 1 || val == 2 || val == 4) {
    res = 1;
  } else if (val == 3 || val == 5) {
    res = 2;
  }
  return res;
};

export const get_CoefWork = (val) => {
  if (val == 1) return 1;
  else if (val == 2) return 1.5;
};

export const get_CoefDevice = (val) => {
  if (val == 1) return 1.5;
  else if (val == 2) return 1;
};

export const get_CoefDrive = (val, Lub_Type) => {
  if (val == 1) return 1;
  else if (val == 2) {
    if (Lub_Type == 1) {
      return 1.5;
    } else if (Lub_Type == 2) {
      return 2;
    }
  }
};

export const get_CoefLub = (W, D, Lub_Type) => {
  if (W <= 0.2 && D <= 3) {
    if (Lub_Type == 1) return 0.39;
    if (Lub_Type == 2) return 0.75;
  } else if (W <= 0.4 && D <= 3.7) {
    if (Lub_Type == 1) return 0.59;
    if (Lub_Type == 2) return 1.1;
  } else if (W < 0.4 && W > 0.2 && D > 3.7 && D < 4.3) {
    if (Lub_Type == 1) return (W + (D - 3.7) / 3) * 1 + 0.19 + (D - 3.7) / 6;
    if (Lub_Type == 2) return (W + (D - 3.7) / 3) * 1.75 + 0.4 + (D - 3.7) * 0.3;
  } else if (W <= 0.2 && D < 4.3 && D > 3.7) {
    if (Lub_Type == 1) return 0.59;
    if (Lub_Type == 2) return 1.1;
  } else {
    if (Lub_Type == 1) return (W + (D - 3.7) / 3) * 1 + 0.19;
    if (Lub_Type == 2) return (W + (D - 3.7) / 3) * 1.75 + 0.4;
  }
};
