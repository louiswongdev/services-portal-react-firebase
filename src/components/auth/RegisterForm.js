/* eslint-disable no-useless-escape */
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  isValidImage,
  isValidURL,
  samePassword,
} from '../../helpers/validators';

const RegisterForm = ({ onRegister }) => {
  const { register, errors, handleSubmit, getValues } = useForm();

  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <form onSubmit={handleSubmit(onRegister)}>
      <div className="field">
        <div className="control">
          <input
            ref={register({ required: true, pattern: emailPattern })}
            name="email"
            className="input is-large"
            type="email"
            placeholder="Your Email"
            autoComplete="email"
          />
          {errors.email && (
            <div className="form-error">
              {errors.email.type === 'required' && (
                <span className="help is-danger">Email is required</span>
              )}
              {errors.email.type === 'pattern' && (
                <span className="help is-danger">
                  Email address is not valid
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            ref={register({ required: true, minLength: 8 })}
            name="fullName"
            className="input is-large"
            type="text"
            placeholder="Full Name"
          />
          {errors.fullName && (
            <div className="form-error">
              {errors.fullName.type === 'required' && (
                <span className="help is-danger">Name is required</span>
              )}
              {errors.fullName.type === 'minLength' && (
                <span className="help is-danger">
                  Name needs to be at least 8 characters
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            ref={register({
              required: true,
              validate: { isValidImage, isValidURL },
            })}
            name="avatar"
            className="input is-large"
            type="text"
            placeholder="Avatar"
          />
          {errors.avatar && (
            <div className="form-error">
              {errors.avatar.type === 'required' && (
                <span className="help is-danger">Avatar is required</span>
              )}
              {errors.avatar.type === 'isValidImage' && (
                <span className="help is-danger">
                  Avatar file extension is not valid
                </span>
              )}
              {errors.avatar.type === 'isValidURL' && (
                <span className="help is-danger">Avatar URL is not valid</span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            ref={register({
              required: true,
              minLength: 6,
            })}
            name="password"
            className="input is-large"
            type="password"
            placeholder="Your Password"
            autoComplete="current-password"
          />
          {errors.password && (
            <div className="form-error">
              {errors.password.type === 'required' && (
                <span className="help is-danger">Password is required</span>
              )}
              {errors.password.type === 'minLength' && (
                <span className="help is-danger">
                  Password needs to be at least 6 characters
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            ref={register({
              required: true,
              minLength: 6,
              validate: { samePassword: samePassword(getValues, 'password') },
            })}
            name="passwordConfirmation"
            className="input is-large"
            type="password"
            placeholder="Repeat Password"
            autoComplete="current-password"
          />
          {errors.passwordConfirmation && (
            <div className="form-error">
              {errors.passwordConfirmation.type === 'required' && (
                <span className="help is-danger">
                  Password Confirmation is required
                </span>
              )}
              {errors.passwordConfirmation.type === 'minLength' && (
                <span className="help is-danger">
                  Password needs to be at least 6 characters
                </span>
              )}
              {errors.passwordConfirmation.type === 'samePassword' && (
                <span className="help is-danger">Passwords do not match</span>
              )}
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="button is-block is-info is-large is-fullwidth"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
