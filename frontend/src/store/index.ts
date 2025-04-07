import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add more reducers here as needed
  },
  // Middleware configuration
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in specific paths
        ignoredActions: ['auth/loginSuccess', 'auth/updateUser'],
        ignoredPaths: ['auth.user'],
      },
    }),
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 