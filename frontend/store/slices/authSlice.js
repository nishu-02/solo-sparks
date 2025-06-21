import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
  const res = await axios.post('http://192.168.0.104:8000/api/auth/token/', { username, password });
  axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.access;
    });
  }
});

export default authSlice.reducer;
