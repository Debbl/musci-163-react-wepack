import { combineReducers } from 'redux-immutable';

import { reducer as recommendReducer } from '@/stores/recommend';
import { reducer as playerReducer } from '@/stores/player';

const cReducer = combineReducers({
  recommend: recommendReducer,
  player: playerReducer,
});

export default cReducer;
