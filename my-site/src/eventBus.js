const listeners = {}; // 监听对象
// 事件总线
export default {
  /** 1.提供监听某个事件的接口
   *  2.提供取消监听的接口
   *  3.触发事件的接口(可传递数据)
   *  4.触发事件后会自动通知监听者 */
  // 监听某一个事件 eventName 事件名 callback 回调函数
  $on(eventName, callback) {
    if (!listeners[eventName]) {
      listeners[eventName] = new Set(); // 避免回调重复
    }
    listeners[eventName].add(callback);
  },
  // 取消监听
  $off(eventName, callback) {
    if (listeners[eventName]) {
      listeners[eventName].delete(callback);
    }
  },
  // 触发事件
  // eslint-disable-next-line consistent-return
  $emit(eventName, ...args) {
    if (!listeners[eventName]) {
      return false;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const callback of listeners[eventName]) {
      callback(...args);
    }
  },
};
// 另一种事件总线写法
// import Vue from 'vue';
// export default new Vue({});
// Vue.prototype.$bus = new Vue({});
