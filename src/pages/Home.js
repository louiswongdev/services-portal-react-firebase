// /* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ServiceItem from '../components/ServiceItem';
import Hero from '../components/Hero';
import { fetchServices } from '../actions';

function Home() {
  const [services, setServices] = useState([]);
  const service = useSelector(state => state.service.items);
  const dispatch = useDispatch();

  // const loadServices = useCallback(async () => {
  //   try {
  //     await dispatch(fetchServices());
  //     setServices(service);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [dispatch, service]);

  useEffect(() => {
    dispatch(fetchServices());

    setServices(service);

    // loadServices();
  }, [dispatch, service]);

  const renderServices = services =>
    services.map(service => <ServiceItem key={service.id} service={service} />);

  return (
    <div>
      <Hero />

      <section className="section section-feature-grey is-medium">
        <div className="container">
          <div className="title-wrapper has-text-centered">
            <h2 className="title is-2">Great Power Comes </h2>
            <h3 className="subtitle is-5 is-muted">
              With great Responsability
            </h3>
            <div className="divider is-centered"></div>
          </div>

          <div className="content-wrapper">
            <div className="columns">{renderServices(services)}</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
