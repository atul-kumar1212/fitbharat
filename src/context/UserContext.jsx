import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const defaultUser = {
  name: 'Fitness Enthusiast',
  age: 25,
  weight: 70,
  height: 170,
  gender: 'male',
  goal: 'muscleGain',
  experience: 'beginner',
  streak: 7,
  totalWorkouts: 42,
  joinDate: '2025-12-01',
  waterGlasses: 0,
  dailySteps: 0,
  workoutHistory: [],
  completedExercises: [],
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fitbharat-user');
    if (saved) {
      try {
        return { ...defaultUser, ...JSON.parse(saved) };
      } catch {
        return defaultUser;
      }
    }
    return defaultUser;
  });

  const [isOnboarded, setIsOnboarded] = useState(() => {
    return localStorage.getItem('fitbharat-onboarded') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('fitbharat-user', JSON.stringify(user));
  }, [user]);

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const completeOnboarding = (data) => {
    setUser(prev => ({ ...prev, ...data }));
    setIsOnboarded(true);
    localStorage.setItem('fitbharat-onboarded', 'true');
  };

  const addWater = () => {
    setUser(prev => ({ ...prev, waterGlasses: Math.min(prev.waterGlasses + 1, 8) }));
  };

  const removeWater = () => {
    setUser(prev => ({ ...prev, waterGlasses: Math.max(prev.waterGlasses - 1, 0) }));
  };

  const logWorkout = (workout) => {
    setUser(prev => ({
      ...prev,
      totalWorkouts: prev.totalWorkouts + 1,
      streak: prev.streak + 1,
      workoutHistory: [...prev.workoutHistory, { ...workout, date: new Date().toISOString() }]
    }));
  };

  const getBMI = () => {
    const heightM = user.height / 100;
    return (user.weight / (heightM * heightM)).toFixed(1);
  };

  const getBMICategory = (bmi) => {
    const val = parseFloat(bmi);
    if (val < 18.5) return { label: 'Underweight', color: 'var(--accent-400)' };
    if (val < 25) return { label: 'Normal', color: 'var(--success-400)' };
    if (val < 30) return { label: 'Overweight', color: 'var(--warning-400)' };
    return { label: 'Obese', color: 'var(--danger-400)' };
  };

  const getBMR = () => {
    if (user.gender === 'male') {
      return Math.round(88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * user.age));
    }
    return Math.round(447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * user.age));
  };

  return (
    <UserContext.Provider value={{
      user, updateUser, isOnboarded, completeOnboarding,
      addWater, removeWater, logWorkout, getBMI, getBMICategory, getBMR
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
