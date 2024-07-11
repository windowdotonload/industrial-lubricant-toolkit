import { mountComponent, useExpose } from "../../utils/util";
import PopupCss from "./popup.module.css";
const { reactive, ref } = Vue;
const { Popup } = vant;

function useVantPopupState() {
  const state = reactive({
    show: false,
    options: [],
    checked: "",
    title: "",
    cb: null,
    closeCb: null,
    height: "",
  });

  const toggle = (show) => {
    state.show = show;
  };

  const open = async (options, checkedVal, title, cb, closeCb, height) => {
    if (document.querySelector(".toolkit-box")) document.querySelector(".toolkit-box").style.overflowY = "hidden";
    state.options = options;
    state.checked = checkedVal;
    state.title = title;
    state.height = height;
    state.cb = cb;
    state.closeCb = closeCb;
    toggle(true);
  };

  const close = () => {
    toggle(false);
    if (state.closeCb) state.closeCb();
    state.options = [];
    state.checked = "";
    state.cb = null;
    if (document.querySelector(".toolkit-box")) document.querySelector(".toolkit-box").style.overflowY = "auto";
    const outerelm = document.querySelector(".toolkit-box-outer");
    if (outerelm) document.body.removeChild(outerelm);
    if (document.querySelector("#selPppup")) document.body.removeChild(document.querySelector("#selPppup"));
  };

  useExpose({ open, close, toggle });

  return {
    state,
    open,
    close,
    toggle,
  };
}

let instance;

function initInstance() {
  const Wrapper = {
    setup() {
      const { state, toggle, close } = useVantPopupState();

      return () => (
        <Popup v-model:show={state.show} close-on-click-overlay={false} onClosed={close} round position="bottom" style={{ height: state.height || "60%", position: navigator.userAgent.includes("Mobile") ? "fixed" : "absolute" }} teleport="#selPppup">
          <div class={PopupCss.container}>
            <div class={PopupCss.header}>
              <span class={PopupCss["popup-title"]}>{state.title}</span>
              <van-icon name="cross" onClick={close} style={{ cursor: "pointer" }} color="#999" />
            </div>
            <div class={PopupCss["sel-list-container"]}>
              <van-radio-group v-model={state.checked} direction="horizontal">
                <van-cell-group inset style={{ width: "100%", margin: 0 }}>
                  {state.options.map((item) => {
                    return (
                      <van-cell title={item.name} key={item.value} clickable style={{ height: "50px", display: "flex", alignItems: "center", cursor: "default" }}>
                        {{
                          "right-icon": () => <van-radio name={item.value} checked-color="#001450" onClick={() => state.cb(item)} />,
                        }}
                      </van-cell>
                    );
                  })}
                </van-cell-group>
              </van-radio-group>
            </div>
            <div class={PopupCss["bottom-btn"]} onClick={close}>
              确定
            </div>
          </div>
        </Popup>
      );
    },
  };

  ({ instance } = mountComponent(Wrapper));
}

export function showPopup(options = [], checkedVal = "", title = "title", cb = null, closeCb) {
  if (!instance) {
    initInstance();
  }

  instance.open(options, checkedVal, title, cb, closeCb);
}

export function showPopupCreateDom(options = [], checkedVal = "", title = "title", cb = null, closeCb, height = "82%") {
  var element = document.querySelector(".toolkit-box-outer");

  if (!element) {
    const ENV = navigator.userAgent.includes("Mobile") ? "wechat" : "web";
    const ELM = document.createElement("div");
    ELM.setAttribute("id", "selPppup");
    ELM.setAttribute("class", ENV == "wechat" ? "toolkit-box-outer-wechat" : "toolkit-box-outer");
    document.body.appendChild(ELM);
  }

  initInstance();

  instance.open(options, checkedVal, title, cb, closeCb, height);
}
