import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { markMessageAsRead } from '../actions';

const ReceivedMessages = () => {
  const messages = useSelector(state => state.auth.user.messages);
  // const dispatch = useDispatch();

  const handleMessageAsRead = message => {
    markMessageAsRead(message);
  };

  const renderMessages = messages => {
    // filter out messages that have already been read
    const filteredMessages = messages
      .filter(m => !m.isRead)
      .map(message => (
        <div key={message.id} className="user-message">
          <div className="from-user">
            <span>From: </span>
            {message.fromUser.name}
          </div>
          <hr />
          <div className="navbar-item navbar-item-message">
            <div>{message.text}</div>
            <Link onClick={() => {}} to={message.cta}>
              <div className="button is-success">Join</div>
            </Link>
            <button
              onClick={() => handleMessageAsRead(message)}
              className="button is-warning"
            >
              Later
            </button>
          </div>
        </div>
      ));

    if (filteredMessages.length === 0) {
      return <div className="navbar-item">No Messages</div>;
    }

    return filteredMessages;
  };

  return renderMessages(messages);
};

export default ReceivedMessages;
