import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceById } from '../actions';
import Spinner from '../components/Spinner';
import OfferModal from '../components/service/OfferModal';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const service = useSelector(state => state.selectedService.item);
  const isFetching = useSelector(state => state.selectedService.isFetching);

  useEffect(() => {
    dispatch(fetchServiceById(serviceId));
  }, [dispatch, serviceId]);

  if (isFetching || serviceId !== service.id) {
    // if (isFetching && !service.id) {
    return <Spinner />;
  }

  return (
    <section className="hero is-fullheight is-default is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="columns is-vcentered">
            <div className="column is-5">
              <figure className="image is-4by3">
                <img src={service.image} alt="Description" />
              </figure>
            </div>
            <div className="column is-6 is-offset-1">
              <h1 className="title is-2">{service.title}</h1>
              <h2 className="subtitle is-4">{service.description}</h2>
              <br />
              <div className="has-text-centered">
                <OfferModal service={service} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetail;
