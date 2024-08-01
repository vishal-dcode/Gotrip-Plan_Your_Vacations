import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postSlice.js';
import authReducer from '../features/auth/authSlice.js';

const ReduxStore = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer
  }
});

export default ReduxStore;
