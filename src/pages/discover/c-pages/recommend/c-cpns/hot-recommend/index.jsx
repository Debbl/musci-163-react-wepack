import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { HOT_RECOMMEND_LIMIT } from '@/common/constants';
import { getHotRecommendAction } from '../../store/actionCreation';
import WYThemeHeaderRCM from '@/components/theme-header-rcm';

export default function WYHotRecommend() {
  const dispatch = useDispatch();
  const { hotRecommends } = useSelector(
    (state) => ({
      hotRecommends: state.getIn(['recommend', 'hotRecommends']),
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT));
  }, [dispatch]);

  return (
    <div className="wy-hot-recommend">
      <WYThemeHeaderRCM
        title="热门推荐"
        keywords={['华语', '流行', '民谣', '摇滚', '电子']}
      />
      <div className="recommend-list">{hotRecommends.length}</div>
    </div>
  );
}
