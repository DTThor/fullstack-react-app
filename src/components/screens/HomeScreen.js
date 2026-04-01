import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startWorkout } from '../../store/workoutSlice';
import { programs } from '../../data/programs';
import { calcStreak, calcWeeklyCount } from '../../utils/stats';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

// Derive which day to show next based on workout history for this program
function getNextDayIndex(program, history) {
  const programHistory = history.filter(w => w.programId === program.id);
  if (programHistory.length === 0) {
    // Never done this program — start at day 0
    return 0;
  }
  // Find the most recent completed day index
  const last = programHistory[0]; // history is newest-first
  const lastDayIndex = typeof last.dayIndex === 'number' ? last.dayIndex : 0;
  return (lastDayIndex + 1) % program.days.length;
}

export default function HomeScreen({ onNavigate }) {
  const dispatch = useDispatch();
  const user = useSelector(s => s.user);
  const history = useSelector(s => s.workout.history);
  const activeWorkout = useSelector(s => s.workout.active);

  const program = programs.find(p => p.id === user.activeProgramId) || programs[0];
  const nextDayIndex = getNextDayIndex(program, history);
  const nextDay = program.days[nextDayIndex];

  const lastWorkout = history[0];
  const weeklyCount = calcWeeklyCount(history);
  const streak = calcStreak(history);
  const totalWorkouts = history.length;

  const handleStartWorkout = () => {
    dispatch(startWorkout({
      programId: program.id,
      dayIndex: nextDayIndex,
      dayName: nextDay.name,
      exercises: nextDay.exercises,
    }));
    onNavigate('workout');
  };

  const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  // Is today's workout already done? (last history entry is today and same program)
  const today = new Date().toISOString().split('T')[0];
  const todayDone = lastWorkout && lastWorkout.date === today && lastWorkout.programId === program.id;

  return (
    <div className="screen">
      {/* Header */}
      <div className="home-header">
        <div>
          <p className="home-greeting">{getGreeting()},</p>
          <h1 className="home-name">{user.name} 👋</h1>
        </div>
        <div className="streak-badge">
          <span className="streak-fire">🔥</span>
          <span className="streak-count">{streak}</span>
        </div>
      </div>

      {/* Active workout banner */}
      {activeWorkout && (
        <button className="active-workout-banner" onClick={() => onNavigate('workout')}>
          <span className="pulse-dot" />
          <span>Workout in progress — {activeWorkout.dayName}</span>
          <span className="banner-arrow">→</span>
        </button>
      )}

      {/* Quick stats */}
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-value">{weeklyCount}</span>
          <span className="stat-label">This Week</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{totalWorkouts}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{streak}</span>
          <span className="stat-label">Streak</span>
        </div>
      </div>

      {/* Next workout card */}
      <div className="section-header">
        <h2 className="section-title">
          {todayDone ? 'Next Up' : "Today's Workout"}
        </h2>
        <span className="section-tag" style={{ background: program.color + '22', color: program.color }}>
          {program.emoji} {program.name}
        </span>
      </div>

      {todayDone && (
        <div className="done-today-banner">
          <span>✅ Workout complete today — great work!</span>
        </div>
      )}

      <div className="today-card" style={{ borderColor: program.color + '44' }}>
        <div className="today-card__header">
          <div>
            <h3 className="today-card__title">{nextDay.name}</h3>
            <p className="today-card__focus">{nextDay.focus}</p>
          </div>
          <div className="today-card__meta">
            <span>Day {nextDayIndex + 1} of {program.days.length}</span>
          </div>
        </div>

        <div className="exercise-preview">
          {nextDay.exercises.slice(0, 4).map((ex, i) => (
            <div key={i} className="exercise-preview__item">
              <span className="exercise-preview__dot" style={{ background: program.color }} />
              <span className="exercise-preview__name">{ex.name}</span>
              <span className="exercise-preview__sets">{ex.sets}×{ex.reps}</span>
            </div>
          ))}
          {nextDay.exercises.length > 4 && (
            <p className="exercise-preview__more">+{nextDay.exercises.length - 4} more exercises</p>
          )}
        </div>

        <button
          className="btn btn--primary btn--full"
          onClick={handleStartWorkout}
          disabled={!!activeWorkout}
        >
          {activeWorkout
            ? 'Workout in Progress'
            : todayDone
              ? `Start Next: ${nextDay.name}`
              : `Start ${nextDay.name}`
          }
        </button>
      </div>

      {/* Last workout recap */}
      {lastWorkout && (
        <>
          <h2 className="section-title" style={{ marginTop: 24 }}>Last Session</h2>
          <div className="last-workout-card">
            <div className="last-workout__info">
              <p className="last-workout__name">{lastWorkout.dayName}</p>
              <p className="last-workout__date">{lastWorkout.date} · {formatDuration(lastWorkout.duration)}</p>
            </div>
            <div className="last-workout__stats">
              <span>{lastWorkout.exercises.length} exercises</span>
            </div>
          </div>
        </>
      )}

      {/* Program overview */}
      <div className="section-header" style={{ marginTop: 24 }}>
        <h2 className="section-title">Your Program</h2>
        <button className="text-btn" onClick={() => onNavigate('programs')}>Change</button>
      </div>
      <div className="program-mini-card" style={{ borderColor: program.color + '44' }}>
        <div className="program-mini__emoji">{program.emoji}</div>
        <div className="program-mini__info">
          <p className="program-mini__name">{program.name}</p>
          <p className="program-mini__meta">{program.weeks} weeks · {program.daysPerWeek}x/week · {program.level}</p>
        </div>
        <div className="program-mini__tag" style={{ background: program.color + '22', color: program.color }}>
          {program.category}
        </div>
      </div>

      <div style={{ height: 24 }} />
    </div>
  );
}
