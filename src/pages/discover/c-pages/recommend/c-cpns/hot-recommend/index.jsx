import React from 'react';
import WYThemeHeaderRCM from '@/components/theme-header-rcm';

export default function WYHotRecommend() {
  return (
    <div className="wy-hot-recommend">
      <WYThemeHeaderRCM
        title="热门推荐"
        keywords={['华语', '流行', '民谣', '摇滚', '电子']}
      />
      <h2>HotRecommend</h2>
    </div>
  );
}
