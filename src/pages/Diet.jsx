import { useState } from 'react';
import { dietPlans, nutritionTips } from '../data/diet';
import { useUser } from '../context/UserContext';

export default function Diet() {
  const { user } = useUser();
  const [activePlan, setActivePlan] = useState(
    user.goal === 'weightLoss' ? 'weightLoss' : user.goal === 'flexibility' ? 'vegetarian' : 'muscleGain'
  );
  const [activeTab, setActiveTab] = useState('meals');
  const [tipIndex, setTipIndex] = useState(0);

  const plan = dietPlans[activePlan];

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % nutritionTips.length);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-title">
          <span className="page-header-greeting">🍛 Eat Right</span>
          <span className="page-header-name">Diet Plans</span>
        </div>
      </div>

      {/* Diet Plan Selector */}
      <div className="category-scroll" style={{ marginBottom: '8px' }}>
        {Object.entries(dietPlans).map(([key, p]) => (
          <button
            key={key}
            className={`category-pill ${activePlan === key ? 'active' : ''}`}
            onClick={() => setActivePlan(key)}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="tab-bar">
        <div
          className={`tab-item ${activeTab === 'meals' ? 'active' : ''}`}
          onClick={() => setActiveTab('meals')}
        >
          🍽️ Meals
        </div>
        <div
          className={`tab-item ${activeTab === 'macros' ? 'active' : ''}`}
          onClick={() => setActiveTab('macros')}
        >
          📊 Macros
        </div>
        <div
          className={`tab-item ${activeTab === 'tips' ? 'active' : ''}`}
          onClick={() => setActiveTab('tips')}
        >
          💡 Tips
        </div>
      </div>

      {activeTab === 'meals' && (
        <>
          {/* Daily Macro Summary */}
          <div className="card" style={{
            marginBottom: 'var(--space-lg)',
            background: 'linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(6,182,212,0.08) 100%)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 className="heading-sm">Daily Target</h3>
              <span className="badge badge-primary">{plan.calories}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <MacroCircle label="Protein" value={plan.protein} color="var(--primary-400)" />
              <MacroCircle label="Carbs" value={plan.carbs} color="var(--accent-400)" />
              <MacroCircle label="Fat" value={plan.fat} color="var(--success-400)" />
            </div>
          </div>

          {/* Meal Timeline */}
          <div className="section-header">
            <span className="section-title">📅 Meal Schedule</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
              {plan.meals.length} meals/day
            </span>
          </div>

          <div className="meal-timeline">
            {plan.meals.map((meal, i) => (
              <div key={i} className="meal-item" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="meal-time">⏰ {meal.time}</div>
                <div className="meal-card">
                  <div className="meal-title">{meal.name}</div>
                  <div className="meal-foods">
                    {meal.foods.map((food, j) => (
                      <div key={j}>• {food}</div>
                    ))}
                  </div>
                  <div className="meal-macros">
                    <div className="macro">
                      <span className="macro-value" style={{ color: 'var(--primary-400)' }}>
                        {meal.calories}
                      </span>
                      <span className="macro-label">kcal</span>
                    </div>
                    <div className="macro">
                      <span className="macro-value" style={{ color: 'var(--danger-400)' }}>
                        {meal.protein}g
                      </span>
                      <span className="macro-label">Protein</span>
                    </div>
                    <div className="macro">
                      <span className="macro-value" style={{ color: 'var(--accent-400)' }}>
                        {meal.carbs}g
                      </span>
                      <span className="macro-label">Carbs</span>
                    </div>
                    <div className="macro">
                      <span className="macro-value" style={{ color: 'var(--success-400)' }}>
                        {meal.fat}g
                      </span>
                      <span className="macro-label">Fat</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'macros' && (
        <MacrosTab plan={plan} />
      )}

      {activeTab === 'tips' && (
        <div>
          <div className="card" style={{
            padding: 'var(--space-xl)',
            textAlign: 'center',
            marginBottom: 'var(--space-lg)',
            minHeight: '160px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>
              {nutritionTips[tipIndex].split(' ')[0]}
            </div>
            <p style={{
              fontSize: '1rem', lineHeight: '1.7',
              color: 'var(--text-secondary)', maxWidth: '300px'
            }}>
              {nutritionTips[tipIndex]}
            </p>
          </div>
          <button className="btn btn-primary btn-full" onClick={nextTip}>
            Next Tip →
          </button>

          <div style={{ marginTop: 'var(--space-xl)' }}>
            <h3 className="heading-sm" style={{ marginBottom: 'var(--space-md)' }}>All Tips</h3>
            {nutritionTips.map((tip, i) => (
              <div key={i} className="card" style={{
                marginBottom: '8px', padding: '12px 16px',
                fontSize: '0.85rem', color: 'var(--text-secondary)',
                cursor: 'pointer',
                background: i === tipIndex ? 'rgba(249,115,22,0.08)' : undefined,
                borderColor: i === tipIndex ? 'var(--primary-500)' : undefined,
              }}
                onClick={() => setTipIndex(i)}
              >
                {tip}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MacroCircle({ label, value, color }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '60px', height: '60px', borderRadius: '50%',
        border: `3px solid ${color}`, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 8px',
        background: `${color}15`
      }}>
        <span style={{ fontWeight: 700, fontSize: '0.85rem', color }}>{value}</span>
      </div>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{label}</span>
    </div>
  );
}

function MacrosTab({ plan }) {
  const totalCal = plan.meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = plan.meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = plan.meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFat = plan.meals.reduce((sum, m) => sum + m.fat, 0);

  const macros = [
    { name: 'Calories', value: totalCal, unit: 'kcal', color: 'var(--primary-400)', icon: '🔥' },
    { name: 'Protein', value: totalProtein, unit: 'g', color: 'var(--danger-400)', icon: '🥩' },
    { name: 'Carbs', value: totalCarbs, unit: 'g', color: 'var(--accent-400)', icon: '🍚' },
    { name: 'Fat', value: totalFat, unit: 'g', color: 'var(--success-400)', icon: '🥑' },
  ];

  return (
    <div>
      <div className="stats-grid" style={{ marginBottom: 'var(--space-lg)' }}>
        {macros.map((m, i) => (
          <div key={i} className="stat-card">
            <div style={{ fontSize: '1.5rem' }}>{m.icon}</div>
            <div className="stat-value" style={{ color: m.color }}>{m.value}<span style={{ fontSize: '0.8rem' }}>{m.unit}</span></div>
            <div className="stat-label">{m.name}</div>
          </div>
        ))}
      </div>

      {/* Per-meal breakdown */}
      <div className="section-header">
        <span className="section-title">Meal Breakdown</span>
      </div>

      {plan.meals.map((meal, i) => {
        const calPercent = Math.round((meal.calories / totalCal) * 100);
        return (
          <div key={i} className="card" style={{ marginBottom: '8px', padding: '12px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{meal.name}</span>
              <span style={{ fontWeight: 600, color: 'var(--primary-400)', fontSize: '0.85rem' }}>
                {meal.calories} kcal
              </span>
            </div>
            <div style={{
              width: '100%', height: '6px', background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-full)', overflow: 'hidden'
            }}>
              <div style={{
                width: `${calPercent}%`, height: '100%',
                background: `linear-gradient(90deg, var(--primary-400), var(--primary-500))`,
                borderRadius: 'var(--radius-full)',
                transition: 'width 0.8s ease'
              }} />
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginTop: '6px', fontSize: '0.7rem', color: 'var(--text-tertiary)'
            }}>
              <span>P: {meal.protein}g</span>
              <span>C: {meal.carbs}g</span>
              <span>F: {meal.fat}g</span>
              <span>{calPercent}% of daily</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
