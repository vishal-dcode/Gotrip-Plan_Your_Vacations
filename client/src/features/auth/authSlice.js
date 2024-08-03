import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginWithGoogle } from './authAPI';

const initialState = {
  user: null,
  status: 'idle',
  error: null
};

export const authAsync = createAsyncThunk('auth/authAsync', async ({ result, token }, { rejectWithValue }) => {
  try {
    const profile = { result, token };
    localStorage.setItem('profile', JSON.stringify(profile));

    // Send user data to the server
    await loginWithGoogle({
      email: result.email,
      name: result.name,
      picture: result.picture
    });

    return profile;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('profile');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(authAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
