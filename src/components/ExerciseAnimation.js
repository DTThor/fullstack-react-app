import React, { useState } from 'react';
import { getExerciseFrameUrls } from '../data/exerciseImages';
import MuscleImage from './MuscleImage';

// Animates between the two JPG frames from free-exercise-db, creating a
// looping motion GIF-like effect via CSS keyframes.
export default function ExerciseAnimation({ exerciseName, muscle }) {
  const [frame0Loaded, setFrame0Loaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const urls = getExerciseFrameUrls(exerciseName);

  // No mapping found or images failed → fall back to static muscle diagram
  if (!urls || failed) {
    return (
      <div className="exercise-anim-fallback">
        <MuscleImage muscle={muscle} />
        <p className="exercise-anim-fallback__label">Muscle focus</p>
      </div>
    );
  }

  return (
    <div className="exercise-anim">
      {/* Loading skeleton */}
      {!frame0Loaded && (
        <div className="exercise-anim__skeleton">
          <span className="exercise-anim__skeleton-text">Loading animation…</span>
        </div>
      )}

      {/* Two-frame stack: frame1 sits below, frame0 animates on top */}
      <div className="exercise-anim__frames" style={{ opacity: frame0Loaded ? 1 : 0 }}>
        {/* Back frame (always visible) */}
        <img
          src={urls.frame1}
          className="exercise-anim__frame exercise-anim__frame--back"
          alt={`${exerciseName} end position`}
          onError={() => setFailed(true)}
        />
        {/* Front frame (animates between visible/hidden) */}
        <img
          src={urls.frame0}
          className="exercise-anim__frame exercise-anim__frame--front"
          alt={`${exerciseName} start position`}
          onLoad={() => setFrame0Loaded(true)}
          onError={() => setFailed(true)}
        />
      </div>
    </div>
  );
}
