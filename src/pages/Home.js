// /* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getServices } from '../store';
import ServiceItem from '../components/ServiceItem';
import Hero from '../components/Hero';

function Home() {
  const [services, setServices] = useState([]);
  const service = useSelector(state => state.service);

  useEffect(() => {
    const services = getServices();
    setServices(services);
  }, [service]);

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
