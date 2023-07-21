import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const response = await axios.get('https://rest-api-production-fc73.up.railway.app/api/v1/posts');
  return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
  await axios.delete(`https://rest-api-production-fc73.up.railway.app/api/v1/posts/${postId}`);
  return postId;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        return state.filter((post) => post.id !== action.payload);
      });
  },
});

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});

export {store};
