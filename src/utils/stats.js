// All stats derived from workout history — always accurate, no counters to drift.

export function calcStreak(history) {
  if (!history || history.length === 0) return 0;

  const workoutDates = new Set(history.map(w => w.date));
  const today = new Date();
  let streak = 0;

  // Walk backwards from today. If today has no workout, check if yesterday does
  // (so streak isn't broken until you miss a full day).
  const todayStr = today.toISOString().split('T')[0];
  const d = new Date(today);

  if (!workoutDates.has(todayStr)) {
    d.setDate(d.getDate() - 1);
  }

  while (true) {
    const dateStr = d.toISOString().split('T')[0];
    if (workoutDates.has(dateStr)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

export function calcWeeklyCount(history) {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return history.filter(w => new Date(w.date) >= weekAgo).length;
}
