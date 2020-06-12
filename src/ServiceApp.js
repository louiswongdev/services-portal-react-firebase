import React, { useEffect } from 'react';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Routes from './Routes';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged, storeAuthUser } from './actions';

const ServiceApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(authUser => {
      dispatch(storeAuthUser(authUser));
    });

    return () => unsubscribeAuth();
  }, [dispatch]);
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
