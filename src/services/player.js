import request from './request';

function getSongDetail(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids,
    },
  });
}

export { getSongDetail };
