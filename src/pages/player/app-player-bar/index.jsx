import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Slider, message } from 'antd';

import style from './style.module.scss';
import {
  changeCurrentLyricIndex,
  getChangeCurrentSongIndexAndSongAction,
  getChangeCurrentSongLyricsAction,
  getChangePlaySequenceAction,
} from '@/stores/player/actionCreators';
import { getPlayerSongUrl, formatDate } from '@/utils/format-utils';
import WYAppPlayerPanel from '../app-player-panel';
import { SEQUENCE_LOOP } from '@/stores/player/constants';

export default function WYAppPlayerBar() {
  const dispatch = useDispatch();
  const {
    currentSong,
    currentLyricIndex,
    currentSongLyrics,
    playMusicsList,
    playSequence,
  } = useSelector((state) => ({
    currentLyricIndex: state.getIn(['player', 'currentLyricIndex']),
    currentSongLyrics: state.getIn(['player', 'currentSongLyrics']),
    playMusicsList: state.getIn(['player', 'playMusicsList']),
    playSequence: state.getIn(['player', 'playSequence']),
    currentSong: state.getIn(['player', 'currentSong']),
  }));

  const audioRef = useRef();
  const sliderRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [isHandleChangeFlag, setIsHandleChangeFlag] = useState(false);
  const [isPlayingFlag, setIsPlayingFlag] = useState(false);
  const [isShowPanel, setIsShowPanel] = useState(false); // 歌曲列表面板显示
  const [isPlayEnd, setIsPlayEnd] = useState(false);
  useEffect(() => {
    setIsPlayEnd(false);
    if (currentSong?.id) {
      audioRef.current.src = getPlayerSongUrl(currentSong?.id);
      dispatch(getChangeCurrentSongLyricsAction(currentSong?.id));
    }
    audioRef.current.play();
    setIsPlayingFlag(true);
  }, [currentSong]);

  const singerName = (currentSong?.ar && currentSong.ar[0].name) || '未知歌手';
  const durationTime = currentSong?.dt || 0;
  const fmtDuration = formatDate(durationTime, 'mm:ss');
  const fmtCurrentTime = formatDate(currentTime, 'mm:ss');
  const playMusic = useCallback(() => {
    console.log('播放歌曲', isPlayingFlag);
    setIsPlayEnd(false);
    isPlayingFlag
      ? audioRef.current.pause()
      : audioRef.current.play().catch(() => setIsPlayingFlag(false));
    setIsPlayingFlag(!isPlayingFlag);
  }, [isPlayingFlag, isPlayEnd]);

  const handleTimeUpdate = (e) => {
    const audioCurrentTime = e.target.currentTime * 1000; // 毫秒
    // console.log(audioCurrentTime);
    !isHandleChangeFlag && setCurrentTime(audioCurrentTime);
    let nextLyricIndex =
      currentSongLyrics.findIndex((item) => audioCurrentTime < item.time) - 1;
    if (nextLyricIndex === -2) nextLyricIndex = currentSongLyrics.length - 1;
    if (nextLyricIndex === currentLyricIndex) return; // 不更新歌词
    dispatch(changeCurrentLyricIndex(nextLyricIndex));
    currentSongLyrics[nextLyricIndex]?.content &&
      message.open({
        key: 'lyric',
        className: isShowPanel ? 'lyric-none' : 'lyric-message',
        duration: 0,
        content: currentSongLyrics[nextLyricIndex]?.content,
      });
  };
  const handleMusicEnded = () => {
    console.log('播放结束了');
    setIsHandleChangeFlag(false);
    setIsPlayEnd(true);
    if (playSequence === SEQUENCE_LOOP || playMusicsList.length === 1) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(getChangeCurrentSongIndexAndSongAction(1));
    }
  };
  const handleSliderChange = useCallback(
    (value) => {
      !isPlayEnd && setIsHandleChangeFlag(true);
      setCurrentTime(value);
    },
    [isPlayEnd],
  );
  const handleSliderAfterChange = useCallback(
    (value) => {
      setIsHandleChangeFlag(false);
      // console.log(value / 1000);
      audioRef.current.currentTime = value / 1000;
      setCurrentTime(value);
      // console.log('after', value);
      !isPlayingFlag && playMusic();
      sliderRef.current.blur();
    },
    [isPlayingFlag, playMusic],
  );
  // 改变当前播放歌曲索引 上一首 下一首
  const changeCurrentSongIndex = (step) => {
    setIsPlayEnd(false);
    dispatch(getChangeCurrentSongIndexAndSongAction(step));
  };

  // 循环播放 顺序播放 随机播放
  const changePlaySequence = () => {
    let nextSequence = playSequence + 1;
    nextSequence = nextSequence > 2 ? 0 : nextSequence;
    dispatch(getChangePlaySequenceAction(nextSequence));
  };

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
                ref={sliderRef}
                min={0}
                max={durationTime}
                defaultValue={0}
                value={currentTime}
                allowClear
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
              className={`${style['btn']} ${
                playSequence === 0 ? style['loop-order'] : ''
              }${playSequence === 1 ? style['loop-loop'] : ''}${
                playSequence === 2 ? style['loop-random'] : ''
              } sprite-player`}
              onClick={changePlaySequence}
            ></button>
            <button
              className={`${style['btn']} ${style['playlist']} sprite-player`}
              onClick={() => setIsShowPanel(!isShowPanel)}
            >
              {playMusicsList.length}
            </button>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => handleTimeUpdate(e)}
        onEnded={handleMusicEnded}
      />
      {isShowPanel && <WYAppPlayerPanel />}
    </div>
  );
}
