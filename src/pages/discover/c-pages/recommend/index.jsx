import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { shallowEqual, useSelector } from 'react-redux';

import { getTopBannersActions } from '@/pages/discover/c-pages/recommend/store/actionCreation.js';

export default function WYRecommend() {
  const dispatch = useDispatch();
  const { topBanners } = useSelector(
    (state) => ({
      topBanners: state.getIn(['recommend', 'topBanners']),
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getTopBannersActions());
    console.log(topBanners);
  }, [dispatch]);

  return (
    <div>
      <h2>Recommend {topBanners.length}</h2>
    </div>
  );
}
