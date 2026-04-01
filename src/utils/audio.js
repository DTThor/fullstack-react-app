// Web Audio API beep — no external files needed
export function playRestEndBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const beep = (freq, startOffset, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.35, ctx.currentTime + startOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startOffset + duration);
      osc.start(ctx.currentTime + startOffset);
      osc.stop(ctx.currentTime + startOffset + duration + 0.05);
    };
    // Three ascending tones
    beep(660, 0,    0.12);
    beep(880, 0.18, 0.12);
    beep(1100, 0.36, 0.25);
  } catch {
    // Audio unavailable — silently ignore
  }
}

export function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

export function showRestEndNotification() {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Rest Over! 💪', {
      body: "Time to get back to work",
      icon: '/favicon.ico',
      silent: true, // We already play the beep
    });
  }
}
