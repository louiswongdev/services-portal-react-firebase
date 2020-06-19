import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import store from './store';

import { BrowserRouter as Router } from 'react-router-dom';
import ServiceApp from './ServiceApp';

import {
  onAuthStateChanged,
  storeAuthUser,
  subscribeToMessages,
} from './actions';
import { checkUserConnection } from './actions/connection';

function App() {
  useEffect(() => {
    let unsubscribeMessages;
    const unsubscribeAuth = onAuthStateChanged(authUser => {
      store.dispatch(storeAuthUser(authUser));

      if (authUser) {
        checkUserConnection(authUser.uid);
        unsubscribeMessages = store.dispatch(subscribeToMessages(authUser.uid));
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeMessages();
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
//       if (authUser) {
//         checkUserConnection(authUser.uid);
//         this.unsubscribeMessages = store.dispatch(
//           subscribeToMessages(authUser.uid),
//         );
//         // debugger;
//       }
//     });
//   }

//   componentWillUnmount() {
//     this.unsubscribeAuth();
//     this.unsubscribeMessages();
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
