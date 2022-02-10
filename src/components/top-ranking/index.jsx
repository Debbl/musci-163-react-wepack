import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import style from './style.module.scss';
import { getAddItemToPlayMusicsListAction } from '../../pages/player/store/actionCreators';

WYTopRanking.propTypes = {
  info: PropTypes.object,
};

export default function WYTopRanking({ info }) {
  const dispatch = useDispatch();

  const { tracks = [] } = info;
  const addItemToPlayList = (ids) => {
    dispatch(getAddItemToPlayMusicsListAction(ids));
  };
  return (
    <div className={style['wy-top-ranking']}>
      <div className={style['header']}>
        <div className={style['image']}>
          <img src={info.coverImgUrl} alt="" />
        </div>
        <div className={style['info']}>
          <a href="">{info.name}</a>
          <div>
            <button
              className={`${style['btn']} ${style['play']} sprite-02`}
            ></button>
            <button
              className={`${style['btn']} ${style['favor']} sprite-02`}
            ></button>
          </div>
        </div>
      </div>
      <div className={style['list']}>
        {tracks.slice(0, 10).map((item, index) => (
          <div key={item.id} className={style['list-item']}>
            <div className={style['rank']}>{index + 1}</div>
            <div className={style['info']}>
              <span className={`${style['name']} text-nowrap`}>
                {item.name}
              </span>
              <div className={style['operate']}>
                <button
                  className={`${style['btn']} ${style['play']} sprite-02`}
                ></button>
                <button
                  className={`${style['btn']} ${style['addto']} sprite-icon2`}
                  onClick={() => addItemToPlayList(item.id)}
                ></button>
                <button
                  className={`${style['btn']} ${style['favor']} sprite-02`}
                ></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={style['footer']}>
        <a href="">查看全部 &gt;</a>
      </div>
    </div>
  );
}
