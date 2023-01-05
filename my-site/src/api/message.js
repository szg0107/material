import request from './request';

export async function getMessages(page = 1, limit = 10) {
  return request.get('/api/message', {
    params: {
      page,
      limit,
    },
  });
}

export async function postMessage(msgInfo) {
  return request.post('/api/message', msgInfo);
}
