import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { shallowEqual, useSelector } from 'react-redux';

import { Carousel } from 'antd';
import { getTopBannersAction } from '@/pages/discover/c-pages/recommend/store/actionCreation';

import './style.scss';

export default function WYTopBanners() {
  const dispatch = useDispatch();
  const { topBanners } = useSelector(
    (state) => ({
      topBanners: state.getIn(['recommend', 'topBanners']),
    }),
    shallowEqual,
  );

  const [bgImageUrl, setBgImageUrl] = useState();
  const carouselRef = useRef();
  useEffect(() => {
    dispatch(getTopBannersAction());
  }, [dispatch]);
  useEffect(() => {
    setBgImageUrl(
      topBanners[0] && topBanners[0].imageUrl + '?imageView&blur=40x20',
    );
  }, []);

  const getCurrentImg = (from, to) => {
    setBgImageUrl(topBanners[to].imageUrl + '?imageView&blur=40x20');
  };

  return (
    <div
      className="wy-top-banners"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      <div className="banner wrap-v2">
        <div className="left">
          <Carousel
            autoplay
            dots={{ className: 'wy-dots' }}
            ref={carouselRef}
            effect="fade"
            beforeChange={getCurrentImg}
          >
            {topBanners.map((item) => (
              <div className="banner-item" key={item.imageUrl}>
                <img className="image" src={item.imageUrl}></img>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="right">
          <a
            href="https://music.163.com/#/download"
            target="_blank"
            rel="noreferrer"
          ></a>
        </div>
        <div className="control">
          <button
            className="btn left"
            onClick={() => carouselRef.current.prev()}
          ></button>
          <button
            className="btn right"
            onClick={() => carouselRef.current.next()}
          ></button>
        </div>
      </div>
    </div>
  );
}
