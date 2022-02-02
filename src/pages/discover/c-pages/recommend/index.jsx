import React from 'react';

import './style.scss';
import WYHotRecommend from './c-cpns/hot-recommend';
import WYTopBanners from './c-cpns/top-banners';

export default function WYRecommend() {
  return (
    <div className="wy-recommend">
      <WYTopBanners></WYTopBanners>
      <div className="content wrap-v2">
        <div className="left">
          <WYHotRecommend></WYHotRecommend>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}
