import React from 'react';
import withAuthorization from '../../components/hoc/withAuthorization';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { subToCollaboration, joinCollaboration } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import JoinedPeople from '../../components/collaboration/JoinedPeople';

const CollaborationDetail = ({ auth: { user } }) => {
  const collaboration = useSelector(state => state.collaboration.joined);
  const joinedPeople = useSelector(state => state.collaboration.joinedPeople);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    joinCollaboration(id, user.uid);
    const unsubscribeFromCollab = dispatch(subToCollaboration(id));

    return () => unsubscribeFromCollab();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
