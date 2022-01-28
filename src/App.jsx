import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/router';
import WYAppHeader from '@/components/app-header';
import WYAppFooter from '@/components/app-footer';

export default function App() {
  return (
    <BrowserRouter>
      <WYAppHeader />
      <AppRoutes />
      <WYAppFooter />
    </BrowserRouter>
  );
}
