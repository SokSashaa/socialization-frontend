import { configureStore } from '@reduxjs/toolkit';

import { authFormReducer, loginListener } from '../modules/Auth';
import { testsReducer } from '../modules/ComponentList';

import { apiSlice } from './api/apiSlice';


const store = configureStore({
    reducer: {
        auth: authFormReducer,
        tests: testsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    devTools: !import.meta.env.PROD,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(loginListener.middleware).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
