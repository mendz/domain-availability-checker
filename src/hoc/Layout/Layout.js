import React from 'react';

import Toolbar from '../../components/Toolbar/Toolbar';

const Layout = ({ children }) => (
  <div>
    <Toolbar />
    <main>{children}</main>
  </div>
);

export default Layout;
