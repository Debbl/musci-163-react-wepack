import request from './request';

function getTopBanners() {
  return request({
    url: '/banner',
  });
}

function getHotRecommend(limit) {
  return request({
    url: '/personalized',
    params: {
      limit,
    },
  });
}

function getNewAlbums(limit) {
  return request({
    url: '/top/album',
    params: {
      limit,
    },
  });
}

export { getTopBanners, getHotRecommend, getNewAlbums };
