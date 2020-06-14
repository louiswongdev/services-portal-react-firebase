/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

import RegisterForm from '../components/auth/RegisterForm';
import { register } from '../actions/';
import { useToasts } from 'react-toast-notifications';
import onlyGuest from '../components/hoc/onlyGuest';

const Register = () => {
  const [redirect, setRedirect] = useState(false);
  // const history = useHistory();
  const { addToast } = useToasts();

  const registerUser = async userData => {
    try {
      const user = await register(userData);
      setRedirect(true);
      // history.push('/');
    } catch (error) {
      addToast(error.message, {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 3000,
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
          <h3 className="title has-text-grey">Register</h3>
          <p className="subtitle has-text-grey">Please Register to proceed.</p>
          <div className="box">
            <figure className="avatar">
              <img src="https://placehold.it/128x128" alt="logo" />
            </figure>
            <RegisterForm onRegister={registerUser} />
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

export default onlyGuest(Register);
