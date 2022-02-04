import React from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import style from './style.module.scss';
import { headerLinks } from '@/common/local-data';

export default function WYAppHeader() {
  return (
    <div className={style['wy-app-header']}>
      <div className={`${style['content']}  wrap-v1`}>
        <div className={style['left']}>
          <NavLink className={`${style['logo']}  sprite-01`} to="/" />
          <div className={style['select-list']}>
            {headerLinks.map((item, index) =>
              index < 3 ? (
                <NavLink key={item.title} to={item.link}>
                  {item.title}
                  <i className={`${style['icon']} sprite-01`}></i>
                </NavLink>
              ) : (
                <a key={item.title} href={item.link}>
                  {item.title}
                </a>
              ),
            )}
          </div>
        </div>
        <div className={style['right']}>
          <Input
            className={style['search']}
            placeholder="音乐/视频/电台/用户"
            prefix={<SearchOutlined />}
          />
          <div className={style['center']}>创作者中心</div>
          <div className={style['login-btn']}>登录</div>
        </div>
      </div>
      <div className={style['divider']}></div>
    </div>
  );
}
