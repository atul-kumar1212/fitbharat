import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Check, X, Crown, Zap, Star, ChevronDown } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Starter',
    emoji: '🌱',
    price: '₹0',
    period: 'forever',
    description: 'Perfect for beginners starting their fitness journey',
    color: '#22c55e',
    features: [
      { text: 'Basic workout plans', included: true },
      { text: 'Limited exercise library (20+)', included: true },
      { text: 'BMI & BMR calculator', included: true },
      { text: 'Water tracker', included: true },
      { text: 'AI Coach (5 msgs/day)', included: true },
      { text: 'Custom diet plans', included: false },
      { text: 'Workout analytics', included: false },
      { text: 'Premium exercises (50+)', included: false },
      { text: 'Priority AI support', included: false },
      { text: 'Ad-free experience', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    emoji: '⚡',
    price: '₹199',
    period: '/month',
    description: 'For serious fitness enthusiasts who want results',
    color: '#f97316',
    popular: true,
    features: [
      { text: 'Advanced workout plans', included: true },
      { text: 'Full exercise library (50+)', included: true },
      { text: 'BMI & BMR calculator', included: true },
      { text: 'Water & nutrition tracker', included: true },
      { text: 'AI Coach (unlimited)', included: true },
      { text: 'Indian diet plans (all)', included: true },
      { text: 'Workout analytics & graphs', included: true },
      { text: 'Progress photos tracking', included: true },
      { text: 'Priority AI support', included: false },
      { text: 'Personal trainer chat', included: false },
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    emoji: '👑',
    price: '₹499',
    period: '/month',
    description: 'The ultimate fitness experience with everything unlocked',
    color: '#a78bfa',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Personal trainer chat', included: true },
      { text: 'Custom meal planning', included: true },
      { text: 'Video exercise guides', included: true },
      { text: 'Priority AI support 24/7', included: true },
      { text: 'Advanced body analytics', included: true },
      { text: 'Supplement recommendations', included: true },
      { text: 'Workout scheduling', included: true },
      { text: 'Community access', included: true },
      { text: 'Ad-free experience', included: true },
    ],
  },
];

const faqs = [
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Yes! You can cancel your subscription at any time. Your premium features will remain active until the end of your billing period.',
  },
  {
    q: 'Is the AI Coach really unlimited in Pro?',
    a: 'Absolutely! Pro users get unlimited access to our AI fitness coach powered by advanced AI. Ask as many questions as you want about workouts, diet, and fitness.',
  },
  {
    q: 'Do you offer yearly plans?',
    a: 'Yes! Yearly plans come with 40% discount. Pro yearly is ₹1,199/year and Elite yearly is ₹2,999/year. That\'s like getting 5 months free!',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept UPI, credit/debit cards, net banking, and popular wallets like Paytm, PhonePe, and Google Pay.',
  },
];

