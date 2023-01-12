export default [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Home" */ '@/views/Home/index.vue'), // 路由懒加载- 分包
    meta: { title: '首页' },
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import(/* webpackChunkName: "Blog" */ '@/views/Blog/index.vue'),
    meta: { title: '文章' },
  },
  {
    path: '/blog/cate/:categoryId', // 动态路由
    name: 'CategoryBlog',
    component: () => import(/* webpackChunkName: "CategoryBlog" */ '@/views/Blog/index.vue'),
    meta: { title: '文章' },
  },
  {
    path: '/blog/:id', // 文章详情
    name: 'BlogDetail',
    component: () => import(/* webpackChunkName: "BlogDetail" */ '@/views/Blog/Detail.vue'),
    meta: { title: '文章详情' },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About/index.vue'),
    meta: { title: '关于我' },
  },
  {
    path: '/project',
    name: 'Project',
    component: () => import(/* webpackChunkName: "Project" */ '@/views/Project/index.vue'),
    meta: { title: '项目&效果' },
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import(/* webpackChunkName: "Message" */ '@/views/Message/index.vue'),
    meta: { title: '留言板' },
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound.vue'),
  },
];
