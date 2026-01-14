import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import authReducer from './auth/auth.reducer';

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['user', 'isOTPVerified'],
};

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
});


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);