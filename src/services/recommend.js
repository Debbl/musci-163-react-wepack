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

function getTopList(idx) {
  return request({
    url: '/top/list',
    params: {
      idx,
    },
  });
}

export { getTopBanners, getHotRecommend, getNewAlbums, getTopList };
