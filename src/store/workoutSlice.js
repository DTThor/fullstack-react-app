import { createSlice } from '@reduxjs/toolkit';

const loadHistory = () => {
  try {
    const saved = localStorage.getItem('shred_history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState = {
  // Active workout session
  active: null,  // null when no workout in progress
  // { programId, dayIndex, dayName, startTime, exercises: [...], currentExerciseIndex, restTimer }

  // Completed workout history
  history: loadHistory(),

  // Rest timer
  restSeconds: 0,
  restActive: false,
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    startWorkout(state, action) {
      const { programId, dayIndex, dayName, exercises } = action.payload;
      state.active = {
        programId,
        dayIndex,
        dayName,
        startTime: Date.now(),
        currentExerciseIndex: 0,
        showDifficultyRater: false,
        exercises: exercises.map(ex => ({
          ...ex,
          sets: Array.from({ length: ex.sets }, () => ({
            weight: '',
            reps: '',
            completed: false,
          })),
          difficulty: null,
          done: false,
        })),
      };
      state.restSeconds = 0;
      state.restActive = false;
    },

    updateSet(state, action) {
      const { exerciseIndex, setIndex, field, value } = action.payload;
      if (!state.active) return;
      state.active.exercises[exerciseIndex].sets[setIndex][field] = value;
    },

    completeSet(state, action) {
      const { exerciseIndex, setIndex } = action.payload;
      if (!state.active) return;
      state.active.exercises[exerciseIndex].sets[setIndex].completed = true;
      // Start rest timer using the exercise's rest duration
      const restSecs = state.active.exercises[exerciseIndex].restSeconds || 60;
      state.restSeconds = restSecs;
      state.restActive = true;
    },

    completeExercise(state, action) {
      const { exerciseIndex, difficulty } = action.payload;
      if (!state.active) return;
      state.active.exercises[exerciseIndex].done = true;
      state.active.exercises[exerciseIndex].difficulty = difficulty;
      state.active.showDifficultyRater = false;

      // Advance to next exercise
      const nextIndex = exerciseIndex + 1;
      if (nextIndex < state.active.exercises.length) {
        state.active.currentExerciseIndex = nextIndex;
      }
    },

    showDifficultyRater(state) {
      if (state.active) state.active.showDifficultyRater = true;
    },

    tickRestTimer(state) {
      if (state.restActive && state.restSeconds > 0) {
        state.restSeconds -= 1;
      } else {
        state.restActive = false;
        state.restSeconds = 0;
      }
    },

    skipRest(state) {
      state.restActive = false;
      state.restSeconds = 0;
    },

    finishWorkout(state) {
      if (!state.active) return;
      const completed = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        programId: state.active.programId,
        dayName: state.active.dayName,
        duration: Math.round((Date.now() - state.active.startTime) / 1000),
        exercises: state.active.exercises,
      };
      state.history.unshift(completed);
      localStorage.setItem('shred_history', JSON.stringify(state.history));
      state.active = null;
      state.restActive = false;
      state.restSeconds = 0;
    },

    cancelWorkout(state) {
      state.active = null;
      state.restActive = false;
      state.restSeconds = 0;
    },

    setCurrentExercise(state, action) {
      if (state.active) state.active.currentExerciseIndex = action.payload;
    },
  },
});

export const {
  startWorkout,
  updateSet,
  completeSet,
  completeExercise,
  showDifficultyRater,
  tickRestTimer,
  skipRest,
  finishWorkout,
  cancelWorkout,
  setCurrentExercise,
} = workoutSlice.actions;

export default workoutSlice.reducer;
