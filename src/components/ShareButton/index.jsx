import buttonCss from "./share.module.css";
import { showShare } from "../ShareDialog/index";
const { ref } = Vue;
const { Toast, Dialog } = vant;
const ENV = ref(navigator.userAgent.includes("Mobile") ? "wechat" : "web");

export default {
  props: {
    showDelay: {
      type: Number,
      default: 0,
    },
    doubleOpen: {
      type: Number,
      default: 0,
    },
    isConfirm: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
  },
  emits: ["click"],
  setup(props, ctx) {
    const btnStyle = { background: props.background ? props.background : "", color: props.color ? props.color : "" };
    const exec = () => {
      ctx.emit("click");
      if (props.showDelay) {
        Toast.loading({
          message: "生成中...",
          forbidClick: true,
        });
      }
      setTimeout(() => {
        showShare(props.doubleOpen);
        Toast.clear();
      }, props.showDelay);
    };

    const shwoShareWithDelay = () => {
      if (!props.isConfirm) return exec();
      Dialog.confirm({
        message: "保存结果后，会清空当前页数据，是否确认保存数据？",
      })
        .then(() => {
          exec();
        })
        .catch(() => {
          // on cancel
        });
    };

    return () => {
      return (
        <>
          {ENV.value == "web" ? (
            <i />
          ) : (
            <div class={buttonCss["share-btn-bar"]}>
              <span class={buttonCss["share-btn"]} onClick={shwoShareWithDelay} style={btnStyle}>
                保存结果
              </span>
            </div>
          )}
        </>
      );
    };
  },
};
