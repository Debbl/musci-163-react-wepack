import React from 'react';
import PropsTypes from 'prop-types';

import style from './style.module.scss';

WYAlbumCover.propTypes = {
  info: PropsTypes.object,
  size: PropsTypes.number,
  width: PropsTypes.number,
  bgp: PropsTypes.string,
};

export default function WYAlbumCover({ info, size, width, bgp }) {
  return (
    <div className={style['wy-album-cover']} style={{ width: width + 'px' }}>
      <div
        className={style['album-image']}
        style={{ width: width + 'px', height: size + 'px' }}
      >
        <img
          style={{ width: size + 'px', height: size + 'px' }}
          src={info.picUrl}
          alt=""
        />
        <a
          style={{ backgroundPosition: `0 ${bgp}` }}
          className={`${style['cover']} image-cover`}
          href="/todo"
        >
          {info.name}
        </a>
      </div>
      <div className={style['album-info']}>
        <div className={`${style['name']} text-nowrap`}>{info.name}</div>
        <div className={`${style['artist']} text-nowrap`}>
          {info.artist.name}
        </div>
      </div>
    </div>
  );
}
