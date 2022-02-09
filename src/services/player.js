import request from './request';

function getSongDetail(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids,
    },
  });
}
function getSongLyrics(id) {
  return request({
    url: '/lyric',
    params: {
      id,
    },
  });
}

export { getSongDetail, getSongLyrics };
