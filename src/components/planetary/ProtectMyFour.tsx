// Visual & Conceptual Bridge: Protect My Four ("Who sits inside this decision?")

import React, { useState } from 'react';
import { Users, Plus, Trash2, MapPin, ShieldCheck, Heart, AlertCircle, Sparkles, Check } from 'lucide-react';
import { PersonCard, PersonRole } from '../../types/planetary';
import { COUNTRY_OPTIONS } from '../../data/electricity-factors';
import { getLocationRisk } from '../../data/location-risks';

interface ProtectMyFourProps {
  cards: PersonCard[];
  onChange: (cards: PersonCard[]) => void;
}

export const ProtectMyFour: React.FC<ProtectMyFourProps> = ({ cards, onChange }) => {
  const [reflectionConnected, setReflectionConnected] = useState<string>('');
  const [reflectionWhy, setReflectionWhy] = useState<string>('');

  const addCard = () => {
    if (cards.length >= 4) return;
    const newCard: PersonCard = {
      id: String(Date.now()),
      role: 'someone_i_care_about',
      locationCode: 'DE',
      locationName: 'Germany',
    };
    onChange([...cards, newCard]);
  };

  const removeCard = (id: string) => {
    onChange(cards.filter((c) => c.id !== id));
  };

  const updateCard = (id: string, updates: Partial<PersonCard>) => {
    onChange(cards.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  return (
    <div className="card" style={{ background: '#ffffff', border: '1px solid #e2e8f0', marginBottom: 36, boxShadow: 'var(--shadow-sm)' }}>
      {/* Header & Epistemic Attribution */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
          <span className="badge badge-project">Project Bridge</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Authorial interpretation by Planetary Self-Inquiry (not a direct AP concept)
          </span>
        </div>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
          Who Sits Inside This Decision? (Protect My Four)
        </h3>
        <p style={{ fontSize: '0.94rem', color: '#475569', maxWidth: '720px' }}>
          When we look at our own choices, we often define our sphere of care around a small circle—family, partner, child, or close friend. But the physical atmosphere does not recognise a boundary between &ldquo;mine&rdquo; and &ldquo;others.&rdquo;
        </p>
      </div>

      {/* Up to Four People / Places Cards */}
      <div className="four-cards-grid">
        {cards.map((card, idx) => {
          const locRisk = getLocationRisk(card.locationCode || null);

          return (
            <div key={card.id} className="person-card filled">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-warm-earth)' }}>
                  Person #{idx + 1}
                </span>
                <button
                  className="btn btn-subtle btn-sm"
                  style={{ padding: '2px 6px', color: '#94a3b8' }}
                  onClick={() => removeCard(card.id)}
                  aria-label="Remove person card"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Role selector */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Relationship
                </label>
                <select
                  className="select-input"
                  style={{ padding: '6px 8px', fontSize: '0.84rem' }}
                  value={card.role}
                  onChange={(e) => updateCard(card.id, { role: e.target.value as PersonRole })}
                >
                  <option value="parent">Parent</option>
                  <option value="partner">Partner</option>
                  <option value="child">Child</option>
                  <option value="sibling">Sibling</option>
                  <option value="friend">Close Friend</option>
                  <option value="mentor">Mentor</option>
                  <option value="someone_i_care_about">Someone I care about</option>
                  <option value="future_generation">Future Generation</option>
                </select>
              </div>

              {/* Approximate Location */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Approximate Location
                </label>
                <select
                  className="select-input"
                  style={{ padding: '6px 8px', fontSize: '0.84rem' }}
                  value={card.locationCode || 'NONE'}
                  onChange={(e) => {
                    const code = e.target.value === 'NONE' ? undefined : e.target.value;
                    const opt = COUNTRY_OPTIONS.find((c) => c.code === e.target.value);
                    updateCard(card.id, {
                      locationCode: code,
                      locationName: opt ? opt.label.split(' (')[0] : undefined,
                    });
                  }}
                >
                  {COUNTRY_OPTIONS.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label.split(' (')[0]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Risk Context (IPCC AR6 WGII) */}
              {locRisk && (
                <div style={{ marginTop: 8, background: '#f8fafc', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#1e40af', marginBottom: 2 }}>
                    Documented IPCC Risk Context ({locRisk.countryName})
                  </div>
                  <ul style={{ paddingLeft: 14, fontSize: '0.78rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {locRisk.riskDomains.slice(0, 2).map((r, i) => (
                      <li key={i}>{r.title}</li>
                    ))}
                  </ul>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 4, fontStyle: 'italic' }}>
                    Shared atmospheric risk &bull; not individual handset blame.
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {cards.length < 4 && (
          <button
            className="person-card"
            style={{ cursor: 'pointer', background: '#fafaf9', justifyContent: 'center', alignItems: 'center', minHeight: '180px' }}
            onClick={addCard}
          >
            <Plus size={24} color="#64748b" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>
              Add a person/place ({cards.length}/4)
            </span>
          </button>
        )}
      </div>

      {/* The Two Columns: Connection We Can Support vs What We Cannot Claim */}
      <div className="boundary-box">
        <div className="boundary-col boundary-col-supported">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#1e40af', fontWeight: 700, fontSize: '0.9rem' }}>
            <ShieldCheck size={18} />
            THE CONNECTION WE CAN SUPPORT
          </div>
          <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
            Every smartphone requires physical ore extraction, semiconductor manufacturing energy, and electricity for charging. These activities incrementally contribute greenhouse gases to the common global atmosphere, which systematically increases climate risks for every region on Earth.
          </p>
        </div>

        <div className="boundary-col boundary-col-refused">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#92400e', fontWeight: 700, fontSize: '0.9rem' }}>
            <AlertCircle size={18} />
            WHAT WE CANNOT CLAIM
          </div>
          <p style={{ fontSize: '0.88rem', color: '#78350f', lineHeight: 1.5 }}>
            We cannot claim that buying or not buying this phone will cause or prevent a specific flood, storm, or illness in any particular location. The physical mechanism operates through shared aggregate probability, not direct personal retribution.
          </p>
        </div>
      </div>

      {/* Project-Authored Reflection Question */}
      <div style={{ background: '#fdfbf7', padding: 20, borderRadius: 14, border: '1px solid #fed7aa', marginTop: 12 }}>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#78350f', marginBottom: 6 }}>
          Project Inquiry &bull; The Scope of Connection
        </h4>
        <p style={{ fontSize: '0.92rem', color: '#475569', marginBottom: 14 }}>
          Some consequences of this choice extend beyond you and the people closest to you. Do you see those affected interests as separate from what you care about, or connected to it?
        </p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
          {[
            { key: 'connected', label: 'Connected to what I care about' },
            { key: 'separate', label: 'Separate / Beyond my immediate concern' },
            { key: 'unclear', label: 'I’m still reflecting on this' },
          ].map((item) => {
            const isSelected = reflectionConnected === item.key;
            return (
              <button
                key={item.key}
                type="button"
                className={`choice-pill ${isSelected ? 'selected' : ''}`}
                onClick={() => setReflectionConnected(item.key)}
              >
                <span className="choice-pill-indicator">
                  {isSelected && <Check size={11} strokeWidth={3} />}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <input
          type="text"
          className="text-input"
          placeholder="What makes you see it that way? (Optional reflection)"
          value={reflectionWhy}
          onChange={(e) => setReflectionWhy(e.target.value)}
        />
      </div>
    </div>
  );
};
