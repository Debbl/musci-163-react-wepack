import * as actionTypes from './constants';
import { getSongDetail, getSongLyrics } from '@/services/player';
import { parseLyrics } from '@/utils/lyrics-parse';
import { getRandomNumber } from '@/utils/math-utils';

// 添加歌曲到播放列表 action
const changePlayMusicListAction = (playMusicsList) => ({
  type: actionTypes.CHANGE_PLAY_MUSIC_LIST,
  playMusicsList,
});

// get Action
const getAddItemToPlayMusicsListAction = (ids) => {
  return (dispatch, getState) => {
    const playMusicsList = getState().getIn(['player', 'playMusicsList']);
    const isDispatch = !playMusicsList.find((item) => item.id === ids);
    isDispatch &&
      getSongDetail(ids).then((res) => {
        if (playMusicsList.length === 0) {
          dispatch(changeCurrentSongAction(res.songs[0]));
          dispatch(changeCurrentSongIndexAction(0));
        }
        const newPlayMusicList = [...playMusicsList, res.songs[0]];
        dispatch(changePlayMusicListAction(newPlayMusicList));
      });
  };
};

// 当前播放歌曲列表索引 和 歌曲
const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  currentSongIndex: index,
});
const changeCurrentSongAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong,
});
const getChangeCurrentSongIndexAndSongAction = (step) => {
  return (dispatch, getState) => {
    const playMusicsList = getState().getIn(['player', 'playMusicsList']);
    const currentSongIndex = getState().getIn(['player', 'currentSongIndex']);
    const playSequence = getState().getIn(['player', 'playSequence']);
    let nextSongIndex = currentSongIndex;
    switch (playSequence) {
      case actionTypes.SEQUENCE_LOOP:
      case actionTypes.SEQUENCE_ORDER:
        nextSongIndex = nextSongIndex + step;
        if (nextSongIndex < 0) nextSongIndex = playMusicsList.length;
        if (nextSongIndex >= playMusicsList.length) nextSongIndex = 0;
        break;
      case actionTypes.SEQUENCE_RANDOM:
        nextSongIndex = getRandomNumber(playMusicsList.length);
        while (nextSongIndex === currentSongIndex) {
          nextSongIndex = getRandomNumber(playMusicsList.length);
        }
        break;
    }
    dispatch(changeCurrentSongIndexAction(nextSongIndex));
    dispatch(changeCurrentSongAction(playMusicsList[nextSongIndex]));
  };
};

// 当前播放歌曲的歌词
const changeCurrentSongLyricsAction = (lyrics) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_LYRICS,
  lyrics,
});

const getChangeCurrentSongLyricsAction = (id) => {
  return (dispatch) => {
    getSongLyrics(id).then((res) => {
      const lyrics = parseLyrics(res.lrc.lyric);
      dispatch(changeCurrentSongLyricsAction(lyrics));
    });
  };
};

// 改变当前播放列表顺序
const changePlaySequenceAction = (sequence) => ({
  type: actionTypes.CHANGE_PLAY_SEQUENCE,
  sequence,
});

const getChangePlaySequenceAction = (sequence) => {
  return (dispatch) => {
    dispatch(changePlaySequenceAction(sequence));
  };
};

export {
  getAddItemToPlayMusicsListAction,
  getChangeCurrentSongLyricsAction,
  getChangePlaySequenceAction,
  getChangeCurrentSongIndexAndSongAction,
};
