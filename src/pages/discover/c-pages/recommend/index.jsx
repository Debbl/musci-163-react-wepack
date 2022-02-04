import React from 'react';

import style from './style.module.scss';
import WYHotRecommend from './c-cpns/hot-recommend';
import WYTopBanners from './c-cpns/top-banners';
import WYNewAlbum from './c-cpns/new-album';
import WYRecommendRanking from './c-cpns/recommend-ranking';

export default function WYRecommend() {
  return (
    <div className={style['wy-recommend']}>
      <WYTopBanners></WYTopBanners>
      <div className={`${style['content']} wrap-v2`}>
        <div className={style['left']}>
          <WYHotRecommend />
          <WYNewAlbum />
          <WYRecommendRanking />
        </div>
        <div className={style['right']}></div>
      </div>
    </div>
  );
}
