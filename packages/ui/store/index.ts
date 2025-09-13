// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import authFormReducer, { AccountFormState } from './authReducer';

export interface RootState {
  authForm: AccountFormState;
}

// Conditionally apply logger middleware in development
const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: {
    authForm: authFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

export type AppDispatch = typeof store.dispatch;
