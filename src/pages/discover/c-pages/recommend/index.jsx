import React from 'react';
import { useDispatch } from 'react-redux';
import { changeIsShowPanel } from '@/stores/player/actionCreators';
import style from './style.module.scss';
import WYHotRecommend from './c-cpns/hot-recommend';
import WYTopBanners from './c-cpns/top-banners';
import WYNewAlbum from './c-cpns/new-album';
import WYRecommendRanking from './c-cpns/recommend-ranking';
import UserProfile from './c-cpns/user-profile';
import SingerInfo from './c-cpns/singer-info';

export default function WYRecommend() {
  const dispatch = useDispatch();

  // 关闭歌词面板
  const closeShowPanel = () => {
    dispatch(changeIsShowPanel(false));
  };
  return (
    <div className={style['wy-recommend']} onClick={closeShowPanel}>
      <WYTopBanners />
      <div className={`${style.content} wrap-v2`}>
        <div className={style.left}>
          <WYHotRecommend />
          <WYNewAlbum />
          <WYRecommendRanking />
        </div>
        <div className={style.right}>
          <UserProfile />
          <SingerInfo />
        </div>
      </div>
    </div>
  );
}
