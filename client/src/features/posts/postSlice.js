import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllPosts, createPosts, deletePosts, updatePosts, fetchPostById, addComment } from './postAPI.js';

const initialState = {
  posts: [],
  status: 'idle',
  currentPost: null,
  currentPostStatus: 'idle'
};

export const fetchAllPostsAsync = createAsyncThunk('posts/fetchAllPosts', async () => {
  const response = await fetchAllPosts();
  return response.data;
});
export const createPostsAsync = createAsyncThunk('posts/createPosts', async (newPost) => {
  const response = await createPosts(newPost);
  return response.data;
});
export const updatePostsAsync = createAsyncThunk('posts/updatePosts', async (updatedPost) => {
  const response = await updatePosts(updatedPost.id, updatedPost);
  return response.data;
});
export const deletePostsAsync = createAsyncThunk('posts/deletePosts', async (id) => {
  await deletePosts(id);
  return id;
});
export const fetchPostByIdAsync = createAsyncThunk('posts/fetchPostById', async (id) => {
  const response = await fetchPostById(id);
  return response.data;
});
export const addCommentAsync = createAsyncThunk('posts/addComment', async ({ postId, comment }) => {
  const response = await addComment(postId, comment);
  return response.data;
});

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPostsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
      })
      .addCase(createPostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPostsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts.unshift(action.payload); //? use "unshift" instead of "push" to add new post to the beginning of the array
      })
      .addCase(fetchPostByIdAsync.pending, (state) => {
        state.currentPostStatus = 'loading';
      })
      .addCase(fetchPostByIdAsync.fulfilled, (state, action) => {
        state.currentPostStatus = 'idle';
        state.currentPost = action.payload;
      })
      .addCase(updatePostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePostsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        state.currentPost = null;
      })
      .addCase(deletePostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePostsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(addCommentAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (state.currentPost && state.currentPost._id === action.payload._id) {
          state.currentPost = action.payload;
        }
        state.posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      })
      .addCase(addCommentAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.error('Add comment failed:', action.error.message);
        console.error('Full error:', action.error);
      });
  }
});

// Selectors
export const selectPosts = (state) => state.posts.posts;
export const selectStatus = (state) => state.posts.status;
export const selectCurrentPost = (state) => state.posts.currentPost;
export const selectCurrentPostStatus = (state) => state.posts.currentPostStatus;

export default postSlice.reducer;

