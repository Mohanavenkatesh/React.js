import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    // This section registers the application's reducers with the Redux store.
    // Here, the 'auth' slice of state is managed by the imported 'authReducer'.
    reducer: {
        auth: authReducer,
    },
})
// This file sets up the Redux store for the application using Redux Toolkit's configureStore.
// It imports the authentication reducer (authReducer) and registers it under the 'auth' key in the store's state.
// The exported 'store' object can be used throughout the app to access and manage global state.
