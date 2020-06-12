import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Routes from './Routes';

const ServiceApp = () => {
  const RenderApplication = () => (
    <>
      <Navbar />
      <Navbar id="navbar-clone" />
      <Sidebar />
      <Routes />
    </>
  );

  return <RenderApplication />;
};

export default ServiceApp;
