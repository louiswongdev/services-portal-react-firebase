import React, { useEffect, useState } from 'react';
import withAuthorization from '../../components/hoc/withAuthorization';
import { useDispatch, useSelector } from 'react-redux';
import ServiceItem from '../../components/service/ServiceItem';
import { fetchReceivedOffers, changeOfferStatus } from '../../actions';
import Spinner from '../../components/Spinner';

const ReceivedOffers = ({ auth }) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const offers = useSelector(state => state.offers.received);
  const isFetching = useSelector(state => state.offers.isFetching);
  const dispatch = useDispatch();

  useEffect(() => {
    // debugger;
    dispatch(fetchReceivedOffers(auth.user.uid));
    setInitialLoad(false)
  }, [auth.user.uid, dispatch]);

  const handleAcceptOffer = offerId => {
    dispatch(changeOfferStatus(offerId, 'accepted'));
  };

  const handleDeclineOffer = offerId => {
    dispatch(changeOfferStatus(offerId, 'declined'));
  };

  const statusClass = status => {
    if (status === 'pending') return 'is-warning';
    if (status === 'accepted') return 'is-success';
    if (status === 'declined') return 'is-danger';
  };

  return (
    isFetching || initialLoad ?  <Spinner /> : (
    <div className="container">
      <div className="content-wrapper">
        <h1 className="title">Received Offers</h1>

        {!isFetching && offers.length === 0 && (
          <span className="tag is-warning is-large">
            You do not have any received offers
          </span>
        )}
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
                      onClick={() => handleAcceptOffer(offer.id)}
                      className="button is-success s-m-r"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDeclineOffer(offer.id)}
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

    )
  );
};

export default withAuthorization(ReceivedOffers);
