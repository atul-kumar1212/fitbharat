import { useState } from 'react';
import { useUser } from '../context/UserContext';

const steps = [
  { title: 'Welcome', subtitle: 'Your fitness journey starts here' },
  { title: 'About You', subtitle: 'Tell us about yourself' },
  { title: 'Your Goal', subtitle: 'What do you want to achieve?' },
  { title: 'Experience', subtitle: 'How experienced are you?' },
];

const goals = [
  { id: 'muscleGain', emoji: '💪', label: 'Build Muscle', desc: 'Gain strength & size' },
  { id: 'weightLoss', emoji: '🔥', label: 'Lose Weight', desc: 'Burn fat & get lean' },
  { id: 'fitness', emoji: '🏃', label: 'Stay Fit', desc: 'General health & fitness' },
  { id: 'flexibility', emoji: '🧘', label: 'Flexibility', desc: 'Yoga & stretching' },
];

const levels = [
  { id: 'beginner', emoji: '🌱', label: 'Beginner', desc: 'New to fitness (0-6 months)' },
  { id: 'intermediate', emoji: '🔥', label: 'Intermediate', desc: 'Regular training (6-24 months)' },
  { id: 'advanced', emoji: '⚡', label: 'Advanced', desc: 'Experienced (2+ years)' },
];

export default function Onboarding() {
  const { completeOnboarding } = useUser();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    goal: '',
    experience: '',
  });

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      completeOnboarding({
        name: form.name || 'Fitness Enthusiast',
        age: parseInt(form.age) || 25,
        weight: parseInt(form.weight) || 70,
        height: parseInt(form.height) || 170,
        gender: form.gender,
        goal: form.goal || 'muscleGain',
        experience: form.experience || 'beginner',
      });
    }
  };

  const canProceed = () => {
    if (step === 1) return form.name && form.age && form.weight && form.height;
    if (step === 2) return form.goal;
    if (step === 3) return form.experience;
    return true;
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-steps">
        {steps.map((_, i) => (
          <div key={i} className={`onboarding-step ${i <= step ? 'active' : ''}`} />
        ))}
      </div>

      <div className="onboarding-hero">
        {step === 0 && (
          <>
            <div className="onboarding-icon">🏋️‍♂️</div>
            <h1 className="onboarding-title">
              Fit<span className="text-gradient">Bharat</span>
            </h1>
            <p className="onboarding-subtitle">
              Your AI-powered fitness companion designed for India. 
              Workouts, Indian diet plans, and smart coaching — all in one app. 🇮🇳
            </p>
          </>
        )}

        {step === 1 && (
          <div style={{ width: '100%', maxWidth: '340px' }}>
            <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: '24px' }}>
              Tell us about yourself
            </h2>
            <div className="input-group" style={{ marginBottom: '16px' }}>
              <label>Your Name</label>
              <input
                className="input-field"
                placeholder="Enter your name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div className="input-group">
                <label>Age</label>
                <input
                  className="input-field"
                  type="number"
                  placeholder="25"
                  value={form.age}
                  onChange={e => setForm({ ...form, age: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Gender</label>
                <select
                  className="input-field"
                  value={form.gender}
                  onChange={e => setForm({ ...form, gender: e.target.value })}
                  style={{ color: 'var(--text-primary)', cursor: 'pointer' }}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="input-group">
                <label>Weight (kg)</label>
                <input
                  className="input-field"
                  type="number"
                  placeholder="70"
                  value={form.weight}
                  onChange={e => setForm({ ...form, weight: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Height (cm)</label>
                <input
                  className="input-field"
                  type="number"
                  placeholder="170"
                  value={form.height}
                  onChange={e => setForm({ ...form, height: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ width: '100%', maxWidth: '340px' }}>
            <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: '24px' }}>
              What's your goal? 🎯
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {goals.map(g => (
                <div
                  key={g.id}
                  className="card"
                  onClick={() => setForm({ ...form, goal: g.id })}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    borderColor: form.goal === g.id ? 'var(--primary-500)' : undefined,
                    background: form.goal === g.id ? 'rgba(249,115,22,0.1)' : undefined,
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>{g.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{g.label}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{g.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ width: '100%', maxWidth: '340px' }}>
            <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: '24px' }}>
              Your experience level
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {levels.map(l => (
                <div
                  key={l.id}
                  className="card"
                  onClick={() => setForm({ ...form, experience: l.id })}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    borderColor: form.experience === l.id ? 'var(--primary-500)' : undefined,
                    background: form.experience === l.id ? 'rgba(249,115,22,0.1)' : undefined,
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>{l.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{l.label}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{l.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '0 0 24px' }}>
        <button
          className="btn btn-primary btn-full btn-lg"
          onClick={handleNext}
          disabled={!canProceed()}
          style={{ opacity: canProceed() ? 1 : 0.5 }}
        >
          {step === steps.length - 1 ? "Let's Go! 🚀" : 'Continue →'}
        </button>
        {step > 0 && (
          <button
            className="btn btn-ghost btn-full"
            onClick={() => setStep(step - 1)}
            style={{ marginTop: '8px' }}
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
