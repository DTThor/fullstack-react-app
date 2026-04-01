import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HomeScreen from './components/screens/HomeScreen';
import ProgramsScreen from './components/screens/ProgramsScreen';
import WorkoutScreen from './components/screens/WorkoutScreen';
import ProgressScreen from './components/screens/ProgressScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import BottomNav from './components/BottomNav';
import FloatingCoach from './components/FloatingCoach';
import CoachModal from './components/CoachModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const activeWorkout = useSelector(s => s.workout.active);

  // When a workout is active, always show the workout screen
  const effectiveTab = activeWorkout ? 'workout' : activeTab;

  const renderScreen = () => {
    switch (effectiveTab) {
      case 'home':     return <HomeScreen onNavigate={setActiveTab} />;
      case 'programs': return <ProgramsScreen onNavigate={setActiveTab} />;
      case 'workout':  return <WorkoutScreen onNavigate={setActiveTab} />;
      case 'progress': return <ProgressScreen />;
      case 'profile':  return <ProfileScreen />;
      default:         return <HomeScreen onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="app-shell">
      <div className="screen-container">
        {renderScreen()}
      </div>
      <BottomNav activeTab={effectiveTab} onTabChange={setActiveTab} />
      <FloatingCoach />
      <CoachModal />
    </div>
  );
}
