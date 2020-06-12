import React from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = ({ onLogin }) => {
  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <div className="field">
        <div className="control">
          <input
            ref={register}
            name="email"
            className="input is-large"
            type="email"
            placeholder="Your Email"
            autoFocus=""
            autoComplete="email"
          />
          {/* <div className="form-error">
            <span className="help is-danger">Email is required</span>
            <span className="help is-danger">Email address is not valid</span>
          </div> */}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            ref={register}
            name="password"
            className="input is-large"
            type="password"
            placeholder="Your Password"
            autoComplete="current-password"
          />
          {/* <div className="form-error">
            <span className="help is-danger">Password is required</span>
          </div> */}
        </div>
      </div>
      <button
        type="submit"
        className="button is-block is-info is-large is-fullwidth"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
