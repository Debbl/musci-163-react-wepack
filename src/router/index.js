import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

import WYDiscover from '@/pages/discover';
import WYFriend from '@/pages/friend';
import WYMine from '@/pages/mine';
import WYRecommend from '@/pages/discover/c-pages/recommend';
import WYRanking from '@/pages/discover/c-pages/ranking';
import WYSongs from '@/pages/discover/c-pages/songs';
import WYDjradio from '@/pages/discover/c-pages/djradio';
import WYArtist from '@/pages/discover/c-pages/artist';
import WYAlbum from '@/pages/discover/c-pages/album';

function AppRoutes() {
  const AppRoutes = useRoutes([
    {
      path: '/',
      element: <Navigate to="discover" />,
    },
    {
      path: 'discover',
      element: <WYDiscover />,
      children: [
        {
          index: true,
          element: <Navigate to="recommend" />,
        },
        {
          path: 'recommend',
          element: <WYRecommend />,
        },
        {
          path: 'ranking',
          element: <WYRanking />,
        },
        {
          path: 'songs',
          element: <WYSongs />,
        },
        {
          path: 'djradio',
          element: <WYDjradio />,
        },
        {
          path: 'artist',
          element: <WYArtist />,
        },
        {
          path: 'album',
          element: <WYAlbum />,
        },
      ],
    },
    {
      path: 'mine',
      element: <WYMine />,
    },
    {
      path: 'friend',
      element: <WYFriend />,
    },
  ]);
  return AppRoutes;
}

export default AppRoutes;
