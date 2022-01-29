import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import './style.scss';
import request from '@/services/request.js';
import { discoverMenu } from '@/common/local-data.js';

export default function WYDiscover() {
  useEffect(() => {
    request({ url: 'banner' }).then((res) => {
      console.log(res);
    });
  });
  return (
    <div className="wy-discover">
      <div className="top">
        <div className="menu wrap-v1">
          {discoverMenu.map((item) => (
            <div className="item" key={item.title}>
              <NavLink to={item.link}>{item.title}</NavLink>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
