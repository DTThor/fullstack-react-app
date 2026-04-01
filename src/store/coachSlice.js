import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  messages: [
    {
      role: 'assistant',
      content: "Hey! I'm your AI Coach. Ask me anything about your workouts, form, nutrition, or recovery. Let's get to work!",
    },
  ],
  loading: false,
  error: null,
};

const coachSlice = createSlice({
  name: 'coach',
  initialState,
  reducers: {
    openCoach(state) {
      state.open = true;
    },
    closeCoach(state) {
      state.open = false;
    },
    addUserMessage(state, action) {
      state.messages.push({ role: 'user', content: action.payload });
      state.loading = true;
      state.error = null;
    },
    addAssistantMessage(state, action) {
      state.messages.push({ role: 'assistant', content: action.payload });
      state.loading = false;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearMessages(state) {
      state.messages = [
        {
          role: 'assistant',
          content: "Hey! I'm your AI Coach. Ask me anything about your workouts, form, nutrition, or recovery. Let's get to work!",
        },
      ];
    },
  },
});

export const {
  openCoach,
  closeCoach,
  addUserMessage,
  addAssistantMessage,
  setError,
  clearMessages,
} = coachSlice.actions;

export default coachSlice.reducer;
