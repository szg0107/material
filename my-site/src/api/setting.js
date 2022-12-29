import request from '@/api/request';

// eslint-disable-next-line import/prefer-default-export
export async function getSetting() {
  return request.get('/api/setting');
}
