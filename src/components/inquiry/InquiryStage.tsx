// Stage 2: AP-Grounded Self-Inquiry Component

import React, { useState } from 'react';
import { InquiryAnswers, ProvisionalChoice } from '../../types/inquiry';
import { SituationState } from '../../types/situation';
import { AP_QUESTIONS_CONFIG, AP_LENSES } from '../../data/ap-corpus';
import { buildReflection } from '../../lib/reflection-engine';
import { ArrowRight, Sparkles, MessageSquare, Compass, Eye, ShieldAlert, Check } from 'lucide-react';

interface InquiryStageProps {
  situation: SituationState;
  answers: InquiryAnswers;
  onChange: (updated: InquiryAnswers) => void;
  onComplete: () => void;
}

export const InquiryStage: React.FC<InquiryStageProps> = ({
  situation,
  answers,
  onChange,
  onComplete,
}) => {
  const [showReflection, setShowReflection] = useState<boolean>(false);

  const updateAnswer = (key: keyof InquiryAnswers, val: string) => {
    onChange({ ...answers, [key]: val });
  };

  const { grammar, internalBranch } = buildReflection(situation, answers);

  const isFormSufficient =
    (answers.APQ1_FUNCTION || '').length > 3 ||
    (answers.APQ2_EXPECTATION || '').length > 3 ||
    (answers.APQ3_ORIGIN || '').length > 3;

  return (
    <div className="inquiry-stage">
      {/* Hero Header */}
      <div className="stage-hero">
        <div className="stage-tagline">Stage 2 of 4 &bull; Inner Investigation</div>
        <h2 className="stage-title">Observing the Impulse without Defense or Guilt</h2>
        <p className="stage-desc">
          Inspired by the Acharya Prashant framework of self-observation. This is not a psychological test and will not judge or diagnose you. It simply places your own observations side by side.
        </p>
      </div>

      {/* 6 Questions in Exact Sequence */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {AP_QUESTIONS_CONFIG.map((cfg) => {
          const val = answers[cfg.key as keyof InquiryAnswers] || '';

          return (
            <div key={cfg.key} className="question-card" style={{ borderLeft: '4px solid var(--accent-ap)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span className="question-label" style={{ color: 'var(--accent-ap)' }}>
                  Question {cfg.number} of 6 &bull; {cfg.title}
                </span>
                <span className="badge badge-ap" style={{ fontSize: '0.7rem' }}>
                  AP Framework
                </span>
              </div>

              <h3 className="question-text">{cfg.question}</h3>
              <p className="question-explainer">{cfg.guidance}</p>

              <textarea
                className="textarea-input"
                placeholder={cfg.placeholder}
                value={val}
                onChange={(e) => updateAnswer(cfg.key as keyof InquiryAnswers, e.target.value)}
              />

              {/* Follow-up for Q5 if present */}
              {cfg.key === 'APQ5_NONPURCHASE' && cfg.followUpQuestion && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px dashed var(--border-subtle)' }}>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 600, marginBottom: 6 }}>
                    Follow-up inquiry: {cfg.followUpQuestion}
                  </h4>
                  <input
                    type="text"
                    className="text-input"
                    placeholder="e.g. Mainly practical battery life, or partly wanting a fresh feeling..."
                    value={answers.APQ5_FOLLOWUP || ''}
                    onChange={(e) => updateAnswer('APQ5_FOLLOWUP', e.target.value)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reflection Panel Trigger */}
      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {!showReflection ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              className="btn btn-primary"
              style={{ padding: '14px 28px', fontSize: '1.05rem', background: '#78350f' }}
              onClick={() => setShowReflection(true)}
            >
              <Eye size={18} />
              Read Your Answers Together
            </button>
          </div>
        ) : (
          <div className="card" style={{ background: '#fdfbf7', border: '1px solid #fed7aa', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Compass size={22} color="#78350f" />
              <h3 style={{ color: '#78350f', margin: 0, fontSize: '1.3rem' }}>
                Your Reflection Dossier
              </h3>
            </div>

            {/* Grammar Component 1: Restatement (Mandatory) */}
            <div style={{ marginBottom: 18 }}>
              <div className="drawer-row-label" style={{ color: '#9a3412', marginBottom: 4 }}>
                1. Faithful Restatement of What You Said
              </div>
              <p style={{ color: '#1e293b', fontStyle: 'italic', fontSize: '1.05rem', lineHeight: 1.5 }}>
                {grammar.restatement}
              </p>
            </div>

            {/* Grammar Component 2: Juxtaposition (Optional) */}
            {grammar.juxtaposition && (
              <div style={{ marginBottom: 18, background: '#ffffff', padding: 16, borderRadius: 10, border: '1px solid #fed7aa' }}>
                <div className="drawer-row-label" style={{ color: '#9a3412', marginBottom: 4 }}>
                  2. Juxtaposition of Observations
                </div>
                <p style={{ color: '#334155', fontSize: '0.96rem' }}>
                  {grammar.juxtaposition}
                </p>
              </div>
            )}

            {/* Grammar Component 3: Inquiry Question (Mandatory) */}
            <div style={{ marginBottom: 18 }}>
              <div className="drawer-row-label" style={{ color: '#9a3412', marginBottom: 4 }}>
                3. The Question to Ponder
              </div>
              <p style={{ color: '#0f172a', fontWeight: 600, fontSize: '1.1rem' }}>
                &ldquo;{grammar.question}&rdquo;
              </p>
            </div>

            {/* Grammar Component 4: Source Lens (Optional Paraphrase) */}
            {grammar.sourceLens && (
              <div style={{ marginBottom: 20, background: '#fef3c7', padding: 14, borderRadius: 10, border: '1px solid #fde68a' }}>
                <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700, color: '#92400e', marginBottom: 4 }}>
                  Acharya Prashant Framework Lens: {grammar.sourceLens.concept}
                </div>
                <p style={{ fontSize: '0.9rem', color: '#78350f', marginBottom: 8 }}>
                  {grammar.sourceLens.approvedParaphrase}
                </p>
                <p style={{ fontSize: '0.92rem', color: '#92400e', fontWeight: 600, fontStyle: 'italic' }}>
                  {grammar.sourceLens.inquiryPrompt}
                </p>
              </div>
            )}

            {/* Grammar Component 5: Open Choice (Mandatory) */}
            <div style={{ marginTop: 24, borderTop: '1px solid #fed7aa', paddingTop: 18 }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#78350f', marginBottom: 6 }}>
                Provisional Feeling (Open & Uncoerced)
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: 14 }}>
                {grammar.openChoice}
              </p>

              <div className="options-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
                {([
                  { key: 'keep_current', label: 'Keep current' },
                  { key: 'repair_current', label: 'Repair current' },
                  { key: 'consider_used', label: 'Consider used' },
                  { key: 'consider_refurbished', label: 'Consider refurbished' },
                  { key: 'buy_new', label: 'Buy new' },
                  { key: 'investigate_further', label: 'Investigate further' },
                  { key: 'unclear', label: 'Still unclear' },
                ] as { key: ProvisionalChoice; label: string }[]).map((opt) => {
                  const isSelected = answers.provisionalChoice === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      className={`choice-pill ${isSelected ? 'selected' : ''}`}
                      onClick={() => updateAnswer('provisionalChoice', opt.key)}
                      style={{ justifyContent: 'center' }}
                    >
                      <span className="choice-pill-indicator">
                        {isSelected && <Check size={11} strokeWidth={3} />}
                      </span>
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Complete Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 28 }}>
              <button
                className="btn btn-primary"
                style={{ padding: '14px 28px', fontSize: '1.05rem' }}
                onClick={onComplete}
              >
                Proceed to Physical Evidence
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
