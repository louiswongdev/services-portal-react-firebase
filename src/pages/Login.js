/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useToasts } from 'react-toast-notifications';
import { login } from '../actions';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [redirect, setRedirect] = useState(false);
  const { addToast } = useToasts();

  const dispatch = useDispatch();
  const loginUser = async loginData => {
    try {
      // await login(loginData);
      await dispatch(login(loginData));
      setRedirect(true);
    } catch (error) {
      addToast(error.message, {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 5000,
      });
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-page">
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title has-text-grey">Login</h3>
          <p className="subtitle has-text-grey">Please login to proceed.</p>
          <div className="box">
            <figure className="avatar">
              <img src="https://placehold.it/128x128" alt="logo" />
            </figure>
            <LoginForm onLogin={loginUser} />
          </div>
          <p className="has-text-grey">
            <a>Sign In With Google</a>&nbsp;
            <a href="/">Sign Up</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
