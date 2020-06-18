import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import withAuthorization from '../../components/hoc/withAuthorization';
import moment from 'moment';
import { useState } from 'react';
import { fetchCollaborations } from '../../actions';

const ReceivedCollaborations = ({ auth: { user } }) => {
  const [collaborations, setCollaborations] = useState([]);

  useEffect(() => {
    const fetchCollab = async userId => {
      try {
        const collabs = await fetchCollaborations(userId);
        setCollaborations(collabs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCollab(user.uid);
  }, [user.uid]);

  return (
    <div className="content-wrapper">
      <div className="container">
        <h1 className="title">Collaborations</h1>
        <div className="box content">
          {collaborations.map(c => (
            <article key={c.id} className="post">
              <h4>{c.title}</h4>
              <div className="media">
                <div className="media-left">
                  <p className="image is-32x32">
                    <img src={c.image} alt={c.title} />
                  </p>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <span href="#">{c.fromUser.name}</span> replied{' '}
                      {moment(c.createdAt.toDate()).fromNow()} &nbsp;
                      <span className="tag">{c.status}</span>
                    </p>
                  </div>
                </div>
                <div className="media-right">
                  <span className="has-text-grey-light">
                    <Link to={`/collaborations/${c.id}`}>
                      <button className="button">Enter</button>
                    </Link>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuthorization(ReceivedCollaborations);
