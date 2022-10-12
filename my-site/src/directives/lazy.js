import eventBus from '@/eventBus';
import { debounce } from '@/utils';
import defaultGif from '@/assets/default.gif';

let imgList = [];

function setImage(img) {
  // eslint-disable-next-line no-param-reassign
  img.dom.src = defaultGif; // 先暂时使用着默认图片 不在视口范围内
  // 处理图片
  // 该图片是否在视口范围内
  // eslint-disable-next-line no-restricted-globals,prefer-destructuring
  const clientHeight = document.documentElement.clientHeight;
  const rect = img.dom.getBoundingClientRect();
  const height = rect.height || 150;
  if (rect.top >= -height && rect.top <= clientHeight) {
    // 在视口范围内
    // const tempImg = new Image();
    // tempImg.onload = function() {
    //   // 当真实图片加载完成之后
    //   img.dom.src = img.src;
    // };
    // tempImg.src = img.src;
    // eslint-disable-next-line no-param-reassign
    img.dom.src = img.src;
    imgList = imgList.filter((i) => i !== img);
  }
}

// 希望，调用该函数，就可以设置那些合适的图片
function setImages() {
  // eslint-disable-next-line no-restricted-syntax
  for (const img of imgList) {
    // 处理该图片
    setImage(img);
  }
}

function handleScroll() {
  setImages();
}

eventBus.$on('mainScroll', debounce(handleScroll, 50));

export default {
  inserted(el, bindings) {
    const img = {
      dom: el,
      src: bindings.value,
    };
    imgList.push(img);
    // 立即处理它
    setImage(img);
  },
  unbind(el) {
    imgList = imgList.filter((img) => img.dom !== el);
  },
};
