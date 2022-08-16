import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import style from './style.module.scss';
import { formatDate } from '@/utils/format-utils';
import {
  changeCurrentSongAction,
  changeCurrentSongIndexAction,
} from '@/stores/player/actionCreators';

export default function WYAppPlayerPanel() {
  const { playMusicsList, currentSongIndex, currentSongLyrics } = useSelector(
    (state) => ({
      playMusicsList: state.getIn(['player', 'playMusicsList']),
      currentSongIndex: state.getIn(['player', 'currentSongIndex']),
      currentSongLyrics: state.getIn(['player', 'currentSongLyrics']),
    }),
  );
  const dispatch = useDispatch();

  const currentSong = playMusicsList[currentSongIndex];

  function playListClick(song, index) {
    dispatch(changeCurrentSongAction(song));
    dispatch(changeCurrentSongIndexAction(index));
  }

  return (
    <div className={style['wy-app-player-panel']}>
      <header className={style['header']}>
        <div className={style['header-left']}>
          <span>播放列表({playMusicsList?.length || 0})</span>
          <span>收藏全部</span>
          <span>清除</span>
        </div>
        <div className={style['header-right']}>{currentSong?.name}</div>
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
          <div className={style['lyc-container']}>
            {currentSongLyrics.map((item) => (
              <div key={item.time + item.content} className={style['lyc-item']}>
                {item.content}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
