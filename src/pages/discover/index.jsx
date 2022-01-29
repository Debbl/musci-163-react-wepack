import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

import './style.scss';
import { discoverMenu } from '@/common/local-data.js';
import { getTopBannersActions } from './c-pages/recommend/store/actionCreation';

export default function WYDiscover() {
  const dispatch = useDispatch();

  // const { topBanners } = useSelector((state) => ({
  //   topBanners: state.getIn(['recommend', 'topBanners']),
  // }));
  const state = useSelector((state) => state);
  console.log(state, 'l.....');

  useEffect(() => {
    console.log('ok');
    const temp = getTopBannersActions();
    console.log(temp);
    dispatch({
      type: 'recommend/CHANGE_TOP_BANNERS',
      topBanners: '1199933',
    });
  }, [dispatch]);

  useEffect(() => {
    console.log(state, 'llll');
  }, [state]);

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
