import React from 'react';
import { useSelector } from 'react-redux';
import { programs } from '../../data/programs';
import { calcStreak } from '../../utils/stats';

function BarChart({ data, label }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="bar-chart">
      {data.map((d, i) => (
        <div key={i} className="bar-chart__col">
          <div className="bar-chart__bar-wrap">
            <div
              className="bar-chart__bar"
              style={{ height: `${(d.value / max) * 100}%` }}
            />
          </div>
          <span className="bar-chart__x-label">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function StatCard({ value, label, sub, color }) {
  return (
    <div className="progress-stat-card">
      <span className="progress-stat-value" style={color ? { color } : {}}>{value}</span>
      <span className="progress-stat-label">{label}</span>
      {sub && <span className="progress-stat-sub">{sub}</span>}
    </div>
  );
}

function MilestoneItem({ achieved, label, desc }) {
  return (
    <div className={`milestone ${achieved ? 'milestone--achieved' : ''}`}>
      <span className="milestone__icon">{achieved ? '🏆' : '🔒'}</span>
      <div className="milestone__info">
        <p className="milestone__label">{label}</p>
        <p className="milestone__desc">{desc}</p>
      </div>
    </div>
  );
}

export default function ProgressScreen() {
  const history = useSelector(s => s.workout.history);
  const user = useSelector(s => s.user);
  const streak = calcStreak(history);
  const totalWorkouts = history.length;

  // Build weekly volume data for last 8 weeks
  const weeklyData = (() => {
    const weeks = [];
    for (let i = 7; i >= 0; i--) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - i * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      const count = history.filter(w => {
        const d = new Date(w.date);
        return d >= weekStart && d < weekEnd;
      }).length;
      const label = i === 0 ? 'Now' : `W-${i}`;
      weeks.push({ label, value: count });
    }
    return weeks;
  })();

  // Per-muscle group volume this month
  const muscleVolume = (() => {
    const map = {};
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    history
      .filter(w => new Date(w.date) >= monthAgo)
      .forEach(w => {
        w.exercises.forEach(ex => {
          const muscle = ex.muscle || 'Other';
          const sets = ex.sets.filter(s => s.completed).length;
          map[muscle] = (map[muscle] || 0) + sets;
        });
      });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([label, value]) => ({ label: label.split(' ')[0], value }));
  })();

  const totalSets = history.reduce((acc, w) => {
    return acc + w.exercises.reduce((a, ex) => a + ex.sets.filter(s => s.completed).length, 0);
  }, 0);

  const avgDuration = history.length
    ? Math.round(history.reduce((a, w) => a + w.duration, 0) / history.length / 60)
    : 0;

  const programMap = Object.fromEntries(programs.map(p => [p.id, p.name]));

  const milestones = [
    { label: '1st Workout', desc: 'Complete your first session', achieved: history.length >= 1 },
    { label: 'Week Warrior', desc: '7-day streak', achieved: streak >= 7 },
    { label: 'Iron 10', desc: 'Complete 10 workouts', achieved: totalWorkouts >= 10 },
    { label: 'Consistency', desc: 'Complete 25 workouts', achieved: totalWorkouts >= 25 },
    { label: 'Dedicated', desc: 'Complete 50 workouts', achieved: totalWorkouts >= 50 },
    { label: 'SHRED Elite', desc: '30-day streak', achieved: streak >= 30 },
  ];

  return (
    <div className="screen">
      <div className="screen-header">
        <h1 className="screen-title">Progress</h1>
        <p className="screen-subtitle">Track your transformation</p>
      </div>

      {/* Key stats */}
      <div className="progress-stats-grid">
        <StatCard value={streak} label="Day Streak" sub="🔥 Keep it up" color="#A3E635" />
        <StatCard value={totalWorkouts} label="Workouts" sub="Total sessions" />
        <StatCard value={totalSets} label="Total Sets" sub="All time" />
        <StatCard value={avgDuration + 'm'} label="Avg Duration" sub="Per session" />
      </div>

      {/* Weekly volume chart */}
      <div className="chart-card">
        <h3 className="chart-title">Weekly Workouts</h3>
        <p className="chart-subtitle">Past 8 weeks</p>
        {history.length > 0 ? (
          <BarChart data={weeklyData} />
        ) : (
          <div className="chart-empty">
            <p>Complete workouts to see your weekly volume</p>
          </div>
        )}
      </div>

      {/* Muscle volume chart */}
      {muscleVolume.length > 0 && (
        <div className="chart-card">
          <h3 className="chart-title">Top Muscles Trained</h3>
          <p className="chart-subtitle">Sets in past 30 days</p>
          <BarChart data={muscleVolume} />
        </div>
      )}

      {/* Recent workouts */}
      {history.length > 0 && (
        <>
          <h2 className="section-title" style={{ marginTop: '24px' }}>Recent Sessions</h2>
          {history.slice(0, 10).map(w => (
            <div key={w.id} className="history-item">
              <div className="history-item__left">
                <p className="history-item__name">{w.dayName}</p>
                <p className="history-item__meta">
                  {programMap[w.programId] || 'Custom'} · {w.exercises.length} exercises
                </p>
              </div>
              <div className="history-item__right">
                <p className="history-item__date">{w.date}</p>
                <p className="history-item__duration">{Math.round(w.duration / 60)}m</p>
              </div>
            </div>
          ))}
        </>
      )}

      {history.length === 0 && (
        <div className="empty-state">
          <p className="empty-state-emoji">📊</p>
          <h3 className="empty-state-title">No Data Yet</h3>
          <p className="empty-state-text">Complete your first workout to start tracking progress</p>
        </div>
      )}

      {/* Milestones */}
      <h2 className="section-title" style={{ marginTop: '24px' }}>Milestones</h2>
      <div className="milestones-list">
        {milestones.map((m, i) => (
          <MilestoneItem key={i} {...m} />
        ))}
      </div>

      <div style={{ height: '24px' }} />
    </div>
  );
}
