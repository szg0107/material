// 防抖函数 fn 方法 duration 等待时间
export default function (fn, duration = 100) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, duration);
  };
}
