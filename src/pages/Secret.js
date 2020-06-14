import React from 'react';
import withAuthorization from '../components/hoc/withAuthorization';

const Secret = () => {
  return <div>I am a SECRET Page. Only auth user can see me</div>;
};

export default withAuthorization(Secret);
