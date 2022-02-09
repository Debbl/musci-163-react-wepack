import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Slider, message } from 'antd';

import style from './style.module.scss';
import {
  getChangeCurrentSongIndexAction,
  getChangeCurrentSongLyricsAction,
} from '../store/actionCreators';
import { getPlayerSongUrl, formatDate } from '@/utils/format-utils';

export default function WYAppPlayerBar() {
  const dispatch = useDispatch();
  const { currentSongIndex, currentSongLyrics, playMusicsList } = useSelector(
    (state) => ({
      currentSongIndex: state.getIn(['player', 'currentSongIndex']),
      currentSongLyrics: state.getIn(['player', 'currentSongLyrics']),
      playMusicsList: state.getIn(['player', 'playMusicsList']),
    }),
  );

  const currentSong = playMusicsList[currentSongIndex];

  const audioRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [isHandleChangeFlag, setIsHandleChangeFlag] = useState(false);
  const [isPlayingFlag, setIsPlayingFlag] = useState(false);
  useEffect(() => {
    if (currentSong?.id) {
      audioRef.current.src = getPlayerSongUrl(currentSong?.id);
      dispatch(getChangeCurrentSongLyricsAction(currentSong?.id));
    }
    isPlayingFlag && audioRef.current.play();
  }, [currentSong]);

  const singerName = (currentSong?.ar && currentSong.ar[0].name) || '未知歌手';
  const durationTime = currentSong?.dt || 0;
  const fmtDuration = formatDate(durationTime, 'mm:ss');
  const fmtCurrentTime = formatDate(currentTime, 'mm:ss');
  const playMusic = useCallback(() => {
    !isPlayingFlag
      ? audioRef.current.play().catch(() => setIsPlayingFlag(false))
      : audioRef.current.pause();
    setIsPlayingFlag(!isPlayingFlag);
  }, [isPlayingFlag]);
  const handleTimeUpdate = (e) => {
    const audioCurrentTime = e.target.currentTime * 1000; // 毫秒
    // console.log(audioCurrentTime);
    !isHandleChangeFlag && setCurrentTime(audioCurrentTime);
    // fmtDuration === fmtCurrentTime && setIsPlayingFlag(false);
    // console.log(fmtCurrentTime);

    // 歌词显示
    // console.log(currentSongLyrics);
    const currentLyricIndex =
      currentSongLyrics.findIndex((item) => audioCurrentTime < item.time) - 1;
    // console.log(currentLyricIndex);
    currentSongLyrics[currentLyricIndex]?.content &&
      message.open({
        key: 'lyric',
        className: 'lyric-message',
        duration: 0,
        content: currentSongLyrics[currentLyricIndex]?.content,
      });
  };
  const handleMusicEnded = () => {
    setIsPlayingFlag(false);
  };
  const handleSliderChange = useCallback((value) => {
    setIsHandleChangeFlag(true);
    // console.log('slider', value);
    setCurrentTime(value);
  }, []);
  const handleSliderAfterChange = useCallback(
    (value) => {
      setIsHandleChangeFlag(false);
      // console.log(value / 1000);
      audioRef.current.currentTime = value / 1000;
      setCurrentTime(value);
      // console.log('after', value);
      !isPlayingFlag && playMusic();
    },
    [isPlayingFlag, playMusic],
  );
  // 改变当前播放歌曲索引
  const changeCurrentSongIndex = (step) => {
    let index = currentSongIndex + step;
    // console.log(index);
    // console.log(playMusicsList.length, 'length');
    if (index < 0) index = 0;
    if (index > playMusicsList.length - 1) index = playMusicsList.length - 1;
    // console.log(index);
    index !== currentSongIndex &&
      dispatch(getChangeCurrentSongIndexAction(index));
  };

  // console.log('页面刷新。。。');
  return (
    <div className={`${style['wy-app-player-bar']} sprite-player`}>
      <div className={`${style['content']} wrap-v2`}>
        <div className={style['control']}>
          <button
            className={`${style['prev']} sprite-player`}
            onClick={() => changeCurrentSongIndex(-1)}
          ></button>
          <button
            className={`${style['play']} sprite-player`}
            style={{
              backgroundPosition: `0 ${isPlayingFlag ? '-165px' : '-204px'}`,
            }}
            onClick={playMusic}
          ></button>
          <button
            className={`${style['next']} sprite-player`}
            onClick={() => changeCurrentSongIndex(1)}
          ></button>
        </div>
        <div className={style['play-info']}>
          <div className={style['image']}>
            <a href="">
              <img src={currentSong?.al?.picUrl} alt="" />
            </a>
          </div>
          <div className={style['info']}>
            <div className={style['song']}>
              <span className={style['song-name']}>{currentSong?.name}</span>
              <a href="" className={style['singer-name']}>
                {singerName}
              </a>
            </div>
            <div className={style['progress']}>
              <Slider
                min={0}
                max={durationTime}
                defaultValue={0}
                value={currentTime}
                tipFormatter={() => fmtCurrentTime}
                onChange={handleSliderChange}
                onAfterChange={handleSliderAfterChange}
              />
              <div className={style['time']}>
                <span>{fmtCurrentTime}</span>
                <span>{'/'}</span>
                <span>{fmtDuration}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={style['operator']}>
          <div className={style['left']}>
            <button
              className={`${style['btn']} ${style['favor']} sprite-player`}
            ></button>
            <button
              className={`${style['btn']} ${style['share']} sprite-player`}
            ></button>
          </div>
          <div className={style['right']}>
            <button
              className={`${style['btn']} ${style['volume']} sprite-player`}
            ></button>
            <button
              className={`${style['btn']} ${style['loop']} sprite-player`}
            ></button>
            <button
              className={`${style['btn']} ${style['playlist']} sprite-player`}
            ></button>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => handleTimeUpdate(e)}
        onEnded={handleMusicEnded}
      />
    </div>
  );
}
