import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

const Layout = () => (
  <nav>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </nav>
);

export default Layout;
