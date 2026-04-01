import { createSlice } from '@reduxjs/toolkit';
import { programs } from '../data/programs';

const initialState = {
  list: programs,
  filter: 'All',
};

const programsSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = programsSlice.actions;
export default programsSlice.reducer;
