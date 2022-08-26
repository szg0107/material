import request from '@/api/request';

// 获取博客列表数据
export async function getBlogs(page = 1, limit = 10, categoryid = -1, total = 2000) {
  // eslint-disable-next-line no-return-await
  return await request.get('/api/blog', {
    params: {
      page,
      limit,
      categoryid,
      total,
    },
  });
}

// 获取博客分类
export async function getBlogCategories() {
  // eslint-disable-next-line no-return-await
  return await request.get('/api/blogtype');
}

// 获取单个博客
export async function getBlog(id) {
  return request.get(`/api/blog/${id}`);
}

// 提交评论
export async function postComment(commentInfo) {
  return request.post('/api/comment', commentInfo);
}

// 分页获取评论
export async function getComments(blogId, page = 1, limit = 10) {
  return request.get('/api/comment', {
    params: {
      blogId,
      page,
      limit,
    },
  });
}
