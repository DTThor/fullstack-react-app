import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveProgram } from '../../store/userSlice';
import { programs } from '../../data/programs';

const FILTERS = ['All', 'Strength', 'Fat Loss', 'Hypertrophy', 'Bodyweight', 'Cardio'];

export default function ProgramsScreen({ onNavigate }) {
  const dispatch = useDispatch();
  const activeProgramId = useSelector(s => s.user.activeProgramId);
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const filtered = filter === 'All' ? programs : programs.filter(p => p.category === filter);

  const handleSelect = (programId) => {
    dispatch(setActiveProgram(programId));
  };

  return (
    <div className="screen">
      <div className="screen-header">
        <h1 className="screen-title">Programs</h1>
        <p className="screen-subtitle">Expert-designed, AI-personalized</p>
      </div>

      {/* Filters */}
      <div className="filter-scroll">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-chip ${filter === f ? 'filter-chip--active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Program cards */}
      <div className="programs-list">
        {filtered.map(program => {
          const isActive = program.id === activeProgramId;
          const isExpanded = expanded === program.id;

          return (
            <div
              key={program.id}
              className={`program-card ${isActive ? 'program-card--active' : ''}`}
              style={{ borderColor: isActive ? program.color : 'transparent' }}
            >
              {/* Card header */}
              <div className="program-card__header" onClick={() => setExpanded(isExpanded ? null : program.id)}>
                <div className="program-card__emoji-wrap" style={{ background: program.color + '22' }}>
                  <span className="program-card__emoji">{program.emoji}</span>
                </div>
                <div className="program-card__info">
                  <div className="program-card__name-row">
                    <h3 className="program-card__name">{program.name}</h3>
                    {isActive && <span className="active-badge">Active</span>}
                  </div>
                  <div className="program-card__tags">
                    {program.tags.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
                <span className="program-card__chevron" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  ▾
                </span>
              </div>

              {/* Meta row */}
              <div className="program-card__meta">
                <span className="meta-item">📅 {program.weeks}w</span>
                <span className="meta-item">⚡ {program.daysPerWeek}x/wk</span>
                <span className="meta-item">🎯 {program.level}</span>
                <span className="meta-item" style={{ color: program.color }}>{program.category}</span>
              </div>

              <p className="program-card__description">{program.description}</p>

              {/* Expanded: day breakdown */}
              {isExpanded && (
                <div className="program-days">
                  {program.days.map((day, i) => (
                    <div key={i} className="program-day">
                      <div className="program-day__header">
                        <span className="program-day__number">Day {i + 1}</span>
                        <span className="program-day__name">{day.name}</span>
                      </div>
                      <p className="program-day__focus">{day.focus}</p>
                      <div className="program-day__exercises">
                        {day.exercises.map((ex, j) => (
                          <span key={j} className="program-day__exercise">{ex.name}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action */}
              <button
                className={`btn btn--full ${isActive ? 'btn--outline' : 'btn--primary'}`}
                style={isActive ? { borderColor: program.color, color: program.color } : {}}
                onClick={() => handleSelect(program.id)}
              >
                {isActive ? '✓ Current Program' : 'Start Program'}
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ height: '24px' }} />
    </div>
  );
}
