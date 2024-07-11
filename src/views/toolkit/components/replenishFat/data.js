export const selectOptions1th = [
  {
    value: 1,
    name: "1",
  },
  {
    value: 5,
    name: "5",
  },
  {
    value: 10,
    name: "10",
  },
];

export const selectOptions2nd = [
  {
    value: 1,
    name: "水平轴：1",
  },
  {
    value: 0.5,
    name: "立轴：0.5",
  },
];

export const bearingType = [
  {
    kVal: 10,
    value: 1,
    name: "深沟球轴承",
  },
  {
    kVal: 10,
    value: 2,
    name: "角接触球轴承",
  },
  {
    kVal: 10,
    value: 3,
    name: "调心球轴承",
  },
  {
    kVal: 5,
    value: 4,
    name: "圆柱滚子轴承",
  },
  {
    kVal: 1,
    value: 5,
    name: "圆锥滚子轴承",
  },
  {
    kVal: 1,
    value: 6,
    name: "调心滚子轴承",
  },
  {
    kVal: 10,
    value: 7,
    name: "推力球轴承",
  },
  {
    kVal: 5,
    value: 8,
    name: "推力滚子轴承",
  },
  {
    kVal: 5,
    value: 9,
    name: "滚针轴承",
  },
  {
    kVal: 5,
    value: 10,
    name: "其它",
  },
];

export const optionsMap = {
  0: selectOptions1th,
  1: selectOptions2nd,
};

export const titleMap = {
  0: "选择常数K",
  1: "选择轴承安装方式系数",
};

export const calcPopupSelKeyMap = {
  0: "K",
  1: "Coef_Install",
};
