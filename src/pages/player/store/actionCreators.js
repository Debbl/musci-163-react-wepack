import * as actionTypes from './constants';
import { getSongDetail } from '@/services/player';

// 当前播放歌曲信息
const changeCurrentSongAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong,
});

const getSongDetailAction = (ids) => {
  return (dispatch) => {
    getSongDetail(ids).then((res) => {
      dispatch(changeCurrentSongAction(res.songs[0]));
    });
  };
};

// 添加歌曲到播放列表 action
const addItemToPlayMusicsListAction = (item) => ({
  type: actionTypes.Add_ITEM_TO_PLAY_MUSICS_LIST,
  musicItem: item,
});

// get Action
const getAddItemToPlayMusicsListAction = (ids) => {
  return (dispatch, getState) => {
    const playMusicsList = getState().getIn(['player', 'playMusicsList']);
    getSongDetail(ids).then((res) => {
      const musicItem = playMusicsList.find((item) => item.id === ids)
        ? null
        : res.songs[0];
      musicItem && dispatch(addItemToPlayMusicsListAction(musicItem));
    });
  };
};

// 当前播放歌曲列表索引
const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  currentSongIndex: index,
});

const getChangeCurrentSongIndexAction = (index) => {
  return (dispatch) => {
    dispatch(changeCurrentSongIndexAction(index));
  };
};

export {
  getSongDetailAction,
  getAddItemToPlayMusicsListAction,
  getChangeCurrentSongIndexAction,
};
