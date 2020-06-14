import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const onlyGuest = Component => {
  const WrappedComponent = props => {
    const auth = useSelector(state => state.auth);

    return auth.isAuth ? (
      <Redirect to="/" />
    ) : (
      <Component {...props} auth={auth} />
    );
  };
  return WrappedComponent;
};

export default onlyGuest;
