import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import createSagaMiddleware from 'redux-saga'
import * as userSagas from './sagas/userSagas';
import * as dashboardSagas from './sagas/dashboardSagas';
import * as projectSagas from './sagas/projectSagas';
import {createLogger} from 'redux-logger'


const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  
  const Store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware, reduxImmutableStateInvariant())
    // applyMiddleware(createLogger(), sagaMiddleware, reduxImmutableStateInvariant())
  );
  
  for (let saga in userSagas) {
    sagaMiddleware.run(userSagas[saga]);
  }

  for (let saga in dashboardSagas) {
    sagaMiddleware.run(dashboardSagas[saga]);
  }

  for (let saga in projectSagas) {
    sagaMiddleware.run(projectSagas[saga]);
  }

  return Store;
}

// export default function configureStore(initialState) {
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

//   return createStore(
//     rootReducer,
//     initialState,
//     composeEnhancers(applyMiddleware(sagaMiddleware, reduxImmutableStateInvariant()))
//   );
// }


