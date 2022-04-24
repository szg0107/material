import request from '@/api/request';

// eslint-disable-next-line import/prefer-default-export
export async function getBanners() {
  return request.get('api/banner');
}
