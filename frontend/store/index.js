import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import questReducer from './slices/questSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    quests: questReducer
  }
});
