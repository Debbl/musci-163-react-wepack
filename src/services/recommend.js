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

export { getTopBanners, getHotRecommend };
