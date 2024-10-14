

import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import reducers from '../reducers';
import logger from 'redux-logger';

export default function ConfigureStore() {
  // const middleware = applyMiddleware(logger);
  
  return configureStore({
    reducer: reducers(),
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    //  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
  });
}