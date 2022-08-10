import React, { lazy } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

const WYDiscover = lazy(() => import('@/pages/discover'));
const WYFriend = lazy(() => import('@/pages/friend'));
const WYMine = lazy(() => import('@/pages/mine'));
const WYRecommend = lazy(() => import('@/pages/discover/c-pages/recommend'));
const WYRanking = lazy(() => import('@/pages/discover/c-pages/ranking'));
const WYSongs = lazy(() => import('@/pages/discover/c-pages/songs'));
const WYDjradio = lazy(() => import('@/pages/discover/c-pages/djradio'));
const WYArtist = lazy(() => import('@/pages/discover/c-pages/artist'));
const WYAlbum = lazy(() => import('@/pages/discover/c-pages/album'));

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
