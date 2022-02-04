import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import style from './style.module.scss';
import { discoverMenu } from '@/common/local-data.js';

export default function WYDiscover() {
  return (
    <div className={style['wy-discover']}>
      <div className={style['top']}>
        <div className={`${style['menu']}  wrap-v1`}>
          {discoverMenu.map((item) => (
            <div className={style['item']} key={item.title}>
              <NavLink to={item.link}>{item.title}</NavLink>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
