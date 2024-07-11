import domtoimage from "dom-to-image";
const { ref } = Vue;
const imgUrl = ref("");
const loading = ref(false);

export const useToImg = async (node = "#to-img-marker") => {
  const shareNode = document.querySelector(node);

  await domtoimage
    .toPng(shareNode)
    .then(function (dataUrl) {
      imgUrl.value = dataUrl;
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    })
    .finally(() => {
      loading.value = false;
    });

  return { imgUrl, loading };
};
