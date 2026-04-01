import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, setApiKey } from '../../store/userSlice';

const GOALS = ['Build Muscle', 'Lose Fat', 'Improve Endurance', 'Get Stronger', 'Stay Active'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const EQUIPMENT_OPTIONS = ['Barbell', 'Dumbbells', 'Cables', 'Machines', 'Pull-up Bar', 'Kettlebells', 'Resistance Bands', 'No Equipment'];

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector(s => s.user);
  const history = useSelector(s => s.workout.history);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...user });
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(user.anthropicApiKey || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    dispatch(updateUser(draft));
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleApiKeySave = () => {
    dispatch(setApiKey(apiKeyInput));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleEquipment = (item) => {
    const current = draft.equipment || [];
    if (current.includes(item)) {
      setDraft({ ...draft, equipment: current.filter(e => e !== item) });
    } else {
      setDraft({ ...draft, equipment: [...current, item] });
    }
  };

  const totalVolume = history.reduce((acc, w) => {
    return acc + w.exercises.reduce((a, ex) => {
      return a + ex.sets.filter(s => s.completed && s.weight && s.reps)
        .reduce((sum, s) => sum + (parseFloat(s.weight) * parseInt(s.reps)), 0);
    }, 0);
  }, 0);

  return (
    <div className="screen">
      <div className="screen-header">
        <h1 className="screen-title">Profile</h1>
      </div>

      {/* Avatar / Overview */}
      <div className="profile-hero">
        <div className="profile-avatar">
          <span className="profile-avatar__initials">
            {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
          </span>
        </div>
        <div className="profile-hero__info">
          <h2 className="profile-hero__name">{user.name}</h2>
          <p className="profile-hero__goal">{user.goal} · {user.level}</p>
        </div>
        <button className="edit-btn" onClick={() => { setDraft({ ...user }); setEditing(!editing); }}>
          {editing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {saved && <div className="save-toast">✓ Saved!</div>}

      {/* Lifetime stats */}
      <div className="profile-stats">
        <div className="profile-stat">
          <span className="profile-stat__value">{user.totalWorkouts}</span>
          <span className="profile-stat__label">Workouts</span>
        </div>
        <div className="profile-stat">
          <span className="profile-stat__value">{user.streak}</span>
          <span className="profile-stat__label">Streak</span>
        </div>
        <div className="profile-stat">
          <span className="profile-stat__value">{totalVolume > 0 ? (totalVolume / 1000).toFixed(1) + 'k' : '0'}</span>
          <span className="profile-stat__label">lbs Lifted</span>
        </div>
      </div>

      {!editing ? (
        <>
          {/* Info sections */}
          <div className="settings-section">
            <h3 className="settings-section__title">About You</h3>
            <div className="settings-row">
              <span className="settings-row__label">Goal</span>
              <span className="settings-row__value">{user.goal}</span>
            </div>
            <div className="settings-row">
              <span className="settings-row__label">Level</span>
              <span className="settings-row__value">{user.level}</span>
            </div>
            <div className="settings-row">
              <span className="settings-row__label">Days/Week</span>
              <span className="settings-row__value">{user.daysPerWeek}x</span>
            </div>
            <div className="settings-row">
              <span className="settings-row__label">Weight Unit</span>
              <span className="settings-row__value">{user.weightUnit}</span>
            </div>
          </div>

          <div className="settings-section">
            <h3 className="settings-section__title">Equipment</h3>
            <div className="equipment-tags">
              {(user.equipment || []).map(e => (
                <span key={e} className="equipment-tag">{e}</span>
              ))}
              {(!user.equipment || user.equipment.length === 0) && (
                <span className="settings-row__value">None selected</span>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="edit-form">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="form-input"
              value={draft.name}
              onChange={e => setDraft({ ...draft, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Goal</label>
            <div className="option-grid">
              {GOALS.map(g => (
                <button
                  key={g}
                  className={`option-chip ${draft.goal === g ? 'option-chip--active' : ''}`}
                  onClick={() => setDraft({ ...draft, goal: g })}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Level</label>
            <div className="option-grid">
              {LEVELS.map(l => (
                <button
                  key={l}
                  className={`option-chip ${draft.level === l ? 'option-chip--active' : ''}`}
                  onClick={() => setDraft({ ...draft, level: l })}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Days Per Week: {draft.daysPerWeek}</label>
            <input
              type="range" min="2" max="6"
              value={draft.daysPerWeek}
              onChange={e => setDraft({ ...draft, daysPerWeek: parseInt(e.target.value) })}
              className="range-input"
            />
            <div className="range-labels">
              <span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Weight Unit</label>
            <div className="option-grid">
              {['lbs', 'kg'].map(u => (
                <button
                  key={u}
                  className={`option-chip ${draft.weightUnit === u ? 'option-chip--active' : ''}`}
                  onClick={() => setDraft({ ...draft, weightUnit: u })}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Available Equipment</label>
            <div className="option-grid">
              {EQUIPMENT_OPTIONS.map(e => (
                <button
                  key={e}
                  className={`option-chip ${(draft.equipment || []).includes(e) ? 'option-chip--active' : ''}`}
                  onClick={() => toggleEquipment(e)}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn--primary btn--full" onClick={handleSave}>Save Changes</button>
        </div>
      )}

      {/* AI Coach API Key */}
      <div className="settings-section">
        <h3 className="settings-section__title">AI Coach Settings</h3>
        <p className="settings-section__desc">
          Enter your Anthropic API key to enable the AI Coach powered by Claude.
          Get a key at <span className="link-text">console.anthropic.com</span>
        </p>
        <div className="api-key-row">
          <input
            className="form-input"
            type={apiKeyVisible ? 'text' : 'password'}
            placeholder="sk-ant-..."
            value={apiKeyInput}
            onChange={e => setApiKeyInput(e.target.value)}
          />
          <button className="icon-btn" onClick={() => setApiKeyVisible(!apiKeyVisible)}>
            {apiKeyVisible ? '🙈' : '👁️'}
          </button>
        </div>
        <button className="btn btn--outline btn--full" onClick={handleApiKeySave}>
          Save API Key
        </button>
        {user.anthropicApiKey && (
          <p className="api-key-status">✓ API key configured — AI Coach is active</p>
        )}
      </div>

      <div style={{ height: '24px' }} />
    </div>
  );
}
