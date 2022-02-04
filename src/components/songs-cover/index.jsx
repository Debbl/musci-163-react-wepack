import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

WYSongsCover.propTypes = {
  info: PropTypes.object.isRequired,
};

export default function WYSongsCover({ info }) {
  return (
    <div className="wy-songs-cover">
      <div className="cover-wrapper" title={info.name}>
        <img src={info.picUrl} alt={info.copywriter} />
        <div className="cover">
          <div className="info sprite-cover">
            <span>
              <i className="erji sprite-icon"></i>
              <span>{info.playCount}</span>
            </span>
            <i className="play sprite-icon"></i>
          </div>
        </div>
      </div>
      <div className="cover-bottom text-nowrap">{info.name}</div>
      <div className="cover-source text-nowrap">
        by {info.copywriter || info.creator.nickname}
      </div>
    </div>
  );
}
