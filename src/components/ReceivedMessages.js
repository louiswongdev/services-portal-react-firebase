import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const ReceivedMessages = () => {
  const messages = useSelector(state => state.auth.user.messages);
  const dispatch = useDispatch();

  const renderMessages = messages => {
    if (messages.length === 0) {
      return <div className="navbar-item">No Messages</div>;
    }

    return messages.map(message => (
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
          <button onClick={() => {}} className="button is-warning">
            Later
          </button>
        </div>
      </div>
    ));
  };

  return renderMessages(messages);
};

export default ReceivedMessages;
