import { mountComponent } from "../../utils/util";
import ShareComponent from "./share/index.vue";
import { usePopupState } from "../../utils/util";

let instance;

function initInstance() {
  const Wrapper = {
    setup() {
      const { state, toggle, close } = usePopupState();
      return () => <ShareComponent {...state} onClose={close} />;
    },
  };

  ({ instance } = mountComponent(Wrapper));
}

export function showShare(doubleOpen) {
  if (!instance) {
    initInstance();
  }

  if (!doubleOpen || doubleOpen == 0) {
    instance.open();
  } else if (doubleOpen == 1) {
    // eCharts render consquence is canvas.
    // first open can't get corresponding DOM in Mobile Wechat
    instance.open();
    instance.close();
    setTimeout(() => {
      instance.open();
    }, 300);
  }
}
