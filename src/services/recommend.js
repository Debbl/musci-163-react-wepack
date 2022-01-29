import request from './request';

function getTopBanners() {
  return request({
    url: '/banner',
  });
}

export { getTopBanners };
