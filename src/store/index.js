import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from './workoutSlice';
import programsReducer from './programsSlice';
import userReducer from './userSlice';
import coachReducer from './coachSlice';

export const store = configureStore({
  reducer: {
    workout: workoutReducer,
    programs: programsReducer,
    user: userReducer,
    coach: coachReducer,
  },
});
