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
  active: null,
  // restEndTime: absolute epoch ms when rest ends (null = no active rest)
  // Storing the end time (not a countdown) means it persists correctly
  // when the user switches to another app and comes back.
  restEndTime: null,
  history: loadHistory(),
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
      state.restEndTime = null;
    },

    // Toggle a set complete/incomplete — allows editing after marking done
    toggleSetComplete(state, action) {
      const { exerciseIndex, setIndex } = action.payload;
      if (!state.active) return;
      const set = state.active.exercises[exerciseIndex].sets[setIndex];
      if (set.completed) {
        // Uncheck: just mark incomplete, don't start rest timer
        set.completed = false;
        state.restEndTime = null;
      } else {
        // Check: mark complete and start rest timer
        set.completed = true;
        const restSecs = state.active.exercises[exerciseIndex].restSeconds || 60;
        state.restEndTime = Date.now() + restSecs * 1000;
      }
    },

    updateSet(state, action) {
      const { exerciseIndex, setIndex, field, value } = action.payload;
      if (!state.active) return;
      state.active.exercises[exerciseIndex].sets[setIndex][field] = value;
    },

    completeExercise(state, action) {
      const { exerciseIndex, difficulty } = action.payload;
      if (!state.active) return;
      state.active.exercises[exerciseIndex].done = true;
      state.active.exercises[exerciseIndex].difficulty = difficulty;
      state.active.showDifficultyRater = false;
      state.restEndTime = null;
      const nextIndex = exerciseIndex + 1;
      if (nextIndex < state.active.exercises.length) {
        state.active.currentExerciseIndex = nextIndex;
      }
    },

    showDifficultyRater(state) {
      if (state.active) state.active.showDifficultyRater = true;
    },

    clearRestTimer(state) {
      state.restEndTime = null;
    },

    skipRest(state) {
      state.restEndTime = null;
    },

    swapExercise(state, action) {
      const { exerciseIndex, newExercise } = action.payload;
      if (!state.active) return;
      const existing = state.active.exercises[exerciseIndex];
      // Preserve set count from original, reset values
      state.active.exercises[exerciseIndex] = {
        ...newExercise,
        sets: Array.from({ length: newExercise.sets }, () => ({
          weight: '',
          reps: '',
          completed: false,
        })),
        difficulty: null,
        done: false,
      };
      // If this was the current exercise, stay on it
    },

    finishWorkout(state) {
      if (!state.active) return;
      const completed = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        programId: state.active.programId,
        dayIndex: state.active.dayIndex,
        dayName: state.active.dayName,
        duration: Math.round((Date.now() - state.active.startTime) / 1000),
        exercises: state.active.exercises,
      };
      state.history.unshift(completed);
      localStorage.setItem('shred_history', JSON.stringify(state.history));
      state.active = null;
      state.restEndTime = null;
    },

    cancelWorkout(state) {
      state.active = null;
      state.restEndTime = null;
    },

    setCurrentExercise(state, action) {
      if (state.active) state.active.currentExerciseIndex = action.payload;
    },
  },
});

export const {
  startWorkout,
  toggleSetComplete,
  updateSet,
  completeExercise,
  showDifficultyRater,
  clearRestTimer,
  skipRest,
  swapExercise,
  finishWorkout,
  cancelWorkout,
  setCurrentExercise,
} = workoutSlice.actions;

export default workoutSlice.reducer;
