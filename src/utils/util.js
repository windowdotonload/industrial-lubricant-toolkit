import { useToImg } from "../utils/domToImg";

const { createApp, getCurrentInstance, reactive } = Vue;

export const extend = Object.assign;

export function usePopupState() {
  const state = reactive({
    show: false,
    imgUrl: "",
    loading: false,
  });

  const toggle = (show) => {
    state.show = show;
  };

  const open = async () => {
    toggle(true);
    const { imgUrl, loading } = await useToImg();
    state.imgUrl = imgUrl;
    state.loading = loading;
  };

  const close = () => {
    state.imgUrl = "";
    state.loading = false;

    toggle(false);
  };

  useExpose({ open, close, toggle });

  return {
    state,
    open,
    close,
    toggle,
  };
}

export function useExpose(apis) {
  const instance = getCurrentInstance();
  if (instance) {
    extend(instance.proxy, apis);
  }
}

export function mountComponent(RootComponent) {
  const app = createApp(RootComponent);
  const root = document.createElement("div");
  app.use(vant);

  document.body.appendChild(root);
  return {
    instance: app.mount(root),
    unmount() {
      app.unmount();
      document.body.removeChild(root);
    },
  };
}

export const LOG = function () {
  console.log(...arguments);
};
