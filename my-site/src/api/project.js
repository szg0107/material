import request from './request';

// eslint-disable-next-line import/prefer-default-export
export async function getProjects() {
  return request.get('/api/project');
}
