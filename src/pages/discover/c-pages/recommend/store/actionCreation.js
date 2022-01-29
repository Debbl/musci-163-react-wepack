import { getTopBanners } from '@/services/recommend';
import * as actionTypes from './constants';

const changeTopBannersAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.data.banners,
});

const getTopBannersActions = () => {
  return (dispatch) => {
    getTopBanners().then((res) => {
      console.log(res.data.banners);
      dispatch(changeTopBannersAction(res));
    });
  };
};

export { getTopBannersActions };
