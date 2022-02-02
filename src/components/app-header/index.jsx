import React from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

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
        <div className="right">
          <Input
            className="search"
            placeholder="音乐/视频/电台/用户"
            prefix={<SearchOutlined />}
          />
          <div className="center">创作者中心</div>
          <div className="login-btn">登录</div>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
}
