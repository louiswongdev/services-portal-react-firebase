import React, { useEffect } from 'react';
import withAuthorization from '../../components/hoc/withAuthorization';
import { fetchUserServices } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

import ServiceItem from '../../components/ServiceItem';

const UserServices = ({ auth: { user } }) => {
  const userServices = useSelector(state => state.auth.user.services);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserServices = async () => {
      try {
        await dispatch(fetchUserServices(user.uid));
      } catch (error) {
        console.log(error);
      }
    };
    getUserServices();
  }, [dispatch, user.uid]);

  return (
    <div className="container">
      <div className="content-wrapper">
        <h1 className="title">Your Services</h1>
        <div className="columns is-multiline">
          {userServices.map(userService => (
            <div key={userService.id} className="column">
              <ServiceItem service={userService} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuthorization(UserServices);
