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
    url: '/album/new',
    params: {
      limit,
    },
  });
}

function getTopList(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id,
    },
  });
}

export { getTopBanners, getHotRecommend, getNewAlbums, getTopList };
