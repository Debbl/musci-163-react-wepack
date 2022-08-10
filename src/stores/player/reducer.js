import { Map } from 'immutable';

import * as actionTypes from './constants';

const defaultState = Map({
  playMusicsList: [],
  currentSongIndex: 0,
  currentSongLyrics: [],
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.Add_ITEM_TO_PLAY_MUSICS_LIST:
      console.log(state.get('playMusicsList'));
      if (
        state
          .get('playMusicsList')
          .find((item) => item.id === action.musicItem.id)
      ) {
        return state;
      } else {
        return state.set('playMusicsList', [
          ...state.get('playMusicsList'),
          action.musicItem,
        ]);
      }
    case actionTypes.CHANGE_CURRENT_SONG_INDEX:
      return state.set('currentSongIndex', action.currentSongIndex);
    case actionTypes.CHANGE_CURRENT_SONG_LYRICS:
      return state.set('currentSongLyrics', action.lyrics);
    default:
      return state;
  }
}

export default reducer;
