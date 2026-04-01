import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateSet,
  completeSet,
  completeExercise,
  showDifficultyRater,
  tickRestTimer,
  skipRest,
  finishWorkout,
  cancelWorkout,
  setCurrentExercise,
} from '../../store/workoutSlice';
import { incrementStreak } from '../../store/userSlice';
import { programs } from '../../data/programs';

// Rest Timer overlay
function RestTimer({ seconds, onSkip }) {
  const pct = Math.min(100, (seconds / 120) * 100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - pct / 100);

  return (
    <div className="rest-timer-overlay">
      <div className="rest-timer-card">
        <p className="rest-timer__label">Rest Time</p>
        <div className="rest-timer__ring">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="#27272A" strokeWidth="8" />
            <circle
              cx="50" cy="50" r={radius}
              fill="none" stroke="#A3E635" strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <span className="rest-timer__seconds">{seconds}s</span>
        </div>
        <button className="btn btn--outline btn--small" onClick={onSkip}>Skip Rest</button>
      </div>
    </div>
  );
}

// Difficulty rater
function DifficultyRater({ onRate }) {
  const levels = [
    { value: 1, label: 'Too Easy', emoji: '😴' },
    { value: 2, label: 'Easy', emoji: '😊' },
    { value: 3, label: 'Just Right', emoji: '💪' },
    { value: 4, label: 'Hard', emoji: '😤' },
    { value: 5, label: 'Max Effort', emoji: '🔥' },
  ];

  return (
    <div className="difficulty-overlay">
      <div className="difficulty-card">
        <p className="difficulty-title">How was that?</p>
        <p className="difficulty-subtitle">Rate the difficulty so your AI coach can adapt your next workout</p>
        <div className="difficulty-options">
          {levels.map(l => (
            <button key={l.value} className="difficulty-btn" onClick={() => onRate(l.value)}>
              <span className="difficulty-emoji">{l.emoji}</span>
              <span className="difficulty-label">{l.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Set row component
function SetRow({ set, setIndex, exerciseIndex, exerciseId }) {
  const dispatch = useDispatch();

  return (
    <div className={`set-row ${set.completed ? 'set-row--done' : ''}`}>
      <span className="set-row__num">{setIndex + 1}</span>
      <input
        className="set-row__input"
        type="number"
        placeholder="lbs"
        value={set.weight}
        onChange={e => dispatch(updateSet({ exerciseIndex, setIndex, field: 'weight', value: e.target.value }))}
        disabled={set.completed}
      />
      <span className="set-row__x">×</span>
      <input
        className="set-row__input"
        type="number"
        placeholder="reps"
        value={set.reps}
        onChange={e => dispatch(updateSet({ exerciseIndex, setIndex, field: 'reps', value: e.target.value }))}
        disabled={set.completed}
      />
      <button
        className={`set-row__complete ${set.completed ? 'set-row__complete--done' : ''}`}
        onClick={() => dispatch(completeSet({ exerciseIndex, setIndex }))}
        disabled={set.completed}
      >
        {set.completed ? '✓' : '○'}
      </button>
    </div>
  );
}

// Exercise card
function ExerciseCard({ exercise, exerciseIndex, isCurrent, onFocus }) {
  const dispatch = useDispatch();
  const allSetsCompleted = exercise.sets.every(s => s.completed);

  const handleCompleteExercise = () => {
    dispatch(showDifficultyRater());
  };

  return (
    <div
      className={`exercise-card ${isCurrent ? 'exercise-card--current' : ''} ${exercise.done ? 'exercise-card--done' : ''}`}
      onClick={!exercise.done ? onFocus : undefined}
    >
      <div className="exercise-card__header">
        <div>
          <h3 className="exercise-card__name">{exercise.name}</h3>
          <p className="exercise-card__muscle">{exercise.muscle}</p>
        </div>
        {exercise.done ? (
          <span className="exercise-done-badge">✓ Done</span>
        ) : (
          <span className="exercise-card__rest">Rest: {exercise.restSeconds}s</span>
        )}
      </div>

      {exercise.notes && (
        <p className="exercise-card__notes">💡 {exercise.notes}</p>
      )}

      {(isCurrent || exercise.done) && (
        <>
          {/* Set headers */}
          <div className="set-headers">
            <span>Set</span>
            <span>Weight</span>
            <span></span>
            <span>Reps</span>
            <span></span>
          </div>

          {/* Sets */}
          {exercise.sets.map((set, si) => (
            <SetRow
              key={si}
              set={set}
              setIndex={si}
              exerciseIndex={exerciseIndex}
              exerciseId={exercise.id}
            />
          ))}

          {!exercise.done && (
            <button
              className={`btn btn--full ${allSetsCompleted ? 'btn--primary' : 'btn--ghost'}`}
              onClick={handleCompleteExercise}
              disabled={!allSetsCompleted}
            >
              {allSetsCompleted ? 'Complete Exercise →' : `Complete all ${exercise.sets.length} sets first`}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default function WorkoutScreen({ onNavigate }) {
  const dispatch = useDispatch();
  const active = useSelector(s => s.workout.active);
  const restSeconds = useSelector(s => s.workout.restSeconds);
  const restActive = useSelector(s => s.workout.restActive);
  const [elapsed, setElapsed] = useState(0);
  const [showCancel, setShowCancel] = useState(false);

  // Workout timer
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setElapsed(Math.round((Date.now() - active.startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [active]);

  // Rest countdown
  useEffect(() => {
    if (!restActive) return;
    const interval = setInterval(() => {
      dispatch(tickRestTimer());
    }, 1000);
    return () => clearInterval(interval);
  }, [restActive, dispatch]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleFinish = () => {
    dispatch(finishWorkout());
    dispatch(incrementStreak());
    onNavigate('home');
  };

  const handleCancel = () => {
    dispatch(cancelWorkout());
    onNavigate('home');
  };

  const handleDifficultyRate = (difficulty) => {
    const idx = active.currentExerciseIndex;
    dispatch(completeExercise({ exerciseIndex: idx, difficulty }));
  };

  if (!active) {
    return (
      <div className="screen screen--center">
        <p className="empty-state-emoji">⚡</p>
        <h2 className="empty-state-title">No Active Workout</h2>
        <p className="empty-state-text">Start a workout from the Home screen or Programs</p>
        <button className="btn btn--primary" onClick={() => onNavigate('home')}>Go to Home</button>
      </div>
    );
  }

  const completedCount = active.exercises.filter(e => e.done).length;
  const totalCount = active.exercises.length;
  const progressPct = (completedCount / totalCount) * 100;

  return (
    <div className="screen">
      {/* Workout header */}
      <div className="workout-header">
        <div className="workout-header__top">
          <div>
            <h1 className="workout-header__name">{active.dayName}</h1>
            <p className="workout-header__timer">{formatTime(elapsed)}</p>
          </div>
          <button className="cancel-btn" onClick={() => setShowCancel(true)}>✕</button>
        </div>

        {/* Progress bar */}
        <div className="workout-progress-bar">
          <div className="workout-progress-bar__fill" style={{ width: `${progressPct}%` }} />
        </div>
        <p className="workout-progress__text">{completedCount} / {totalCount} exercises</p>
      </div>

      {/* Exercise tabs */}
      <div className="exercise-tabs-scroll">
        {active.exercises.map((ex, i) => (
          <button
            key={i}
            className={`exercise-tab ${i === active.currentExerciseIndex ? 'exercise-tab--active' : ''} ${ex.done ? 'exercise-tab--done' : ''}`}
            onClick={() => dispatch(setCurrentExercise(i))}
          >
            {ex.done ? '✓' : i + 1}
          </button>
        ))}
      </div>

      {/* Exercises */}
      <div className="exercises-list">
        {active.exercises.map((ex, i) => (
          <ExerciseCard
            key={i}
            exercise={ex}
            exerciseIndex={i}
            isCurrent={i === active.currentExerciseIndex}
            onFocus={() => dispatch(setCurrentExercise(i))}
          />
        ))}
      </div>

      {/* Finish workout */}
      {completedCount === totalCount && (
        <button className="btn btn--primary btn--full btn--large" onClick={handleFinish}>
          🎉 Finish Workout
        </button>
      )}

      <div style={{ height: '24px' }} />

      {/* Rest timer overlay */}
      {restActive && restSeconds > 0 && (
        <RestTimer seconds={restSeconds} onSkip={() => dispatch(skipRest())} />
      )}

      {/* Difficulty rater overlay */}
      {active.showDifficultyRater && (
        <DifficultyRater onRate={handleDifficultyRate} />
      )}

      {/* Cancel confirm */}
      {showCancel && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 className="modal-title">Cancel Workout?</h3>
            <p className="modal-text">Your progress will be lost.</p>
            <div className="modal-actions">
              <button className="btn btn--ghost btn--full" onClick={() => setShowCancel(false)}>Keep Going</button>
              <button className="btn btn--danger btn--full" onClick={handleCancel}>Cancel Workout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
