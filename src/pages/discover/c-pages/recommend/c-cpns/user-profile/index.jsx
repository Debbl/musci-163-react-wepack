import React from 'react';
import style from './style.module.scss';

export default function UserProfile() {
  return (
    <div className={style['user-profile']}>
      <div className={`${style.content} sprite-02`}>
        <p className={`${style.desc}`}>
          登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
        </p>
        <button className={`${style.btn} sprite-02`}>用户登录</button>
      </div>
    </div>
  );
}
