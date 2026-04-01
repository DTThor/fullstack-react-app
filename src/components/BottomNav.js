import React from 'react';
import { useSelector } from 'react-redux';

const tabs = [
  {
    id: 'home',
    label: 'Home',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'programs',
    label: 'Programs',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: 'workout',
    label: 'Workout',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'progress',
    label: 'Progress',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

export default function BottomNav({ activeTab, onTabChange }) {
  const activeWorkout = useSelector(s => s.workout.active);

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        const isWorkout = tab.id === 'workout';
        return (
          <button
            key={tab.id}
            className={`nav-tab ${isActive ? 'nav-tab--active' : ''} ${isWorkout && activeWorkout ? 'nav-tab--workout-active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="nav-tab__icon">{tab.icon(isActive)}</span>
            <span className="nav-tab__label">{tab.label}</span>
            {isWorkout && activeWorkout && <span className="nav-tab__dot" />}
          </button>
        );
      })}
    </nav>
  );
}
