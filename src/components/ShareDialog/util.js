const { Toast } = vant;
export const indirectPathList = ["ViscousCurve"];
export const tipMap = {
  ViscousCurve: "图片将在生成曲线图后保存",
};
export const judgeIndirectSave = (cb) => {
  const curPath = window.location.hash.split("/")[window.location.hash.split("/").length - 1];

  return indirectPathList.some((path) => {
    if (curPath == path) {
      Toast(tipMap[curPath]);
      cb();
      return true;
    }
  });
};
