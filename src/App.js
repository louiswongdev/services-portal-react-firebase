import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import Sidebar from './components/Sidebar';
import Faq from './pages/Faq';
import Services from './pages/Services';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Navbar id="navbar-clone" />
        <Sidebar />
        <Switch>
          <Route path="/services" exact component={Services} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/faq" exact component={Faq} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
