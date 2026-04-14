import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Sun, Moon, LogOut, Crown } from 'lucide-react';

export default function Profile() {
  const { user, updateUser, getBMI, getBMICategory, getBMR } = useUser();
  const { logout, authUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ ...user });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const bmi = getBMI();
  const bmiCat = getBMICategory(bmi);
  const bmr = getBMR();

  const handleSave = () => {
    updateUser({
      name: editForm.name,
      age: parseInt(editForm.age) || user.age,
      weight: parseInt(editForm.weight) || user.weight,
      height: parseInt(editForm.height) || user.height,
      gender: editForm.gender,
      goal: editForm.goal,
    });
    setEditMode(false);
  };

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { icon: '📊', label: 'BMI Calculator', sub: `Current: ${bmi}`, color: '#f97316', action: () => setActiveTab('bmi') },
    { icon: '🍛', label: 'Diet Plans', sub: 'Indian diet & nutrition', color: '#06b6d4', action: () => navigate('/diet') },
    { icon: '🎯', label: 'Fitness Goal', sub: user.goal === 'muscleGain' ? 'Muscle Gain' : user.goal === 'weightLoss' ? 'Weight Loss' : 'Stay Fit', color: '#22c55e', action: () => setEditMode(true) },
    { icon: '✏️', label: 'Edit Profile', sub: 'Update your details', color: '#8b5cf6', action: () => setEditMode(true) },
    { icon: '📈', label: 'Workout History', sub: `${user.totalWorkouts} workouts done`, color: '#ec4899', action: () => setActiveTab('history') },
    { icon: '👑', label: 'Upgrade Plan', sub: 'Get premium features', color: '#f59e0b', action: () => navigate('/plans') },
  ];

  if (activeTab === 'bmi') {
    return <BMICalculator user={user} bmi={bmi} bmiCat={bmiCat} bmr={bmr} onBack={() => setActiveTab('profile')} />;
  }

  if (activeTab === 'history') {
    return <WorkoutHistory user={user} onBack={() => setActiveTab('profile')} />;
  }

  return (
    <div className="page-content">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="profile-name">{user.name}</div>
        <div className="profile-bio">
          {authUser?.email && (
            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
              {authUser.email}
            </span>
          )}
          {user.goal === 'muscleGain' ? '💪 Building Muscle' :
            user.goal === 'weightLoss' ? '🔥 Losing Weight' :
              user.goal === 'flexibility' ? '🧘 Improving Flexibility' : '🏃 Staying Fit'
          } • {user.experience === 'beginner' ? '🌱 Beginner' :
            user.experience === 'intermediate' ? '🔥 Intermediate' : '⚡ Advanced'
          }
        </div>

        <div className="profile-stats">
          <div className="profile-stat">
            <div className="profile-stat-value">{user.totalWorkouts}</div>
            <div className="profile-stat-label">Workouts</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-value">{user.streak}</div>
            <div className="profile-stat-label">Day Streak</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-value">{bmi}</div>
            <div className="profile-stat-label">BMI</div>
          </div>
        </div>
      </div>

      {/* Body Stats */}
      <div className="section-header">
        <span className="section-title">Body Stats</span>
      </div>
      <div className="stats-grid" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="stat-card">
          <div style={{ fontSize: '1.2rem' }}>⚖️</div>
          <div className="stat-value" style={{ color: 'var(--primary-400)' }}>{user.weight}<span style={{ fontSize: '0.8rem' }}>kg</span></div>
          <div className="stat-label">Weight</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '1.2rem' }}>📏</div>
          <div className="stat-value" style={{ color: 'var(--accent-400)' }}>{user.height}<span style={{ fontSize: '0.8rem' }}>cm</span></div>
          <div className="stat-label">Height</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '1.2rem' }}>🎂</div>
          <div className="stat-value" style={{ color: 'var(--success-400)' }}>{user.age}<span style={{ fontSize: '0.8rem' }}>yrs</span></div>
          <div className="stat-label">Age</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '1.2rem' }}>⚡</div>
          <div className="stat-value" style={{ color: '#a78bfa' }}>{bmr}<span style={{ fontSize: '0.8rem' }}>cal</span></div>
          <div className="stat-label">BMR</div>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="section-header">
        <span className="section-title">Appearance</span>
      </div>
      <div className="card" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 'var(--space-lg)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {theme === 'dark' ? <Moon size={20} color="var(--accent-400)" /> : <Sun size={20} color="var(--primary-400)" />}
          <div>
            <div style={{ fontWeight: 500 }}>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
              {theme === 'dark' ? 'Easy on the eyes' : 'Bright and clear'}
            </div>
          </div>
        </div>
        <div className={`theme-toggle ${theme === 'light' ? 'active' : ''}`} onClick={toggleTheme} />
      </div>

      {/* Menu Items */}
      <div className="section-header">
        <span className="section-title">Settings</span>
      </div>
      <div className="menu-list">
        {menuItems.map((item, i) => (
          <div key={i} className="menu-item" onClick={item.action}>
            <div className="menu-icon" style={{ background: item.color }}>
              {item.icon}
            </div>
            <div className="menu-text">
              <div className="menu-title">{item.label}</div>
              <div className="menu-subtitle">{item.sub}</div>
            </div>
            <ChevronRight size={18} color="var(--text-tertiary)" />
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div style={{ marginTop: 'var(--space-xl)' }}>
        <button
          className="btn btn-full logout-btn"
          onClick={() => setShowLogoutConfirm(true)}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* App Info */}
      <div style={{
        textAlign: 'center', padding: 'var(--space-xl) 0',
        color: 'var(--text-tertiary)', fontSize: '0.8rem'
      }}>
        <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>🏋️‍♂️</div>
        <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>FitBharat v1.0</div>
        <div>Made with ❤️ in India 🇮🇳</div>
      </div>

      {/* Logout Confirm Modal */}
      {showLogoutConfirm && (
        <div className="modal-overlay" onClick={() => setShowLogoutConfirm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ textAlign: 'center' }}>
            <div className="modal-handle" />
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>👋</div>
            <h2 className="heading-lg" style={{ marginBottom: '8px' }}>Logout?</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Are you sure you want to logout? Your data will be saved locally.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-secondary btn-full" onClick={() => setShowLogoutConfirm(false)}>
                Cancel
              </button>
              <button className="btn btn-full logout-btn" onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editMode && (
        <div className="modal-overlay" onClick={() => setEditMode(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <h2 className="heading-lg" style={{ marginBottom: '24px' }}>Edit Profile</h2>

            <div className="input-group" style={{ marginBottom: '16px' }}>
              <label>Name</label>
              <input className="input-field" value={editForm.name}
                onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div className="input-group">
                <label>Age</label>
                <input className="input-field" type="number" value={editForm.age}
                  onChange={e => setEditForm({ ...editForm, age: e.target.value })} />
              </div>
              <div className="input-group">
                <label>Gender</label>
                <select className="input-field" value={editForm.gender}
                  onChange={e => setEditForm({ ...editForm, gender: e.target.value })}
                  style={{ color: 'var(--text-primary)', cursor: 'pointer' }}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div className="input-group">
                <label>Weight (kg)</label>
                <input className="input-field" type="number" value={editForm.weight}
                  onChange={e => setEditForm({ ...editForm, weight: e.target.value })} />
              </div>
              <div className="input-group">
                <label>Height (cm)</label>
                <input className="input-field" type="number" value={editForm.height}
                  onChange={e => setEditForm({ ...editForm, height: e.target.value })} />
              </div>
            </div>

            <div className="input-group" style={{ marginBottom: '24px' }}>
              <label>Fitness Goal</label>
              <select className="input-field" value={editForm.goal}
                onChange={e => setEditForm({ ...editForm, goal: e.target.value })}
                style={{ color: 'var(--text-primary)', cursor: 'pointer' }}>
                <option value="muscleGain">💪 Muscle Gain</option>
                <option value="weightLoss">🔥 Weight Loss</option>
                <option value="fitness">🏃 Stay Fit</option>
                <option value="flexibility">🧘 Flexibility</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-secondary btn-full" onClick={() => setEditMode(false)}>
                Cancel
              </button>
              <button className="btn btn-primary btn-full" onClick={handleSave}>
                Save ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BMICalculator({ user, bmi, bmiCat, bmr, onBack }) {
  const bmiPercent = Math.min(Math.max(((parseFloat(bmi) - 10) / 30) * 100, 0), 100);

  const tdee = {
    sedentary: Math.round(bmr * 1.2),
    light: Math.round(bmr * 1.375),
    moderate: Math.round(bmr * 1.55),
    active: Math.round(bmr * 1.725),
    veryActive: Math.round(bmr * 1.9),
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <button className="btn btn-ghost" onClick={onBack}>← Back</button>
        <span className="heading-sm">BMI Calculator</span>
        <div style={{ width: '60px' }} />
      </div>

      <div className="bmi-result">
        <div className="bmi-value" style={{ color: bmiCat.color }}>{bmi}</div>
        <div className="bmi-category" style={{ color: bmiCat.color }}>{bmiCat.label}</div>
        <div className="bmi-bar">
          <div className="bmi-marker" style={{ left: `${bmiPercent}%` }} />
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '8px'
        }}>
          <span>Underweight</span>
          <span>Normal</span>
          <span>Overweight</span>
          <span>Obese</span>
        </div>
      </div>

      {/* BMR & TDEE */}
      <div style={{ marginTop: 'var(--space-xl)' }}>
        <div className="section-header">
          <span className="section-title">⚡ Daily Calorie Needs (TDEE)</span>
        </div>
        <div className="card" style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontWeight: 500 }}>Base Metabolic Rate (BMR)</span>
            <span style={{ fontWeight: 700, color: 'var(--primary-400)' }}>{bmr} kcal</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
            Calories your body burns at rest
          </p>
        </div>

        {Object.entries(tdee).map(([level, cal]) => (
          <div key={level} className="card" style={{ marginBottom: '8px', padding: '12px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: '0.9rem', textTransform: 'capitalize' }}>
                  {level === 'veryActive' ? 'Very Active' : level}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                  {level === 'sedentary' ? 'Little/no exercise' :
                    level === 'light' ? 'Light exercise 1-3 days/week' :
                      level === 'moderate' ? 'Moderate exercise 3-5 days/week' :
                        level === 'active' ? 'Hard exercise 6-7 days/week' :
                          'Very hard exercise + physical job'}
                </div>
              </div>
              <span style={{ fontWeight: 700, color: 'var(--accent-400)', fontSize: '0.95rem' }}>
                {cal} kcal
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Indian BMI Note */}
      <div style={{
        marginTop: 'var(--space-lg)', padding: '16px',
        background: 'rgba(249,115,22,0.08)', borderRadius: 'var(--radius-md)',
        border: '1px solid rgba(249,115,22,0.2)'
      }}>
        <h4 style={{ fontSize: '0.9rem', color: 'var(--primary-400)', marginBottom: '6px' }}>
          🇮🇳 Note for Indians
        </h4>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          For South Asians, a healthy BMI range is <strong>18.5 - 23.0</strong> (lower than the international 25 cutoff). 
          Indians have higher body fat percentage at the same BMI compared to Western populations.
        </p>
      </div>
    </div>
  );
}

function WorkoutHistory({ user, onBack }) {
  const recentWorkouts = [
    { date: 'Today', type: 'Push Day', duration: '55 min', calories: 320, exercises: 5 },
    { date: 'Yesterday', type: 'Pull Day', duration: '48 min', calories: 290, exercises: 4 },
    { date: '2 days ago', type: 'Leg Day', duration: '62 min', calories: 380, exercises: 6 },
    { date: '3 days ago', type: 'Yoga & Core', duration: '40 min', calories: 180, exercises: 4 },
    { date: '4 days ago', type: 'Push Day', duration: '50 min', calories: 310, exercises: 5 },
    { date: '5 days ago', type: 'Cardio + HIIT', duration: '35 min', calories: 400, exercises: 3 },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <button className="btn btn-ghost" onClick={onBack}>← Back</button>
        <span className="heading-sm">Workout History</span>
        <div style={{ width: '60px' }} />
      </div>

      <div className="streak-card" style={{ marginBottom: 'var(--space-lg)' }}>
        <div className="streak-fire">🏆</div>
        <div>
          <div className="streak-number">{user.totalWorkouts}</div>
          <div className="streak-text">Total Workouts Completed</div>
        </div>
      </div>

      <div className="section-header">
        <span className="section-title">Recent Activity</span>
      </div>

      {recentWorkouts.map((w, i) => (
        <div key={i} className="card" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
            background: `rgba(249,115,22,${0.15 - i * 0.02})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.3rem', flexShrink: 0
          }}>
            {i === 0 ? '🔥' : i === 1 ? '💪' : i === 2 ? '🦵' : i === 3 ? '🧘' : '🏋️'}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{w.type}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', gap: '12px', marginTop: '2px', flexWrap: 'wrap' }}>
              <span>⏱ {w.duration}</span>
              <span>🔥 {w.calories} cal</span>
              <span>💪 {w.exercises} ex</span>
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textAlign: 'right' }}>
            {w.date}
          </div>
        </div>
      ))}
    </div>
  );
}
