import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.scss';
import { headerLinks } from '@/common/local-data';

export default function WYAppHeader() {
  return (
    <div className="wy-app-header">
      <div className="content wrap-v1">
        <div className="left">
          <NavLink className="logo sprite-01" to="/" />
          <div className="select-list">
            {headerLinks.map((item, index) =>
              index < 3 ? (
                <NavLink key={item.title} to={item.link}>
                  {item.title}
                  <i className="sprite-01 icon"></i>
                </NavLink>
              ) : (
                <a key={item.title} href={item.link}>
                  {item.title}
                </a>
              ),
            )}
          </div>
        </div>
        <div className="right">right</div>
      </div>
      <div className="divider"></div>
    </div>
  );
}
