import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import serviceApp from '../reducers';

const addLoggerToDispatch = store => {
  const dispatch = store.dispatch;

  return action => {
    console.group(action.type);
    console.log('%c prev state', 'color: MEDIUMPURPLE', store.getState());
    console.log('%c action', 'color: DEEPSKYBLUE', action);
    const returnValue = dispatch(action);
    console.log('%c next state', 'color: DARKORANGE', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const middlewares = [thunk];

// const rootReducer = combineReducers({
//   service: servicesReducer,
// });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  serviceApp,
  composeEnhancers(applyMiddleware(...middlewares)),
);

if (process.env.NODE_ENV !== 'production') {
  store.dispatch = addLoggerToDispatch(store);
}

export default store;
