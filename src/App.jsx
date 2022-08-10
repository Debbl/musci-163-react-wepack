import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '@/stores';
import AppRoutes from '@/router';
import WYAppHeader from '@/components/app-header';
import WYAppFooter from '@/components/app-footer';
import WYAppPlayerBar from '@/pages/player/app-player-bar';

import Loading from './components/loading';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <WYAppHeader />
        <Suspense fallback={<Loading />}>
          <AppRoutes />
        </Suspense>
        <WYAppFooter />
        <WYAppPlayerBar />
      </BrowserRouter>
    </Provider>
  );
}
