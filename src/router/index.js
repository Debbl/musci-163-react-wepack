import React from 'react';
import { useRoutes } from 'react-router-dom';
import WYAppHeader from '@/components/app-header';
import WYAppFooter from '@/components/app-footer';

function AppRoutes() {
  let AppRoutes = useRoutes([
    {
      path: '/',
      element: <WYAppFooter />,
    },
    {
      path: 'header',
      element: <WYAppHeader />,
    },
    {
      path: 'footer',
      element: <WYAppFooter />,
    },
  ]);
  return AppRoutes;
}

export default AppRoutes;