export default function Plans() {
  const { user } = useUser();
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubscribe = (planId) => {
    if (planId === 'free') {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      return;
    }
    setSelectedPlan(planId);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-title">
          <span className="page-header-greeting">👑 Premium</span>
          <span className="page-header-name">Upgrade Your Plan</span>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="plans-toast">
          <span>✅ Subscription request received! We'll process it shortly.</span>
        </div>
      )}

      {/* Hero Banner */}
      <div className="plans-hero">
        <div className="plans-hero-glow" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="heading-lg" style={{ marginBottom: '8px' }}>
            Unlock Your Full <span className="text-gradient">Potential</span>
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Get personalized workouts, AI coaching, Indian diet plans and more. 
            Join 50,000+ fitness enthusiasts across India 🇮🇳
          </p>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="plans-billing-toggle">
        <button
          className={`plans-billing-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
          onClick={() => setBillingCycle('monthly')}
        >
          Monthly
        </button>
        <button
          className={`plans-billing-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
          onClick={() => setBillingCycle('yearly')}
        >
          Yearly
          <span className="plans-save-badge">Save 40%</span>
        </button>
      </div>

      {/* Plan Cards */}
      <div className="plans-grid">
        {plans.map((plan) => {
          const yearlyPrice = plan.id === 'pro' ? '₹1,199' : plan.id === 'elite' ? '₹2,999' : '₹0';
          const displayPrice = billingCycle === 'yearly' && plan.id !== 'free' ? yearlyPrice : plan.price;
          const displayPeriod = plan.id === 'free' ? 'forever' : billingCycle === 'yearly' ? '/year' : '/month';

          return (
            <div
              key={plan.id}
              className={`plan-card ${plan.popular ? 'plan-card-popular' : ''} ${selectedPlan === plan.id ? 'plan-card-selected' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="plan-popular-badge">
                  <Star size={12} /> Most Popular
                </div>
              )}

              <div className="plan-header">
                <span className="plan-emoji">{plan.emoji}</span>
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
              </div>

              <div className="plan-price-section">
                <span className="plan-price" style={{ color: plan.color }}>
                  {displayPrice}
                </span>
                <span className="plan-period">{displayPeriod}</span>
              </div>

              <div className="plan-features">
                {plan.features.map((feature, i) => (
                  <div key={i} className={`plan-feature ${feature.included ? '' : 'plan-feature-disabled'}`}>
                    {feature.included ? (
                      <Check size={16} color={plan.color} />
                    ) : (
                      <X size={16} color="var(--text-tertiary)" />
                    )}
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              <button
                className={`btn btn-full plan-cta ${plan.id === 'free' ? 'btn-secondary' : 'btn-primary'}`}
                style={plan.id !== 'free' ? {
                  background: `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)`,
                } : {}}
                onClick={(e) => { e.stopPropagation(); handleSubscribe(plan.id); }}
              >
                {plan.id === 'free' ? 'Current Plan' : `Subscribe to ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>

      {/* Features Comparison */}
      <div style={{ marginTop: 'var(--space-xl)' }}>
        <div className="section-header">
          <span className="section-title">✨ Why Go Premium?</span>
        </div>

        <div className="plans-benefits">
          {[
            { emoji: '🤖', title: 'Unlimited AI Coach', desc: 'Get instant fitness advice anytime, anywhere' },
            { emoji: '🍛', title: 'Indian Diet Plans', desc: 'Customized meal plans with Indian foods you love' },
            { emoji: '📊', title: 'Progress Analytics', desc: 'Track your body transformation with detailed graphs' },
            { emoji: '🏋️', title: 'Premium Workouts', desc: 'Access 50+ exercises with video guides' },
            { emoji: '🎯', title: 'Personalized Plans', desc: 'Workout plans tailored to your goals' },
            { emoji: '💬', title: 'Expert Support', desc: 'Chat with certified fitness trainers' },
          ].map((benefit, i) => (
            <div key={i} className="plan-benefit-card">
              <span className="plan-benefit-emoji">{benefit.emoji}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>{benefit.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{benefit.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ marginTop: 'var(--space-xl)' }}>
        <div className="section-header">
          <span className="section-title">❓ FAQ</span>
        </div>

        {faqs.map((faq, i) => (
          <div
            key={i}
            className="plans-faq"
            onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
          >
            <div className="plans-faq-q">
              <span>{faq.q}</span>
              <ChevronDown
                size={18}
                style={{
                  transition: 'transform 0.3s ease',
                  transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0)',
                  flexShrink: 0,
                }}
              />
            </div>
            {expandedFaq === i && (
              <div className="plans-faq-a">{faq.a}</div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="plans-cta-section">
        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🚀</div>
        <h3 className="heading-md">Ready to Transform?</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '8px 0 16px' }}>
          Start your premium journey today. Cancel anytime.
        </p>
        <button
          className="btn btn-primary btn-lg btn-full"
          onClick={() => handleSubscribe('pro')}
        >
          Get Pro — ₹199/month ⚡
        </button>
      </div>
    </div>
  );
}
