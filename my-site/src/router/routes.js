export default [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/Home/index.vue'),
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Blog/index.vue'),
  },
  {
    path: '/blog/cate/:categoryId', // 动态路由
    name: 'CategoryBlog',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Blog/index.vue'),
  },
  {
    path: '/blog/:id', // 文章详情
    name: 'BlogDetail',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Blog/Detail.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About/index.vue'),
  },
  {
    path: '/project',
    name: 'Project',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Project/index.vue'),
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Message/index.vue'),
  },
];