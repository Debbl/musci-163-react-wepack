import React from 'react';
import { singerInfoData } from '@/common/singer-info-data';
import style from './style.module.scss';
import SingerItem from '@/components/singer-item';

export default function SingerInfo() {
  return (
    <div className={style['singer-info']}>
      <div className={style.content}>
        <div className={style.title}>
          <span>入驻歌手</span>
          <a href="/discover/artist/signed/">查看全部&gt;</a>
        </div>
        <div className={style.info}>
          {singerInfoData.map((item) => (
            <SingerItem itemInfo={item} key={item.id} />
          ))}
        </div>
        <div className={style.apply}>
          <a className="sprite-button" href="https://music.163.com/st/musician">
            <i className={`${style.icon} sprite-button`}>申请成为音乐人</i>
          </a>
        </div>
      </div>
    </div>
  );
}
