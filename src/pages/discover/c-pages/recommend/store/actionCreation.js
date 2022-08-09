import * as actionTypes from './constants';
import {
  getTopBanners,
  getHotRecommend,
  getNewAlbums,
  getTopList,
} from '@/services/recommend';

const changeTopBannersAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.banners,
});

const getTopBannersAction = () => {
  return (dispatch) => {
    getTopBanners().then((res) => {
      dispatch(changeTopBannersAction(res));
    });
  };
};

const changeHotRecommendAction = (res) => ({
  type: actionTypes.CHANGE_HOT_RECOMMEND,
  hotRecommends: res.result,
});

const getHotRecommendAction = (limit) => {
  return (dispatch) => {
    getHotRecommend(limit).then((res) => {
      dispatch(changeHotRecommendAction(res));
    });
  };
};

const changeNewAlbumAction = (res) => ({
  type: actionTypes.CHANGE_NEW_ALBUM,
  newAlbums: res.albums,
});

const getNewAlbumAction = (limit) => {
  return (dispatch) => {
    getNewAlbums(limit).then((res) => {
      console.log(res);
      dispatch(changeNewAlbumAction(res));
    });
  };
};

const changeUpRankingAction = (res) => ({
  type: actionTypes.CHANGE_UP_RANKING,
  upRanking: res.playlist,
});
const changeNewRankingAction = (res) => ({
  type: actionTypes.CHANGE_NEW_RANKING,
  newRanking: res.playlist,
});
const changeOriginRankingAction = (res) => ({
  type: actionTypes.CHANGE_ORIGIN_RANKING,
  originRanking: res.playlist,
});

const getTopListAction = (idx) => {
  return (dispatch) => {
    getTopList(idx).then((res) => {
      switch (idx) {
        case 3779629:
          dispatch(changeNewRankingAction(res));
          break;
        case 2884035:
          dispatch(changeOriginRankingAction(res));
          break;
        case 19723756:
          dispatch(changeUpRankingAction(res));
          break;
        default:
      }
    });
  };
};

export {
  getTopBannersAction,
  getHotRecommendAction,
  getNewAlbumAction,
  getTopListAction,
};
