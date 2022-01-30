import { getTopBanners } from '@/services/recommend';
import * as actionTypes from './constants';

const changeTopBannersAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.banners,
});

const getTopBannersActions = () => {
  return (dispatch) => {
    getTopBanners().then((res) => {
      dispatch(changeTopBannersAction(res));
    });
  };
};

export { getTopBannersActions };
