import { Map } from 'immutable';

import * as actionTypes from './constants';

const defaultState = Map({
  playMusicsList: [],
  currentSongIndex: 0,
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.Add_ITEM_TO_PLAY_MUSICS_LIST:
      console.log(action);
      console.log(state.get('playMusicsList'));
      return state.set('playMusicsList', [
        ...state.get('playMusicsList'),
        action.musicItem,
      ]);
    case actionTypes.CHANGE_CURRENT_SONG_INDEX:
      return state.set('currentSongIndex', action.currentSongIndex);
    default:
      return state;
  }
}

export default reducer;
