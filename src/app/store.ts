import { configureStore, combineReducers } from '@reduxjs/toolkit'

import {
      persistStore,
      persistReducer,
      FLUSH,
      REHYDRATE,
      PAUSE,
      PERSIST,
      PURGE,
      REGISTER,
    } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import dataStoreReducer from './dataStore';

const rootReducer = combineReducers({
    dataStore: dataStoreReducer
})

const persistConfig = {
      key: 'root',
      storage,
      // whitelist: ['user'], // Optional: only persist the 'user' slice
      // blacklist: ['someNonPersistedSlice'], // Optional: don't persist this slice
    };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
});

 export const persistor = persistStore(store);

 export type RootState = ReturnType<typeof store.getState>