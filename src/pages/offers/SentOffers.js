import React, { useEffect } from 'react';
import withAuthorization from '../../components/hoc/withAuthorization';
import ServiceItem from '../../components/service/ServiceItem';
import { fetchSentOffers, createCollaboration } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { newCollaboration, newMessage } from '../../helpers/offers';
import { useToasts } from 'react-toast-notifications';

const SentOffers = ({ auth }) => {
  const offers = useSelector(state => state.offers.sent);
  const dispatch = useDispatch();

  const { addToast } = useToasts();

  useEffect(() => {
    dispatch(fetchSentOffers(auth.user.uid));
  }, [auth.user.uid, dispatch]);

  const handleCreateCollaboration = async offer => {
    const collaboration = newCollaboration({ offer, fromUser: auth.user });
    const message = newMessage({ offer, fromUser: auth.user });

    try {
      await dispatch(createCollaboration({ collaboration, message }));
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
    // console.log(collaboration);
    // console.log(message);
  };

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
                {offer.status === 'accepted' && !offer.collaborationCreated && (
                  <div>
                    <hr />
                    <button
                      onClick={() => handleCreateCollaboration(offer)}
                      className="button is-success"
                    >
                      Collaborate
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

export default withAuthorization(SentOffers);
