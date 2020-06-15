import React from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../Modal';
import { useState } from 'react';
import { createRef, createOffer } from '../../actions';

import { useToasts } from 'react-toast-notifications';

const OfferModal = ({ service, auth }) => {
  const [offer, setOffer] = useState({
    fromUser: '',
    toUser: '',
    service: '',
    status: 'pending',
    price: 0,
    time: 0,
    note: '',
  });
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'time') {
      const price = Math.round(value * service.price * 100) / 100;
      return setOffer({
        ...offer,
        [name]: value,
        price,
      });
    }

    return setOffer({
      ...offer,
      [name]: value,
    });
  };

  const handleSubmit = async closeModal => {
    // add additional properties to offer. Let's create a copy
    // so we don't could component to re-render
    const offerCopy = {
      ...offer,
      fromUser: createRef('profiles', auth.user.uid),
      toUser: createRef('profiles', service.user.uid),
      service: createRef('service', service.id),
      time: parseInt(offer.time, 10),
    };
    console.log(offerCopy);

    try {
      await dispatch(createOffer(offerCopy));
      closeModal();
      addToast('Offer was successfully created!', {
        appearance: 'success',
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    } catch (error) {
      addToast(error.message, {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    }
  };

  return (
    <Modal onModalSubmit={handleSubmit} openButtonText="Make an offer">
      <div className="field">
        <input
          onChange={handleChange}
          name="note"
          className="input is-large"
          type="text"
          placeholder="Write some catchy note"
          max="5"
          min="0"
          autoFocus=""
        />
        <p className="help">Note can increase chance of getting the service</p>
      </div>
      <div className="field">
        <input
          onChange={handleChange}
          name="time"
          className="input is-large"
          type="number"
          placeholder="How long you need service for ?"
          max="5"
          min="0"
          autoFocus=""
        />
        <p className="help">Enter time in hours</p>
      </div>
      <div className="service-price has-text-centered">
        <div className="service-price-title">
          {service.user &&
            `Upon acceptance ${service.user.fullName} will charge you:`}
        </div>
        <div className="service-price-value">
          <h1 className="title">${offer.price}</h1>
        </div>
      </div>
    </Modal>
  );
};

export default OfferModal;
