import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/Home';
import Faq from './pages/Faq';
import Services from './pages/Services';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ServiceDetail from './pages/ServiceDetail';

const Routes = () => {
  return (
    <Switch>
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/services/:serviceId" exact component={ServiceDetail} />
      <Route path="/services" exact component={Services} />
      <Route path="/faq" exact component={Faq} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/" component={HomePage} />
    </Switch>
  );
};

export default Routes;
