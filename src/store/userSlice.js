import { createSlice } from '@reduxjs/toolkit';

const loadUser = () => {
  try {
    const saved = localStorage.getItem('shred_user');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const defaultUser = {
  name: 'Athlete',
  goal: 'Build Muscle',
  level: 'Intermediate',
  equipment: ['Barbell', 'Dumbbells', 'Pull-up Bar', 'Cables'],
  daysPerWeek: 4,
  weight: '',
  weightUnit: 'lbs',
  activeProgramId: 'power-shred',
  anthropicApiKey: '',
  joinDate: new Date().toISOString().split('T')[0],
};

const initialState = loadUser() || defaultUser;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action) {
      Object.assign(state, action.payload);
      localStorage.setItem('shred_user', JSON.stringify(state));
    },
    setActiveProgram(state, action) {
      state.activeProgramId = action.payload;
      localStorage.setItem('shred_user', JSON.stringify(state));
    },
    setApiKey(state, action) {
      state.anthropicApiKey = action.payload;
      localStorage.setItem('shred_user', JSON.stringify(state));
    },
  },
});

export const { updateUser, setActiveProgram, setApiKey } = userSlice.actions;
export default userSlice.reducer;
