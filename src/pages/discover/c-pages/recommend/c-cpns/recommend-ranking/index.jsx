import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import style from './style.module.scss';
import { getTopListAction } from '../../store/actionCreation';
import WYThemeHeaderRCM from '@/components/theme-header-rcm';
import WYTopRanking from '@/components/top-ranking';

export default function WYRecommendRanking() {
  const dispatch = useDispatch();
  const { upRanking, newRanking, originRanking } = useSelector(
    (state) => ({
      upRanking: state.getIn(['recommend', 'upRanking']),
      newRanking: state.getIn(['recommend', 'newRanking']),
      originRanking: state.getIn(['recommend', 'originRanking']),
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getTopListAction(3779629));
    dispatch(getTopListAction(2884035));
    dispatch(getTopListAction(19723756));
  }, [dispatch]);

  return (
    <div className={style['wy-recommend-ranking']}>
      <WYThemeHeaderRCM title="榜单" />
      <div className={style['tops']}>
        <WYTopRanking info={upRanking} />
        <WYTopRanking info={newRanking} />
        <WYTopRanking info={originRanking} />
      </div>
    </div>
  );
}
