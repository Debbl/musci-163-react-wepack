import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.scss';

SingerItem.propTypes = {
  itemInfo: PropTypes.object,
};

export default function SingerItem(props) {
  const { itemInfo } = props;
  return (
    <a className={style.container} href={itemInfo.url}>
      <img src={itemInfo.img} alt="" />
      <div className={style.info}>
        <span className={style.name}>{itemInfo.name}</span>
        <span className={style.desc}>{itemInfo.desc}</span>
      </div>
    </a>
  );
}
