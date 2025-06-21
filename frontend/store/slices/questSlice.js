import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuests = createAsyncThunk('quests/fetch', async () => {
  const res = await axios.get('http://192.168.0.104:8000/api/quests/');
  return res.data;
});

const questSlice = createSlice({
  name: 'quests',
  initialState: { list: [] },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchQuests.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  }
});

export default questSlice.reducer;
