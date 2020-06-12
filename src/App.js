import React from 'react';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import store from './store';

import { BrowserRouter as Router } from 'react-router-dom';
import ServiceApp from './ServiceApp';

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <Router>
          <ServiceApp />
        </Router>
      </ToastProvider>
    </Provider>
  );
}

export default App;
