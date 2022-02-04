import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import style from './style.module.scss';
import { HOT_RECOMMEND_LIMIT } from '@/common/constants';
import { getHotRecommendAction } from '../../store/actionCreation';
import WYThemeHeaderRCM from '@/components/theme-header-rcm';
import WYSongsCover from '@/components/songs-cover';

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
    <div className={style['wy-hot-recommend']}>
      <WYThemeHeaderRCM
        title="热门推荐"
        keywords={['华语', '流行', '民谣', '摇滚', '电子']}
      />
      <div className={style['recommend-list']}>
        {hotRecommends.map((item) => (
          <WYSongsCover key={item.id} info={item} />
        ))}
      </div>
    </div>
  );
}
