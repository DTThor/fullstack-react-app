import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateSet,
  toggleSetComplete,
  completeExercise,
  showDifficultyRater,
  clearRestTimer,
  skipRest,
  finishWorkout,
  cancelWorkout,
  setCurrentExercise,
  swapExercise,
} from '../../store/workoutSlice';
import { incrementStreak } from '../../store/userSlice';
import { playRestEndBeep, requestNotificationPermission, showRestEndNotification } from '../../utils/audio';
import { getAlternatives } from '../../data/exercisePool';
import MuscleImage from '../MuscleImage';

// ── Rest Timer ───────────────────────────────────────────────────────────────
function RestTimer({ restEndTime, onSkip }) {
  const [, setTick] = useState(0);

  const remaining = restEndTime ? Math.max(0, Math.round((restEndTime - Date.now()) / 1000)) : 0;
  const totalSecs = 120; // visual max for ring
  const pct = Math.min(100, (remaining / totalSecs) * 100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - pct / 100);

  // Tick every 500ms to keep display fresh
  useEffect(() => {
    if (!restEndTime) return;
    const interval = setInterval(() => setTick(t => t + 1), 500);
    return () => clearInterval(interval);
  }, [restEndTime]);

  return (
    <div className="rest-timer-overlay">
      <div className="rest-timer-card">
        <p className="rest-timer__label">REST</p>
        <div className="rest-timer__ring">
          <svg width="110" height="110" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="#27272A" strokeWidth="8" />
            <circle
              cx="50" cy="50" r={radius}
              fill="none" stroke="#A3E635" strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dashoffset 0.5s linear' }}
            />
          </svg>
          <span className="rest-timer__seconds">{remaining}s</span>
        </div>
        <p className="rest-timer__hint">Next set coming up 💪</p>
        <button className="btn btn--outline btn--small" onClick={onSkip}>Skip Rest</button>
      </div>
    </div>
  );
}

