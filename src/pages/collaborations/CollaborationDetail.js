import React, { useCallback, useState } from 'react';
import withAuthorization from '../../components/hoc/withAuthorization';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  subToCollaboration,
  joinCollaboration,
  subToProfile,
  leaveCollaboration,
  sendChatMessage,
  subToMessages,
  startCollaboration,
} from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import JoinedPeople from '../../components/collaboration/JoinedPeople';

import moment from 'moment';
import ChatMessages from '../../components/collaboration/ChatMessages';
import { Timestamp } from '../../db';
import Timer from '../../components/collaboration/Timer';
import Spinner from '../../components/Spinner';

const CollaborationDetail = ({ auth: { user } }) => {
  const [inputValue, setInputValue] = useState('');
  const [reload, setReload] = useState(false);
  const collaboration = useSelector(state => state.collaboration.joined);
  const joinedPeople = useSelector(state => state.collaboration.joinedPeople);
  const messages = useSelector(state => state.collaboration.messages);

  const { id } = useParams();
  const dispatch = useDispatch();

  const peopleWatchers = {};

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const onKeyboardPress = e => {
    if (e.key === 'Enter') {
      onSendMessage(inputValue);
    }
  };

  const onSendMessage = inputValue => {
    if (inputValue.trim() === '') {
      return;
    }

    const timestamp = moment().valueOf().toString();
    const message = {
      user: {
        uid: user.uid,
        avatar: user.avatar,
        name: user.fullName,
      },
      timestamp: parseInt(timestamp, 10),
      content: inputValue.trim(),
    };

    sendChatMessage({
      message,
      collabId: collaboration.id,
      timestamp,
    }).then(_ => setInputValue(''));
  };

  const onStartCollaboration = collaboration => {
    const { id, time } = collaboration;
    const currentTimeInSeconds = Timestamp.now().seconds;

    // 0 --> nanoseconds. We don't need to show it
    const expiresAt = new Timestamp(currentTimeInSeconds + time, 0);

    // call action to store expiresAt value to collaboration field
    startCollaboration(id, expiresAt);
  };

  useEffect(() => {
    joinCollaboration(id, user.uid);

    // subscribe to users joining collaoboration page
    const unsubscribeFromCollab = dispatch(
      subToCollaboration(id, ({ joinedPeople }) => {
        watchJoinedPeopleChanges(joinedPeople.map(jp => jp.id));
      }),
    );

    // subscribe to chat messages
    const unsubscribeFromMessages = dispatch(subToMessages(id));

    const watchJoinedPeopleChanges = ids => {
      ids.forEach(id => {
        peopleWatchers[id] = dispatch(subToProfile(id));
      });
    };

    return () => {
      unsubscribeFromCollab();
      unsubscribeFromMessages();
      // to unsub from each person in peopleWatchers object,
      // we need to turn into array and loop through item to call
      // subToProfile function
      if (Object.entries(peopleWatchers).length !== 0) {
        Object.keys(peopleWatchers).forEach(uid => {
          return peopleWatchers[uid]();
        });
      }

      // unsub from collaboration when user leaves collaboration page
      // check if we have user first --> possible issue when logging out
      user && leaveCollaboration(id, user.uid);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, user.uid]);

  const reloadPage = () => {
    // set reload state to trigger component re-render
    // which in turn checks status via getCollaborationStatus fn
    setReload(true);
  };

  // if checks to see if our collaboration has started, is active
  // or is finished
  const getCollaborationStatus = collaboration => {
    if (Object.keys(collaboration).length === 0) {
      return 'loading';
    }

    if (!collaboration.expiresAt) {
      return 'notStarted';
    }

    if (Timestamp.now().seconds < collaboration.expiresAt.seconds) {
      return 'active';
    } else {
      return 'finished';
    }
  };

  const status = getCollaborationStatus(collaboration);
  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <div className="content-wrapper">
      <div className="root">
        <h1 className="title">{collaboration.title}</h1>
        <div className="body">
          <div className="viewListUser">
            {<JoinedPeople users={joinedPeople} />}
          </div>
          <div className="viewBoard">
            <div className="viewChatBoard">
              <div className="headerChatBoard">
                <div className="headerChatUser">
                  <img
                    className="viewAvatarItem"
                    src="https://i.imgur.com/cVDadwb.png"
                    alt="icon avatar"
                  />
                  <span className="textHeaderChatBoard">{user.fullName}</span>
                </div>
                {status === 'notStarted' && (
                  <div className="headerChatButton">
                    <button
                      onClick={() => onStartCollaboration(collaboration)}
                      className="button is-success"
                    >
                      Start Collaboration
                    </button>
                  </div>
                )}
                {status === 'active' && (
                  <Timer
                    timeoutCB={reloadPage}
                    seconds={
                      collaboration.expiresAt.seconds - Timestamp.now().seconds
                    }
                  />
                )}
                {status === 'finished' && (
                  <span className="tag is-warning is-large">
                    Collaboration Complete
                  </span>
                )}
              </div>
              <div className="viewListContentChat">
                {<ChatMessages messages={messages} authUser={user} />}
                <div style={{ float: 'left', clear: 'both' }}></div>
              </div>
              <div className="viewBottom">
                <input
                  onChange={handleChange}
                  onKeyPress={onKeyboardPress}
                  value={inputValue}
                  className="viewInput"
                  placeholder="Type your message..."
                  // disabled={status === 'finished' || status === 'notStarted'}
                />
                <button
                  onClick={() => onSendMessage(inputValue)}
                  className="button is-primary is-large"
                  // disabled={status === 'finished' || status === 'notStarted'}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthorization(CollaborationDetail);
