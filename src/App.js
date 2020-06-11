import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import Sidebar from './components/Sidebar';
import Faq from './pages/Faq';
import Services from './pages/Services';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ServiceDetail from './pages/ServiceDetail';

// const store = initStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Navbar id="navbar-clone" />
        <Sidebar />
        <Switch>
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/services/:serviceId" exact component={ServiceDetail} />
          <Route path="/services" exact component={Services} />
          <Route path="/faq" exact component={Faq} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
