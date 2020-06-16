import React, { useEffect } from 'react';
import withAuthorization from '../../components/hoc/withAuthorization';
import { useDispatch, useSelector } from 'react-redux';
import ServiceItem from '../../components/service/ServiceItem';
import { fetchReceivedOffers } from '../../actions';

const ReceivedOffers = ({ auth }) => {
  const offers = useSelector(state => state.offers.received);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReceivedOffers(auth.user.uid));
  }, [auth.user.uid, dispatch]);

  const acceptOffer = offer => {
    // console.log(`Accepting ${JSON.stringify(offer)}`);
    console.log(offer);
  };

  const declineOffer = offer => {
    console.log(offer);
  };

  const statusClass = status => {
    if (status === 'pending') return 'is-warning';
    if (status === 'accepted') return 'is-success';
    if (status === 'declined') return 'is-danger';
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        <h1 className="title">Received Offers</h1>
        <div className="columns">
          {offers.map(offer => (
            <div key={offer.id} className="column is-one-third">
              <ServiceItem
                noButton
                className="offer-card"
                service={offer.service}
              >
                <div className={`tag is-large ${statusClass(offer.status)}`}>
                  {offer.status}
                </div>
                <hr />
                <div className="service-offer">
                  <div>
                    <span className="label">From User:</span>{' '}
                    {offer.fromUser.fullName}
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
                {offer.status === 'pending' && (
                  <div>
                    <hr />
                    <button
                      onClick={() => acceptOffer(offer)}
                      className="button is-success s-m-r"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => declineOffer(offer)}
                      className="button is-danger"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </ServiceItem>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuthorization(ReceivedOffers);
