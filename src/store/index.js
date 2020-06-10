import { createStore, combineReducers } from 'redux';
import servicesReducer from '../reducers';

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

const rootReducer = combineReducers({
  service: servicesReducer,
});

const browserSupport =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, browserSupport);

store.dispatch = addLoggerToDispatch(store);

export default store;
