import React, { useCallback } from 'react';
import withAuthorization from '../../components/hoc/withAuthorization';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  subToCollaboration,
  joinCollaboration,
  subToProfile,
  leaveCollaboration,
} from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import JoinedPeople from '../../components/collaboration/JoinedPeople';

const CollaborationDetail = ({ auth: { user } }) => {
  const collaboration = useSelector(state => state.collaboration.joined);
  const joinedPeople = useSelector(state => state.collaboration.joinedPeople);

  const { id } = useParams();
  const dispatch = useDispatch();

  const peopleWatchers = {};

  // const watchJoinedPeopleChanges = useCallback(
  //   ids => {
  //     ids.forEach(id => {
  //       peopleWatchers[id] = subToProfile(id);
  //     });
  //   },
  //   [peopleWatchers],
  // );

  useEffect(() => {
    joinCollaboration(id, user.uid);
    const unsubscribeFromCollab = dispatch(
      subToCollaboration(id, ({ joinedPeople }) => {
        watchJoinedPeopleChanges(joinedPeople.map(jp => jp.id));
      }),
    );

    const watchJoinedPeopleChanges = ids => {
      ids.forEach(id => {
        peopleWatchers[id] = dispatch(subToProfile(id));
      });
    };

    return () => {
      unsubscribeFromCollab();
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
                <img
                  className="viewAvatarItem"
                  src="https://i.imgur.com/cVDadwb.png"
                  alt="icon avatar"
                />
                <span className="textHeaderChatBoard">Filip Jerga</span>
              </div>
              <div className="viewListContentChat">
                <div className="viewWrapItemLeft">
                  <div className="viewWrapItemLeft3">
                    <img
                      src="https://i.imgur.com/cVDadwb.png"
                      alt="avatar"
                      className="peerAvatarLeft"
                    />
                    <div className="viewItemLeft">
                      <span className="textContentItem">hey</span>
                    </div>
                  </div>
                  <span className="textTimeLeft">Oct 31, 2019</span>
                </div>
                <div className="viewItemRight">
                  <span className="textContentItem">hey</span>
                </div>
                <div style={{ float: 'left', clear: 'both' }}></div>
              </div>
              <div className="viewBottom">
                <input
                  onChange={() => {}}
                  className="viewInput"
                  placeholder="Type your message..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthorization(CollaborationDetail);
