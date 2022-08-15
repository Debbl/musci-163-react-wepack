import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';
import { getCount, getSizeImage } from '@/utils/format-utils';

WYSongsCover.propTypes = {
  info: PropTypes.object.isRequired,
};

export default function WYSongsCover({ info }) {
  return (
    <div className={style['wy-songs-cover']}>
      <div className={style['cover-wrapper']} title={info.name}>
        <img src={getSizeImage(info.picUrl, 140)} alt={info.copywriter} />
        <div className={style['cover']}>
          <div className={`${style['info']} sprite-cover`}>
            <span>
              <i className={`${style['erji']} sprite-icon`}></i>
              <span>{getCount(info.playCount)}</span>
            </span>
            <i className={`${style['play']} sprite-icon`}></i>
          </div>
        </div>
      </div>
      <div className={`${style['cover-bottom']} text-nowrap`}>{info.name}</div>
      {info.copywriter && (
        <div className={`${style['cover-source']} text-nowrap`}>
          by {info.copywriter}
        </div>
      )}
    </div>
  );
}
