import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/Home';
import Faq from './pages/Faq';
import Services from './pages/Services';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ServiceDetail from './pages/ServiceDetail';
import Secret from './pages/Secret';
import ServiceCreate from './pages/services/ServiceCreate';
import UserServices from './pages/services/UserServices';
import SentOffers from './pages/offers/SentOffers';
import ReceivedOffers from './pages/offers/ReceivedOffers';
import ReceivedCollaborations from './pages/collaborations/ReceivedCollaborations';
import CollaborationDetail from './pages/collaborations/CollaborationDetail';

const Routes = () => {
  return (
    <Switch>
      <Route path="/secret" component={Secret} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route
        path="/collaborations/me"
        exact
        component={ReceivedCollaborations}
      />
      <Route path="/collaborations/:id" exact component={CollaborationDetail} />
      <Route path="/offers/sent/" exact component={SentOffers} />
      <Route path="/offers/received/" exact component={ReceivedOffers} />
      <Route path="/services/me" exact component={UserServices} />
      <Route path="/services/new" exact component={ServiceCreate} />
      <Route path="/services/:serviceId" exact component={ServiceDetail} />
      <Route path="/services" exact component={Services} />
      <Route path="/faq" exact component={Faq} />
      <Route path="/" component={HomePage} />
    </Switch>
  );
};

export default Routes;
