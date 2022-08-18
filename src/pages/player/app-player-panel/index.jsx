import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import style from './style.module.scss';
import { formatDate } from '@/utils/format-utils';
import {
  changeCurrentSongAction,
  changeCurrentSongIndexAction,
  changeIsShowPanel,
} from '@/stores/player/actionCreators';

export default function WYAppPlayerPanel() {
  const {
    playMusicsList,
    currentSongIndex,
    currentSong,
    currentLyricIndex,
    currentSongLyrics,
  } = useSelector((state) => ({
    playMusicsList: state.getIn(['player', 'playMusicsList']),
    currentSong: state.getIn(['player', 'currentSong']),
    currentSongIndex: state.getIn(['player', 'currentSongIndex']),
    currentLyricIndex: state.getIn(['player', 'currentLyricIndex']),
    currentSongLyrics: state.getIn(['player', 'currentSongLyrics']),
  }));
  const dispatch = useDispatch();

  function playListClick(song, index) {
    dispatch(changeCurrentSongAction(song));
    dispatch(changeCurrentSongIndexAction(index));
  }

  // 歌词滚动
  const lyrContainerRef = useRef();
  function lyrScrollTo(element, to, duration) {
    if (duration <= 0 || to <= 0) return;
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;
    setTimeout(() => {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) return;
      lyrScrollTo(element, to, duration - 10);
    }, 10);
  }
  useEffect(() => {
    lyrScrollTo(lyrContainerRef.current, (currentLyricIndex - 3) * 32, 1000);
  }, [currentLyricIndex]);

  // 关闭歌词面板
  const closeShowPanel = () => {
    dispatch(changeIsShowPanel(false));
  };
  return (
    <div className={style['wy-app-player-panel']}>
      <header className={style['header']}>
        <div className={style['header-left']}>
          <span>播放列表({playMusicsList?.length || 0})</span>
          <span>收藏全部</span>
          <span>清除</span>
        </div>
        <div className={style['header-right']}>
          <span>{currentSong?.name}</span>
          <span className={style['close-icon']} onClick={closeShowPanel}>
            <i className={style['icon']}></i>
          </span>
        </div>
      </header>
      <main className={style['main']}>
        <div className={style['main-left']}>
          {playMusicsList.map((song, index) => (
            <div
              key={song.id}
              className={`${style['play-list']}${
                index === currentSongIndex ? ' active-song' : ''
              }`}
              onClick={() => playListClick(song, index)}
            >
              <span className={style['play-icon']}>
                <i></i>
              </span>
              <span className={`${style['song-name']} text-nowrap`}>
                {song.name}
              </span>
              <span className={`${style['singer-name']} text-nowrap`}>
                {song.ar[0].name}
              </span>
              <span className={style['song-time']}>
                {formatDate(song.dt, 'mm:ss')}
              </span>
              <span className={style['song-link-icon']}>
                <a href="/"></a>
              </span>
            </div>
          ))}
        </div>
        <div className={style['main-line']}></div>
        <div className={style['main-right']}>
          <div className={style['lyr-container']} ref={lyrContainerRef}>
            {currentSongLyrics.map((item, index) => (
              <div
                key={index + item.time + item.content}
                className={`${style['lyr-item']} ${
                  index === currentLyricIndex && style['lyr-active']
                }`}
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
