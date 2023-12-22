import React from 'react';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="main-layout">
      {children}
      <Footer />
    </div>
  );
};

export default Layout;