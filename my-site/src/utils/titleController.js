// 网站标题控制
let routeTitle = ''; // 路由标题
let siteTitle = ''; // 网站标题
// 设置标题
function setTitle() {
  if (routeTitle && !siteTitle) {
    document.title = routeTitle;
  } else if (!routeTitle && siteTitle) {
    document.title = siteTitle;
  } else if (routeTitle && siteTitle) {
    document.title = `${routeTitle}-${siteTitle}`;
  }
}

export default {
  // 设置路由标题
  setRouteTitle(title) {
    routeTitle = title;
    setTitle();
  },
  // 设置网站标题
  setSiteTitle(title) {
    siteTitle = title;
    setTitle();
  },
};
