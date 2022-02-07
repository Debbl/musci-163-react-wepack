import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '@/store';
import AppRoutes from '@/router';
import WYAppHeader from '@/components/app-header';
import WYAppFooter from '@/components/app-footer';
import WYAppPlayerBar from '@/pages/player/app-player-bar';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <WYAppHeader />
        <AppRoutes />
        <WYAppFooter />
        <WYAppPlayerBar />
      </BrowserRouter>
    </Provider>
  );
}
