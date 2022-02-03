import React from 'react';

import './style.scss';
import WYHotRecommend from './c-cpns/hot-recommend';
import WYTopBanners from './c-cpns/top-banners';
import WYNewAlbum from './c-cpns/new-album';
import WYRecommendRanking from './c-cpns/recommend-ranking';

export default function WYRecommend() {
  return (
    <div className="wy-recommend">
      <WYTopBanners></WYTopBanners>
      <div className="content wrap-v2">
        <div className="left">
          <WYHotRecommend />
          <WYNewAlbum />
          <WYRecommendRanking />
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}
