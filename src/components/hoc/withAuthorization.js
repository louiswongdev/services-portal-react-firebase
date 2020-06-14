import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const withAuthorization = Component => {
  const WrappedComponent = props => {
    const auth = useSelector(state => state.auth);

    return auth.isAuth ? (
      <Component {...props} auth={auth} />
    ) : (
      <Redirect to="/login" />
    );
  };
  return WrappedComponent;
};

export default withAuthorization;
