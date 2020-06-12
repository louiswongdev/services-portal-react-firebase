import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, storeAuthUser } from './actions';

import Sidebar from './components/Sidebar';
import Routes from './Routes';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';

const ServiceApp = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(authUser => {
      dispatch(storeAuthUser(authUser));
    });

    return () => unsubscribeAuth();
  }, [dispatch]);

  const RenderApplication = () => (
    <>
      <Navbar auth={auth} />
      <Navbar auth={auth} id="navbar-clone" />

      <Sidebar />
      <Routes />
    </>
  );

  return auth.isAuthResolved ? <RenderApplication /> : <Spinner />;
  // return <RenderApplication />;
};

export default ServiceApp;
