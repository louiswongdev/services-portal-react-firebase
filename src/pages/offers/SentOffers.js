import React, { useEffect } from 'react';
import withAuthorization from '../../components/hoc/withAuthorization';
import ServiceItem from '../../components/service/ServiceItem';
import { fetchSentOffers } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

const SentOffers = ({ auth }) => {
  const offers = useSelector(state => state.offers.sent);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSentOffers(auth.user.uid));
  }, [auth.user.uid, dispatch]);

  return (
    <div className="container">
      <div className="content-wrapper">
        <h1 className="title">Sent Offers</h1>
        <div className="columns">
          {offers.map(offer => (
            <div key={offer.id} className="column is-one-third">
              <ServiceItem
                noButton
                className="offer-card"
                service={offer.service}
              >
                <div className="tag is-large">{offer.status}</div>
                <hr />
                <div className="service-offer">
                  <div>
                    <span className="label">To User:</span>{' '}
                    {offer.toUser.fullName}
                  </div>
                  <div>
                    <span className="label">Note:</span> {offer.note}
                  </div>
                  <div>
                    <span className="label">Price:</span> ${offer.price}
                  </div>
                  <div>
                    <span className="label">Time:</span> {offer.time} hours
                  </div>
                </div>
              </ServiceItem>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuthorization(SentOffers);
