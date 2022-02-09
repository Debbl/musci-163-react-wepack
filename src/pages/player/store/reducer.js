import { Map } from 'immutable';

import * as actionTypes from './constants';

const defaultState = Map({
  currentSong: {},
  playMusicsList: [
    {
      name: '有何不可',
      id: 167876,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 5771,
          name: '许嵩',
          tns: [],
          alias: [],
        },
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '600902000007916021',
      fee: 8,
      v: 54,
      crbt: null,
      cf: '',
      al: {
        id: 16953,
        name: '自定义',
        picUrl:
          'https://p1.music.126.net/KyBR4ZDYFlzQJE_uyvfjpA==/109951166118671647.jpg',
        tns: [],
        pic_str: '109951166118671647',
        pic: 109951166118671650,
      },
      dt: 241840,
      h: {
        br: 320000,
        fid: 0,
        size: 9675799,
        vd: -58026,
      },
      m: {
        br: 192000,
        fid: 0,
        size: 5805497,
        vd: -55429,
      },
      l: {
        br: 128000,
        fid: 0,
        size: 3870346,
        vd: -53748,
      },
      a: null,
      cd: '1',
      no: 3,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 2,
      s_id: 0,
      mark: 8192,
      originCoverType: 1,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 54,
      songJumpInfo: null,
      entertainmentTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 22036,
      mv: 0,
      publishTime: 1231516800000,
    },
  ],
  currentSongIndex: 0,
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_SONG:
      return state.set('currentSong', action.currentSong);
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
