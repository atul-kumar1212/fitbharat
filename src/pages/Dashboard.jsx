import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const quickActions = [
  { emoji: '🏋️', label: 'Workout', path: '/exercises' },
  { emoji: '🍛', label: 'Diet Plan', path: '/diet' },
  { emoji: '🤖', label: 'AI Coach', path: '/ai' },
  { emoji: '📊', label: 'Progress', path: '/profile' },
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Dashboard() {
  const { user, addWater, removeWater, getBMI, getBMICategory, getBMR } = useUser();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const bmi = getBMI();
  const bmiCat = getBMICategory(bmi);
  const bmr = getBMR();
  const today = new Date();
  const dayOfWeek = today.getDay();
  const hour = today.getHours();

  const getGreeting = () => {
    if (hour < 12) return '🌅 Good Morning';
    if (hour < 17) return '☀️ Good Afternoon';
    return '🌙 Good Evening';
  };

  const caloriesBurned = Math.round(user.totalWorkouts * 280);
  const waterPercent = Math.round((user.waterGlasses / 8) * 100);

  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-title">
          <span className="page-header-greeting">{getGreeting()}</span>
          <span className="page-header-name">{user.name} 🇮🇳</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={toggleTheme}
            style={{
              width: '40px', height: '40px', borderRadius: 'var(--radius-full)',
              background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'var(--text-primary)',
              transition: 'all var(--transition-base)'
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="avatar" onClick={() => navigate('/profile')}>
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Streak Card */}
      <div className="streak-card">
        <div className="streak-fire">🔥</div>
        <div>
          <div className="streak-number">{user.streak}</div>
          <div className="streak-text">Day Streak — Keep it up!</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        {quickActions.map((action, i) => (
          <div key={i} className="quick-action" onClick={() => navigate(action.path)}>
            <div
              className="quick-action-icon"
              style={{
                background: [
                  'rgba(249,115,22,0.15)', 'rgba(6,182,212,0.15)',
                  'rgba(34,197,94,0.15)', 'rgba(168,85,247,0.15)'
                ][i]
              }}
            >
              {action.emoji}
            </div>
            <span className="quick-action-label">{action.label}</span>
          </div>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="section-header">
        <span className="section-title">Today's Overview</span>
        <span className="section-link">
          {today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
        </span>
      </div>

      <div className="stats-grid" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(249,115,22,0.15)' }}>🔥</div>
          <div className="stat-value" style={{ color: 'var(--primary-400)' }}>{caloriesBurned}</div>
          <div className="stat-label">Calories Burned</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(6,182,212,0.15)' }}>🏋️</div>
          <div className="stat-value" style={{ color: 'var(--accent-400)' }}>{user.totalWorkouts}</div>
          <div className="stat-label">Total Workouts</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(34,197,94,0.15)' }}>📏</div>
          <div className="stat-value" style={{ color: 'var(--success-400)' }}>{bmi}</div>
          <div className="stat-label">BMI - {bmiCat.label}</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(168,85,247,0.15)' }}>⚡</div>
          <div className="stat-value" style={{ color: '#a78bfa' }}>{bmr}</div>
          <div className="stat-label">BMR (kcal/day)</div>
        </div>
      </div>

      {/* Water Tracker */}
      <div className="section-header">
        <span className="section-title">💧 Water Intake</span>
        <span className="badge badge-accent">{user.waterGlasses}/8 glasses</span>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
        <div style={{
          width: '100%', height: '8px', background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-full)', marginBottom: '16px', overflow: 'hidden'
        }}>
          <div style={{
            width: `${waterPercent}%`, height: '100%',
            background: 'linear-gradient(90deg, var(--accent-400), var(--accent-500))',
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.5s ease'
          }} />
        </div>
        <div className="water-glasses">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className={`water-glass ${i < user.waterGlasses ? 'filled' : ''}`}
              onClick={() => i < user.waterGlasses ? removeWater() : addWater()}
            >
              <span className="water-glass-icon">
                {i < user.waterGlasses ? '💧' : '🫗'}
              </span>
              <span className="water-glass-label">
                {(i + 1) * 250}ml
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="section-header">
        <span className="section-title">📅 This Week</span>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {weekDays.map((day, i) => {
            const isToday = i === (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
            const isPast = i < (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
            const isActive = isPast || isToday;
            return (
              <div key={day} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
              }}>
                <span style={{
                  fontSize: '0.75rem', color: isToday ? 'var(--primary-400)' : 'var(--text-tertiary)',
                  fontWeight: isToday ? 700 : 400
                }}>
                  {day}
                </span>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: isActive ? (isToday ? 'var(--primary-500)' : 'rgba(249,115,22,0.2)') : 'var(--bg-tertiary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isActive ? (isToday ? 'white' : 'var(--primary-400)') : 'var(--text-tertiary)',
                  fontSize: '0.85rem', fontWeight: 600,
                  border: isToday ? '2px solid var(--primary-400)' : 'none',
                  transition: 'all var(--transition-base)'
                }}>
                  {isActive ? '✓' : '·'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's Tip */}
      <div className="section-header">
        <span className="section-title">💡 Daily Tip</span>
      </div>
      <div className="card-gradient" style={{
        padding: 'var(--space-lg)', borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(6,182,212,0.08) 100%)',
        border: '1px solid var(--border-color)'
      }}>
        <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
          🥛 <strong style={{ color: 'var(--text-primary)' }}>Haldi Doodh</strong> (Turmeric Milk) 
          before bed boosts immunity, reduces inflammation, and helps with muscle recovery. 
          A glass of warm milk with a pinch of turmeric and honey — the best Indian supplement! 🇮🇳
        </p>
      </div>
    </div>
  );
}
