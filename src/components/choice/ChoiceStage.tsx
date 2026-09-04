// Stage 4: Final Choice Component ("Your conclusion remains yours.")

import React, { useState } from 'react';
import { FinalDecision, FinalChoiceRecord } from '../../types/choice';
import { SituationState } from '../../types/situation';
import { InquiryAnswers } from '../../types/inquiry';
import { PersonCard } from '../../types/planetary';
import { Compass, CheckCircle, Printer, RefreshCw, Share2, Sparkles, FileCheck, Check } from 'lucide-react';

interface ChoiceStageProps {
  situation: SituationState;
  inquiry: InquiryAnswers;
  myFour: PersonCard[];
  onRestart: () => void;
}

const DECISIONS: { key: FinalDecision; label: string; desc: string }[] = [
  { key: 'keep_current', label: 'Keep my current phone', desc: 'Maintain existing hardware through its estimated service horizon.' },
  { key: 'repair_current', label: 'Repair my current phone', desc: 'Proceed with battery, display, or targeted module maintenance.' },
  { key: 'look_for_used', label: 'Look for a used / second-hand phone', desc: 'Acquire an existing device via peer-to-peer transfer or second-hand marketplace.' },
  { key: 'look_for_refurbished', label: 'Look for a refurbished phone', desc: 'Acquire an industrially tested, cleaned, and warrantied renewed device.' },
  { key: 'buy_new', label: 'Buy a new phone', desc: 'Proceed with a newly manufactured handset suited to your daily requirements.' },
  { key: 'investigate_further', label: 'Investigate further', desc: 'Pause to gather more technical, pricing, or personal clarity before deciding.' },
  { key: 'still_unclear', label: 'Still unclear', desc: 'Honour unresolved uncertainty without forcing a premature conclusion.' },
];

export const ChoiceStage: React.FC<ChoiceStageProps> = ({
  situation,
  inquiry,
  myFour,
  onRestart,
}) => {
  const [selectedDecision, setSelectedDecision] = useState<FinalDecision | null>(null);
  const [rationale, setRationale] = useState<string>('');
  const [isFinalized, setIsFinalized] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="choice-stage">
      {/* Hero Header */}
      <div className="stage-hero">
        <div className="stage-tagline">Stage 4 of 4 &bull; Autonomous Choice</div>
        <h2 className="stage-title">Your Conclusion Remains Yours</h2>
        <p className="stage-desc">
          Having seen your practical situation, your own reflections, and the physical consequence pathways together: what now seems genuinely appropriate?
        </p>
      </div>

      {!isFinalized ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Decision Selector Cards */}
          <div className="question-card">
            <h3 className="question-text" style={{ marginBottom: 16 }}>
              What path do you choose to take?
            </h3>
            <p className="question-explainer">
              The application does not rank or moralize your choice. Every realistic path is legitimate when chosen with clarity.
            </p>

            <div className="options-grid">
              {DECISIONS.map((d) => {
                const isSelected = selectedDecision === d.key;
                return (
                  <button
                    key={d.key}
                    type="button"
                    className={`option-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedDecision(d.key)}
                  >
                    <div className="option-header-row">
                      <span className="option-title">{d.label}</span>
                      <span className="option-radio">
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </span>
                    </div>
                    <span className="option-subtitle">{d.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rationale Textarea */}
          {selectedDecision && (
            <div className="question-card" style={{ animation: 'fadeIn 250ms ease-out' }}>
              <div className="question-label">Your Personal Rationale (Optional)</div>
              <h3 className="question-text">In your own words: why does this path seem appropriate?</h3>
              <p className="question-explainer">
                Preserve your own reasoning exactly as you see it today.
              </p>

              <textarea
                className="textarea-input"
                placeholder="e.g. Seeing the battery swap cost and emissions made it clear that my screen and processor are completely fine for another 2 years..."
                value={rationale}
                onChange={(e) => setRationale(e.target.value)}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                <button
                  className="btn btn-primary"
                  style={{ padding: '12px 24px' }}
                  onClick={() => setIsFinalized(true)}
                >
                  <FileCheck size={18} />
                  Complete Inquiry & View Dossier
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Completed Dossier View */
        <div className="card" style={{ background: '#ffffff', border: '1px solid #cbd5e1', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 16, marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Compass size={24} color="#0f172a" />
              <div>
                <h3 style={{ fontSize: '1.35rem', margin: 0 }}>Planetary Self-Inquiry Dossier</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Decision Record &bull; Client-Side Verification
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary btn-sm" onClick={handlePrint}>
                <Printer size={14} />
                Print / Save PDF
              </button>
              <button className="btn btn-subtle btn-sm" onClick={onRestart}>
                <RefreshCw size={14} />
                Start New Inquiry
              </button>
            </div>
          </div>

          {/* User Decision Box */}
          <div style={{ background: '#f8fafc', padding: 20, borderRadius: 14, border: '1px solid #e2e8f0', marginBottom: 24 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#1e40af', marginBottom: 4 }}>
              Your Final Stated Decision
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>
              {DECISIONS.find((d) => d.key === selectedDecision)?.label}
            </div>
            {rationale && (
              <p style={{ marginTop: 10, fontSize: '0.96rem', color: '#334155', fontStyle: 'italic', borderLeft: '3px solid #94a3b8', paddingLeft: 12 }}>
                &ldquo;{rationale}&rdquo;
              </p>
            )}
          </div>

          {/* Dossier Summary Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 24 }}>
            {/* Practical Situation Recap */}
            <div style={{ background: '#fafaf9', padding: 16, borderRadius: 10, border: '1px solid #e5e4de' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>
                1. Practical Situation
              </div>
              <ul style={{ fontSize: '0.86rem', color: '#475569', paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <li>Problem: {situation.problemType}</li>
                <li>Safe to use: {situation.isSafeToUse}</li>
                <li>Meets required needs: {situation.meetsRequiredNeeds}</li>
                <li>Estimated horizon: {situation.remainingAdequateHorizon.option.replace('_', ' ')}</li>
              </ul>
            </div>

            {/* Self-Inquiry Core Recap */}
            <div style={{ background: '#fafaf9', padding: 16, borderRadius: 10, border: '1px solid #e5e4de' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>
                2. Self-Inquiry Answers
              </div>
              <ul style={{ fontSize: '0.86rem', color: '#475569', paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <li>Function: {inquiry.APQ1_FUNCTION ? `"${inquiry.APQ1_FUNCTION.slice(0, 45)}..."` : 'Unspecified'}</li>
                <li>Expectation: {inquiry.APQ2_EXPECTATION ? `"${inquiry.APQ2_EXPECTATION.slice(0, 45)}..."` : 'Unspecified'}</li>
                <li>Origin: {inquiry.APQ3_ORIGIN ? `"${inquiry.APQ3_ORIGIN.slice(0, 45)}..."` : 'Unspecified'}</li>
              </ul>
            </div>

            {/* Connected Circle (Protect My Four) */}
            <div style={{ background: '#fafaf9', padding: 16, borderRadius: 10, border: '1px solid #e5e4de' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>
                3. Connected People / Places
              </div>
              {myFour.length > 0 ? (
                <ul style={{ fontSize: '0.86rem', color: '#475569', paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {myFour.map((p, idx) => (
                    <li key={p.id}>
                      {p.role} &bull; {p.locationName || 'Unspecified location'}
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
                  No personal cards configured.
                </div>
              )}
            </div>
          </div>

          {/* Epistemic Closing Note */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16, textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>
              &ldquo;Truth does not demand forced sacrifice or guilt. Seeing things clearly is itself the right action.&rdquo; &bull; Your decision remains yours.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
