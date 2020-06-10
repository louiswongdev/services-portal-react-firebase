/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NavbarClone from '../components/NavbarClone';
import { getServices } from '../store';
import ServiceItem from '../components/ServiceItem';
import Hero from '../components/Hero';

function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const services = getServices();
    setServices(services);
  }, []);

  const renderServices = services =>
    services.map(service => <ServiceItem key={service.id} service={service} />);

  return (
    <div>
      <Navbar />
      <NavbarClone />
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
