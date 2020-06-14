import React from 'react';
import { useSelector } from 'react-redux';

import Sidebar from './components/Sidebar';
import Routes from './Routes';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';

const ServiceApp = () => {
  const auth = useSelector(state => state.auth);

  const RenderApplication = () => (
    <>
      <Navbar loadFresh auth={auth} id="navbar-main" />
      <Navbar auth={auth} id="navbar-clone" />
      <Sidebar />
      <Routes />
    </>
  );

  return auth.isAuthResolved ? <RenderApplication /> : <Spinner />;
};

export default ServiceApp;
