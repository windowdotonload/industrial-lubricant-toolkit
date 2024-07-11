import * as  VueRouter from "vue-router";
window.VueRouter = VueRouter;
const toolkiMmodules = import.meta.glob("@/views/toolkit/views/*.vue");
const toolkitChildren = Object.keys(toolkiMmodules).map((item) => {
  const splitArr = item.split("/");
  const path = splitArr[splitArr.length - 1].replace(".vue", "");
  const name = splitArr[splitArr.length - 1].replace(".vue", "");
  const component = toolkiMmodules[item];
  return {
    path,
    name,
    component,
  };
});
toolkitChildren.push({
  name: "ViscousCurveChart",
  path: "ViscousCurveChart",
  component: () => import("../views/toolkit/components/viscousCurve/ChartsPage.vue"),
});
toolkitChildren.push({
  name: "TCOSpecific",
  path: "TCOSpecific",
  component: () => import("../views/toolkit/views/TCO.vue"),
});

export const routes = [
  {
    path: "/toolkit",
    component: () => import("../layout/index.vue"),
    children: toolkitChildren,
  }
];

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});
