import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import AppRoutes from '@/router';

export default function App() {
  return (
    <BrowserRouter>
      <Link to="header">header</Link>
      <AppRoutes />
    </BrowserRouter>
  );
}
