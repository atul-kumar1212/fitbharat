import { useState } from 'react';
import { Search } from 'lucide-react';
import { exercises, exerciseCategories, workoutPlans } from '../data/exercises';
import { useUser } from '../context/UserContext';

export default function Exercises() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [activeTab, setActiveTab] = useState('exercises');
  const { user } = useUser();

  const filteredExercises = exercises.filter(ex => {
    const matchesCategory = activeCategory === 'All' || ex.category === activeCategory;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.muscles.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const currentPlan = user.experience === 'beginner' ? workoutPlans.beginner : workoutPlans.intermediate;

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-title">
          <span className="page-header-greeting">💪 Train Hard</span>
          <span className="page-header-name">Exercises</span>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="tab-bar">
        <div
          className={`tab-item ${activeTab === 'exercises' ? 'active' : ''}`}
          onClick={() => setActiveTab('exercises')}
        >
          🏋️ Exercises
        </div>
        <div
          className={`tab-item ${activeTab === 'plans' ? 'active' : ''}`}
          onClick={() => setActiveTab('plans')}
        >
          📋 Workout Plans
        </div>
        <div
          className={`tab-item ${activeTab === 'timer' ? 'active' : ''}`}
          onClick={() => setActiveTab('timer')}
        >
          ⏱️ Timer
        </div>
      </div>

      {activeTab === 'exercises' && (
        <>
          {/* Search Bar */}
          <div className="search-bar">
            <Search size={18} />
            <input
              placeholder="Search exercises or muscles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Pills */}
          <div className="category-scroll">
            {exerciseCategories.map(cat => (
              <button
                key={cat}
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Exercise List */}
          <div style={{ marginTop: '8px' }}>
            <div className="section-header">
              <span className="section-title">{activeCategory === 'All' ? 'All' : activeCategory} Exercises</span>
              <span className="badge badge-primary">{filteredExercises.length} found</span>
            </div>

            {filteredExercises.map(exercise => (
              <div
                key={exercise.id}
                className="exercise-card"
                onClick={() => setSelectedExercise(exercise)}
              >
                <div className="exercise-thumbnail">{exercise.emoji}</div>
                <div className="exercise-info">
                  <div className="exercise-name">{exercise.name}</div>
                  <div className="exercise-meta">
                    <span>{exercise.sets} sets × {exercise.reps}</span>
                    <span>•</span>
                    <span>🔥 {exercise.calories} cal</span>
                  </div>
                  <div className="exercise-muscles">
                    {exercise.muscles.slice(0, 3).map(m => (
                      <span key={m} className="badge badge-accent">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {filteredExercises.length === 0 && (
              <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-tertiary)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔍</div>
                <p>No exercises found. Try a different search.</p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'plans' && (
        <WorkoutPlansTab plan={currentPlan} exercises={exercises} />
      )}

      {activeTab === 'timer' && (
        <WorkoutTimer />
      )}

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="modal-overlay" onClick={() => setSelectedExercise(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '4rem', marginBottom: '12px' }}>{selectedExercise.emoji}</div>
              <h2 className="heading-lg">{selectedExercise.name}</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '8px' }}>
                <span className="badge badge-primary">{selectedExercise.category}</span>
                <span className="badge badge-accent">{selectedExercise.difficulty}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
              <div className="stat-card" style={{ textAlign: 'center' }}>
                <div className="stat-value" style={{ fontSize: '1.2rem', color: 'var(--primary-400)' }}>{selectedExercise.sets}</div>
                <div className="stat-label">Sets</div>
              </div>
              <div className="stat-card" style={{ textAlign: 'center' }}>
                <div className="stat-value" style={{ fontSize: '1.2rem', color: 'var(--accent-400)' }}>{selectedExercise.reps}</div>
                <div className="stat-label">Reps</div>
              </div>
              <div className="stat-card" style={{ textAlign: 'center' }}>
                <div className="stat-value" style={{ fontSize: '1.2rem', color: 'var(--success-400)' }}>{selectedExercise.rest}</div>
                <div className="stat-label">Rest</div>
              </div>
            </div>

            {/* Muscles */}
            <div style={{ marginBottom: '20px' }}>
              <h4 className="heading-sm" style={{ marginBottom: '8px' }}>Target Muscles</h4>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {selectedExercise.muscles.map(m => (
                  <span key={m} className="badge badge-primary">{m}</span>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div style={{ marginBottom: '20px' }}>
              <h4 className="heading-sm" style={{ marginBottom: '12px' }}>Instructions</h4>
              {selectedExercise.instructions.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '10px', alignItems: 'flex-start' }}>
                  <div style={{
                    minWidth: '28px', height: '28px', borderRadius: '50%',
                    background: 'rgba(249,115,22,0.15)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-400)'
                  }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', paddingTop: '3px' }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>

            {/* Pro Tips */}
            <div style={{
              padding: '16px', borderRadius: 'var(--radius-md)',
              background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)',
              marginBottom: '20px'
            }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--success-400)', marginBottom: '6px' }}>
                💡 Pro Tip
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {selectedExercise.tips}
              </p>
            </div>

            <button className="btn btn-primary btn-full" onClick={() => setSelectedExercise(null)}>
              Got it! 💪
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function WorkoutPlansTab({ plan, exercises: allExercises }) {
  const [expandedDay, setExpandedDay] = useState(null);

  const getExercise = (id) => allExercises.find(e => e.id === id);

  return (
    <div>
      <div className="card" style={{
        marginBottom: 'var(--space-lg)',
        background: 'linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(6,182,212,0.08) 100%)',
      }}>
        <h3 className="heading-md">{plan.name}</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '8px 0' }}>
          {plan.description}
        </p>
        <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
          <span className="badge badge-primary">⏱ {plan.duration}</span>
          <span className="badge badge-accent">📅 {plan.daysPerWeek} days/week</span>
        </div>
      </div>

      {plan.schedule.map((day, i) => (
        <div key={i} className="workout-day">
          <div
            className="card"
            style={{ cursor: 'pointer', marginBottom: '8px' }}
            onClick={() => setExpandedDay(expandedDay === i ? null : i)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div className="day-label">{day.day}</div>
                <div style={{ fontWeight: 600 }}>{day.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                  {day.exercises.length} exercises
                </div>
              </div>
              <span style={{
                fontSize: '1.2rem',
                transition: 'transform 0.3s ease',
                transform: expandedDay === i ? 'rotate(180deg)' : 'rotate(0deg)'
              }}>
                ▼
              </span>
            </div>
          </div>

          {expandedDay === i && (
            <div style={{ padding: '0 8px', animation: 'slideUp 0.3s ease' }}>
              {day.exercises.map((ex, j) => {
                const exercise = getExercise(ex.exerciseId);
                if (!exercise) return null;
                return (
                  <div key={j} className="set-row">
                    <div className="set-number">{j + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>
                        {exercise.emoji} {exercise.name}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--primary-400)', fontWeight: 600 }}>
                      {ex.sets} × {ex.reps}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function WorkoutTimer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [restTimer, setRestTimer] = useState(60);
  const [isResting, setIsResting] = useState(false);
  const [restIntervalId, setRestIntervalId] = useState(null);

  const startTimer = () => {
    if (!isRunning) {
      const id = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
      setIntervalId(id);
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setTime(0);
    setIsRunning(false);
  };

  const startRest = (seconds) => {
    if (restIntervalId) clearInterval(restIntervalId);
    setRestTimer(seconds);
    setIsResting(true);
    const id = setInterval(() => {
      setRestTimer(prev => {
        if (prev <= 1) {
          clearInterval(id);
          setIsResting(false);
          return seconds;
        }
        return prev - 1;
      });
    }, 1000);
    setRestIntervalId(id);
  };

  const formatTime = (s) => {
    const mins = Math.floor(s / 60).toString().padStart(2, '0');
    const secs = (s % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div>
      {/* Workout Timer */}
      <div className="timer-display">
        <div className="timer-circle">
          <div className="timer-time">{formatTime(time)}</div>
          <div className="timer-label">Workout Time</div>
        </div>

        <div className="timer-controls">
          {!isRunning ? (
            <button className="btn btn-primary btn-lg" onClick={startTimer}>
              ▶ Start
            </button>
          ) : (
            <button className="btn btn-secondary btn-lg" onClick={pauseTimer}>
              ⏸ Pause
            </button>
          )}
          <button className="btn btn-ghost btn-lg" onClick={resetTimer}>
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Rest Timer */}
      <div className="section-header">
        <span className="section-title">⏱ Rest Timer</span>
      </div>

      {isResting && (
        <div className="card" style={{
          textAlign: 'center', padding: '24px', marginBottom: '16px',
          border: '2px solid var(--primary-500)'
        }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-400)', fontFamily: 'var(--font-primary)' }}>
            {restTimer}s
          </div>
          <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Rest remaining</div>
          <button
            className="btn btn-ghost"
            onClick={() => {
              clearInterval(restIntervalId);
              setIsResting(false);
            }}
            style={{ marginTop: '12px' }}
          >
            Skip Rest →
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {[30, 60, 90, 120, 150, 180].map(s => (
          <button
            key={s}
            className="btn btn-secondary"
            onClick={() => startRest(s)}
            style={{ flexDirection: 'column', padding: '16px' }}
          >
            <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{s}s</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
              {s < 60 ? `${s} sec` : `${s / 60} min`}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
