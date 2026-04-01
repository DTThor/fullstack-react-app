import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openCoach } from '../store/coachSlice';

export default function FloatingCoach() {
  const dispatch = useDispatch();
  const open = useSelector(s => s.coach.open);

  if (open) return null;

  return (
    <button className="floating-coach" onClick={() => dispatch(openCoach())} aria-label="Talk to AI Coach">
      <span className="floating-coach__icon">🤖</span>
      <span className="floating-coach__label">Coach</span>
    </button>
  );
}
