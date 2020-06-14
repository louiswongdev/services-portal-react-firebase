import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import store from './store';

import { BrowserRouter as Router } from 'react-router-dom';
import ServiceApp from './ServiceApp';

import { onAuthStateChanged, storeAuthUser, resetAuthState } from './actions';

// const store = initStore();

function App() {
  useEffect(() => {
    let mounted = true;
    const unsubscribeAuth = onAuthStateChanged(authUser => {
      // store.dispatch(resetAuthState());
      if (mounted) {
        store.dispatch(storeAuthUser(authUser));
      }
    });

    return () => {
      mounted = false;
      unsubscribeAuth();
    };
  }, []);

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

// class App extends React.Component {
//   componentDidMount() {
//     this.unsubscribeAuth = onAuthStateChanged(authUser => {
//       // store.dispatch(resetAuthState());
//       store.dispatch(storeAuthUser(authUser));
//     });
//   }

//   componentWillUnmount() {
//     this.unsubscribeAuth();
//   }

//   render() {
//     return (
//       <Provider store={store}>
//         <ToastProvider>
//           <Router>
//             <ServiceApp />
//           </Router>
//         </ToastProvider>
//       </Provider>
//     );
//   }
// }

export default App;
