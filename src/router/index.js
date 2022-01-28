import React from 'react';
import { useRoutes } from 'react-router-dom';
import WYDiscover from '@/pages/discover';
import WYFriend from '@/pages/friend';
import WYMine from '@/pages/mine';

function AppRoutes() {
  let AppRoutes = useRoutes([
    {
      path: '/',
      element: <WYDiscover />,
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
