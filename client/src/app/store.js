import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postSlice.js';

const ReduxStore = configureStore({
  reducer: {
    posts: postsReducer
  }
});

export default ReduxStore;
