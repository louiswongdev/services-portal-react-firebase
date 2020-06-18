import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { markMessageAsRead } from '../actions';

const ReceivedMessages = () => {
  const messages = useSelector(state => state.auth.user.messages);
  const history = useHistory();

  const handleMessageAsRead = message => {
    markMessageAsRead(message);
  };

  const goToCollaboration = message => {
    markMessageAsRead(message);
    history.push(message.cta);
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
            <div onClick={() => goToCollaboration(message)}>
              <div className="button is-success">Join</div>
            </div>
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
