

import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import reducers from '../reducers';
import logger from 'redux-logger';

export default function ConfigureStore() {
  
  return configureStore({
    reducer: reducers(),
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });
}