// ── Difficulty Rater ─────────────────────────────────────────────────────────
function DifficultyRater({ onRate }) {
  const levels = [
    { value: 1, label: 'Too Easy', emoji: '😴' },
    { value: 2, label: 'Easy',     emoji: '😊' },
    { value: 3, label: 'Good',     emoji: '💪' },
    { value: 4, label: 'Hard',     emoji: '😤' },
    { value: 5, label: 'Max',      emoji: '🔥' },
  ];
  return (
    <div className="difficulty-overlay">
      <div className="difficulty-card">
        <p className="difficulty-title">How was that?</p>
        <p className="difficulty-subtitle">Your AI coach adapts your next workout based on this</p>
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

// ── Swap Modal ───────────────────────────────────────────────────────────────
function SwapModal({ exercise, exerciseIndex, onClose }) {
  const dispatch = useDispatch();
  const alternatives = getAlternatives(exercise.muscle, exercise.id);

  const handleSwap = (newEx) => {
    dispatch(swapExercise({ exerciseIndex, newExercise: newEx }));
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card swap-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Swap Exercise</h3>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>
        <p className="modal-text">Replacing: <strong>{exercise.name}</strong></p>
        <p className="swap-muscle-label">{exercise.muscle} alternatives</p>
        <div className="swap-list">
          {alternatives.length === 0 && (
            <p className="swap-empty">No alternatives found for this muscle group.</p>
          )}
          {alternatives.map((alt) => (
            <button key={alt.id} className="swap-item" onClick={() => handleSwap(alt)}>
              <div className="swap-item__info">
                <p className="swap-item__name">{alt.name}</p>
                <p className="swap-item__meta">{alt.sets} sets · {alt.reps} reps · {alt.restSeconds}s rest</p>
              </div>
              <span className="swap-item__arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Set Row ──────────────────────────────────────────────────────────────────
function SetRow({ set, setIndex, exerciseIndex }) {
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
      />
      <span className="set-row__x">×</span>
      <input
        className="set-row__input"
        type="number"
        placeholder="reps"
        value={set.reps}
        onChange={e => dispatch(updateSet({ exerciseIndex, setIndex, field: 'reps', value: e.target.value }))}
      />
      <button
        className={`set-row__complete ${set.completed ? 'set-row__complete--done' : ''}`}
        onClick={() => dispatch(toggleSetComplete({ exerciseIndex, setIndex }))}
        title={set.completed ? 'Tap to uncheck' : 'Mark complete'}
      >
        {set.completed ? '✓' : '○'}
      </button>
    </div>
  );
}

// ── Exercise Card ────────────────────────────────────────────────────────────
function ExerciseCard({ exercise, exerciseIndex, isCurrent, onFocus }) {
  const dispatch = useDispatch();
  const [showImage, setShowImage] = useState(false);
  const [swapping, setSwapping] = useState(false);

  const allSetsCompleted = exercise.sets.length > 0 && exercise.sets.every(s => s.completed);

  return (
    <div
      className={`exercise-card ${isCurrent ? 'exercise-card--current' : ''} ${exercise.done ? 'exercise-card--done' : ''}`}
    >
      {/* Header row */}
      <div className="exercise-card__header" onClick={!exercise.done ? onFocus : undefined}>
        <div style={{ flex: 1 }}>
          <h3 className="exercise-card__name">{exercise.name}</h3>
          <p className="exercise-card__muscle">{exercise.muscle}</p>
        </div>
        <div className="exercise-card__actions">
          {!exercise.done && (
            <>
              {/* Form image toggle */}
              <button
                className="exercise-action-btn"
                onClick={e => { e.stopPropagation(); setShowImage(v => !v); }}
                title="Show form"
              >
                📐
              </button>
              {/* Swap exercise */}
              <button
                className="exercise-action-btn"
                onClick={e => { e.stopPropagation(); setSwapping(true); }}
                title="Swap exercise"
              >
                🔄
              </button>
            </>
          )}
          {exercise.done
            ? <span className="exercise-done-badge">✓ Done</span>
            : <span className="exercise-card__rest">{exercise.restSeconds}s rest</span>
          }
        </div>
      </div>

      {/* Form image / muscle diagram */}
      {showImage && (
        <div className="form-image-panel">
          <MuscleImage muscle={exercise.muscle} />
          {exercise.notes && (
            <div className="form-cues">
              <p className="form-cues__title">Key cues</p>
              <p className="form-cues__text">💡 {exercise.notes}</p>
            </div>
          )}
        </div>
      )}

      {/* Notes (collapsed by default, shown inside form panel above) */}
      {!showImage && exercise.notes && isCurrent && (
        <p className="exercise-card__notes">💡 {exercise.notes}</p>
      )}

      {/* Sets — always show when current or done */}
      {(isCurrent || exercise.done) && (
        <>
          <div className="set-headers">
            <span>Set</span>
            <span>Weight</span>
            <span />
            <span>Reps</span>
            <span />
          </div>
          {exercise.sets.map((set, si) => (
            <SetRow key={si} set={set} setIndex={si} exerciseIndex={exerciseIndex} />
          ))}
          {!exercise.done && (
            <button
              className={`btn btn--full ${allSetsCompleted ? 'btn--primary' : 'btn--ghost'}`}
              style={{ marginTop: 10 }}
              onClick={() => dispatch(showDifficultyRater())}
              disabled={!allSetsCompleted}
            >
              {allSetsCompleted ? 'Finish Exercise →' : `Complete all ${exercise.sets.length} sets first`}
            </button>
          )}
        </>
      )}

      {/* Swap modal */}
      {swapping && (
        <SwapModal
          exercise={exercise}
          exerciseIndex={exerciseIndex}
          onClose={() => setSwapping(false)}
        />
      )}
    </div>
  );
}

// ── Main WorkoutScreen ───────────────────────────────────────────────────────
export default function WorkoutScreen({ onNavigate }) {
  const dispatch = useDispatch();
  const active     = useSelector(s => s.workout.active);
  const restEndTime = useSelector(s => s.workout.restEndTime);
  const [elapsed, setElapsed] = useState(0);
  const [showCancel, setShowCancel] = useState(false);

  // Request notification permission once
  useEffect(() => { requestNotificationPermission(); }, []);

  // Elapsed workout timer
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setElapsed(Math.round((Date.now() - active.startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [active]);

  // Rest-end: fire sound + notification when timer expires
  // Using a setTimeout keyed on restEndTime so it works even when
  // the user switches to another app and comes back.
  const handleRestEnd = useCallback(() => {
    playRestEndBeep();
    showRestEndNotification();
    dispatch(clearRestTimer());
  }, [dispatch]);

  useEffect(() => {
    if (!restEndTime) return;
    const remaining = restEndTime - Date.now();
    if (remaining <= 0) {
      handleRestEnd();
      return;
    }
    const timeout = setTimeout(handleRestEnd, remaining);
    return () => clearTimeout(timeout);
  }, [restEndTime, handleRestEnd]);

  // Catch up when returning from another app
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible' && restEndTime && Date.now() >= restEndTime) {
        handleRestEnd();
      }
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [restEndTime, handleRestEnd]);

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

  if (!active) {
    return (
      <div className="screen screen--center">
        <p className="empty-state-emoji">⚡</p>
        <h2 className="empty-state-title">No Active Workout</h2>
        <p className="empty-state-text">Start a workout from the Home screen or Programs tab</p>
        <button className="btn btn--primary" onClick={() => onNavigate('home')}>Go to Home</button>
      </div>
    );
  }

  const completedCount = active.exercises.filter(e => e.done).length;
  const totalCount     = active.exercises.length;
  const progressPct    = (completedCount / totalCount) * 100;
  const restVisible    = restEndTime && (restEndTime > Date.now());

  return (
    <div className="screen">
      {/* Header */}
      <div className="workout-header">
        <div className="workout-header__top">
          <div>
            <h1 className="workout-header__name">{active.dayName}</h1>
            <p className="workout-header__timer">{formatTime(elapsed)}</p>
          </div>
          <button className="cancel-btn" onClick={() => setShowCancel(true)}>✕</button>
        </div>
        <div className="workout-progress-bar">
          <div className="workout-progress-bar__fill" style={{ width: `${progressPct}%` }} />
        </div>
        <p className="workout-progress__text">{completedCount} / {totalCount} exercises complete</p>
      </div>

      {/* Exercise tab pills */}
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

      {/* Finish button */}
      {completedCount === totalCount && (
        <button className="btn btn--primary btn--full btn--large" onClick={handleFinish}>
          🎉 Finish Workout
        </button>
      )}

      <div style={{ height: 24 }} />

      {/* Rest timer overlay */}
      {restVisible && (
        <RestTimer restEndTime={restEndTime} onSkip={() => dispatch(skipRest())} />
      )}

      {/* Difficulty rater overlay */}
      {active.showDifficultyRater && (
        <DifficultyRater onRate={(d) => dispatch(completeExercise({ exerciseIndex: active.currentExerciseIndex, difficulty: d }))} />
      )}

      {/* Cancel confirm */}
      {showCancel && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 className="modal-title">Cancel Workout?</h3>
            <p className="modal-text">Your progress for this session will be lost.</p>
            <div className="modal-actions">
              <button className="btn btn--ghost btn--full" onClick={() => setShowCancel(false)}>Keep Going 💪</button>
              <button className="btn btn--danger btn--full" onClick={() => { dispatch(cancelWorkout()); onNavigate('home'); }}>Cancel Workout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
