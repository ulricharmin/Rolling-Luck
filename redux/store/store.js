import {AsyncStorage} from 'react-native';
import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from '../reducers';

const persistConfig = {
  // key: 'root',
  key: 'toor',
  storage: AsyncStorage
}

const middlewares = [];

if (__DEV__) {
  middlewares.push(createLogger());
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

store.subscribe(() => {
  console.log(store.getState());
});


export const persistor = persistStore(store);
