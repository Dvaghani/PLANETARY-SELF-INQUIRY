// Stage 1: Situation Component ("A working phone. A real decision.")

import React from 'react';
import { SituationState, ProblemType, TriState, RepairType, HorizonOption } from '../../types/situation';
import { POPULAR_DEVICE_OPTIONS, DEVICE_REGISTRY } from '../../data/device-registry';
import { COUNTRY_OPTIONS } from '../../data/electricity-factors';
import { ArrowRight, AlertTriangle, Check } from 'lucide-react';

interface SituationStageProps {
  situation: SituationState;
  onChange: (updated: SituationState) => void;
  onComplete: () => void;
}

export const SituationStage: React.FC<SituationStageProps> = ({
  situation,
  onChange,
  onComplete,
}) => {
  const update = (fields: Partial<SituationState>) => {
    onChange({ ...situation, ...fields });
  };

  const selectedModel = situation.currentModelId ? DEVICE_REGISTRY[situation.currentModelId] : null;

  return (
    <div className="situation-stage">
      {/* Hero Header */}
      <div className="stage-hero">
        <div className="stage-tagline">Stage 1 of 4 &bull; Physical Reality</div>
        <h2 className="stage-title">A working phone. A real decision.</h2>
        <p className="stage-desc">
          Before asking why you want another phone, let’s understand what your current one actually does and doesn’t do for you.
        </p>
      </div>

      {/* QUESTION 1: Current Handset Model */}
      <div className="question-card">
        <div className="question-label">Question 1 of 6 &bull; Current Device</div>
        <h3 className="question-text">What phone do you use right now?</h3>
        <p className="question-explainer">
          Exact identity is completely optional. If your phone is not listed, generic evidence brackets will be used without any penalty or blocking.
        </p>

        <div style={{ maxWidth: '520px' }}>
          <select
            className="select-input"
            value={situation.currentModelId || 'generic_smartphone'}
            onChange={(e) => update({ currentModelId: e.target.value })}
          >
            {POPULAR_DEVICE_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {selectedModel && selectedModel.dataStatus === 'model_specific_approved' && (
          <div style={{ marginTop: 14, background: '#eff6ff', padding: 12, borderRadius: 8, border: '1px solid #bfdbfe' }}>
            <div style={{ fontSize: '0.85rem', color: '#1e40af', fontWeight: 600 }}>
              &check; Certified Model-Specific LCA Found: {selectedModel.name}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#1e3a8a', marginTop: 2 }}>
              {selectedModel.provenance.studyName}
            </div>
          </div>
        )}
      </div>

      {/* QUESTION 2: Problem Assessment */}
      <div className="question-card">
        <div className="question-label">Question 2 of 6 &bull; Practical Capability</div>
        <h3 className="question-text">Is something actually stopping the phone from meeting your needs?</h3>
        <p className="question-explainer">
          A phone powering on does not automatically mean it is adequate for your daily life.
        </p>

        <div className="options-grid">
          {[
            { key: 'none', label: 'Nothing important', desc: 'It still handles what I need' },
            { key: 'battery', label: 'Battery degradation', desc: 'Doesn’t hold charge for necessary use' },
            { key: 'display', label: 'Display damage', desc: 'Cracked screen / touch faults hinder reading' },
            { key: 'mainboard', label: 'Mainboard / circuitry fault', desc: 'Overheating, boot-loops, hardware freezes' },
            { key: 'apps', label: 'App incompatibility', desc: 'Work, banking, or essential apps no longer run' },
            { key: 'security', label: 'Security & software support', desc: 'OS updates ended; compliance concern' },
            { key: 'performance', label: 'Severe slowness', desc: 'Lag blocks work or accessibility needs' },
            { key: 'other', label: 'Another concrete problem', desc: 'Physical port, microphone, speaker, etc.' },
            { key: 'unsure', label: 'I’m not sure', desc: 'Uncertain about what is failing' },
          ].map((item) => {
            const isSelected = situation.problemType === item.key;
            return (
              <button
                key={item.key}
                type="button"
                className={`option-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  const isHw = ['battery', 'display', 'mainboard'].includes(item.key);
                  update({
                    problemType: item.key as ProblemType,
                    hasHardwareRepairNeed: isHw,
                    selectedRepairType: isHw ? (item.key as RepairType) : undefined,
                  });
                }}
              >
                <div className="option-header-row">
                  <span className="option-title">{item.label}</span>
                  <span className="option-radio">
                    {isSelected && <Check size={12} strokeWidth={3} />}
                  </span>
                </div>
                <span className="option-subtitle">{item.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* QUESTION 3: Safety Check */}
      <div className="question-card">
        <div className="question-label">Question 3 of 6 &bull; Physical Safety</div>
        <h3 className="question-text">Is it physically safe to continue using?</h3>
        <p className="question-explainer">
          E.g. Is the battery swelling, the chassis burning hot, or is sharp shattered glass exposed?
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { key: 'yes', label: 'Yes, physically safe' },
            { key: 'no', label: 'No, unsafe hazard' },
            { key: 'unsure', label: 'I’m not sure' },
          ].map((item) => {
            const isSelected = situation.isSafeToUse === item.key;
            return (
              <button
                key={item.key}
                type="button"
                className={`choice-pill ${isSelected ? 'selected' : ''}`}
                onClick={() => update({ isSafeToUse: item.key as TriState })}
              >
                <span className="choice-pill-indicator">
                  {isSelected && <Check size={11} strokeWidth={3} />}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {situation.isSafeToUse === 'no' && (
          <div style={{ marginTop: 16, background: '#fef2f2', padding: 14, borderRadius: 10, border: '1px solid #fecaca', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <AlertTriangle size={18} color="#dc2626" style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: '0.9rem', color: '#991b1b' }}>
              <strong>Infeasibility Constraint:</strong> If the phone is unsafe to use, keeping it as-is cannot be presented as a viable path. Repair or safe replacement is physically necessary.
            </div>
          </div>
        )}
      </div>

      {/* QUESTION 4: Required Needs & Security Support */}
      <div className="question-card">
        <div className="question-label">Question 4 of 6 &bull; Daily Utility & Software Updates</div>
        <h3 className="question-text">Does it still do the tasks you actually need?</h3>

        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          {[
            { key: 'yes', label: 'Yes, still does what I need' },
            { key: 'no', label: 'No, blocks essential tasks' },
            { key: 'unsure', label: 'Not sure' },
          ].map((item) => {
            const isSelected = situation.meetsRequiredNeeds === item.key;
            return (
              <button
                key={item.key}
                type="button"
                className={`choice-pill ${isSelected ? 'selected' : ''}`}
                onClick={() => update({ meetsRequiredNeeds: item.key as TriState })}
              >
                <span className="choice-pill-indicator">
                  {isSelected && <Check size={11} strokeWidth={3} />}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 18, marginTop: 12 }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 6 }}>
            Do you know whether your phone is still receiving the security/software updates you need?
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 12 }}>
            Ended software updates do NOT automatically force replacement unless your specific employer, bank, or threat model requires it.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { key: 'yes', label: 'Yes, still supported' },
              { key: 'no', label: 'No, updates ended' },
              { key: 'unsure', label: 'I don’t know' },
            ].map((item) => {
              const isSelected = situation.knowsSecuritySupportStatus === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  className={`choice-pill ${isSelected ? 'selected' : ''}`}
                  onClick={() => update({ knowsSecuritySupportStatus: item.key as TriState })}
                >
                  <span className="choice-pill-indicator">
                    {isSelected && <Check size={11} strokeWidth={3} />}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {selectedModel && selectedModel.securitySupport && (
            <div style={{ marginTop: 12, background: '#f8fafc', padding: 10, borderRadius: 8, fontSize: '0.82rem', color: '#334155' }}>
              <strong>Documented Support Info:</strong> {selectedModel.securitySupport.statusSummary} (Source: {selectedModel.securitySupport.source})
            </div>
          )}
        </div>
      </div>

      {/* QUESTION 5: Repair Availability (Conditional - only shown if relevant problem exists) */}
      {(situation.hasHardwareRepairNeed || ['battery', 'display', 'mainboard', 'other'].includes(situation.problemType)) && (
        <div className="question-card" style={{ borderLeft: '4px solid var(--accent-science)' }}>
          <div className="question-label" style={{ color: 'var(--accent-science)' }}>
            Conditional Inquiry &bull; Repair Viability
          </div>
          <h3 className="question-text">Is a reliable, adequate repair actually accessible to you?</h3>
          <p className="question-explainer">
            Consider whether replacement parts, repair shops, or certified DIY kits exist for this problem.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { key: 'yes', label: 'Yes, reliable repair available' },
              { key: 'no', label: 'No, repair not practical' },
              { key: 'unsure', label: 'Uncertain' },
            ].map((item) => {
              const isSelected = situation.isReliableRepairAvailable === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  className={`choice-pill ${isSelected ? 'selected' : ''}`}
                  onClick={() => update({ isReliableRepairAvailable: item.key as TriState })}
                >
                  <span className="choice-pill-indicator">
                    {isSelected && <Check size={11} strokeWidth={3} />}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* QUESTION 6: Remaining Service Horizon */}
      <div className="question-card">
        <div className="question-label">Question 5 of 6 &bull; Expected Service Horizon</div>
        <h3 className="question-text">
          If you don’t replace this phone now, how much longer do you realistically think it could still meet your needs?
        </h3>
        <p className="question-explainer">
          This is your personal estimate, not a technical prediction of when the hardware will die. We preserve your estimate rather than inventing a 3-year baseline.
        </p>

        <div className="options-grid">
          {[
            { opt: 'unsure', label: 'I don’t know', desc: 'Uncertain; we will reflect this uncertainty' },
            { opt: 'under_6m', label: 'Less than 6 months', desc: 'Near end-of-use (approx 0.25–0.5 yrs)' },
            { opt: '6_to_12m', label: '6 to 12 months', desc: 'Medium-term (0.5–1.0 yr)' },
            { opt: '1_to_2y', label: '1 to 2 years', desc: 'Standard horizon (1–2 yrs)' },
            { opt: '2_to_3y', label: '2 to 3 years', desc: 'Extended horizon (2–3 yrs)' },
            { opt: '3p_y', label: '3+ years', desc: 'Long-term service (3–5 yrs)' },
          ].map((item) => {
            const isSelected = situation.remainingAdequateHorizon.option === item.opt;
            return (
              <button
                key={item.opt}
                type="button"
                className={`option-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  let min: number | null = null;
                  let max: number | null = null;
                  if (item.opt === 'under_6m') { min = 0.25; max = 0.5; }
                  if (item.opt === '6_to_12m') { min = 0.5; max = 1.0; }
                  if (item.opt === '1_to_2y') { min = 1.0; max = 2.0; }
                  if (item.opt === '2_to_3y') { min = 2.0; max = 3.0; }
                  if (item.opt === '3p_y') { min = 3.0; max = 5.0; }

                  update({
                    remainingAdequateHorizon: {
                      option: item.opt as HorizonOption,
                      minYears: min,
                      maxYears: max,
                    },
                  });
                }}
              >
                <div className="option-header-row">
                  <span className="option-title">{item.label}</span>
                  <span className="option-radio">
                    {isSelected && <Check size={12} strokeWidth={3} />}
                  </span>
                </div>
                <span className="option-subtitle">{item.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* QUESTION 7: Charging Location & Old Phone Fate */}
      <div className="question-card">
        <div className="question-label">Question 6 of 6 &bull; Energy Grid & Hardware Fate</div>
        
        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 6 }}>
          Where do you mainly charge your phone? (Optional)
        </h4>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 14 }}>
          Electricity generation has different carbon intensities in different countries. If a documented factor exists, we calculate charging impact; otherwise it remains omitted, not zero.
        </p>

        <div style={{ maxWidth: '520px', marginBottom: 24 }}>
          <select
            className="select-input"
            value={situation.chargingLocationCode || 'NONE'}
            onChange={(e) => update({ chargingLocationCode: e.target.value === 'NONE' ? null : e.target.value })}
          >
            {COUNTRY_OPTIONS.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 6 }}>
          If replacement happens, what would probably happen to your current phone?
        </h4>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 14 }}>
          Kept separate from acquisition. Giving or selling it to someone does not guarantee a 1:1 avoided new phone.
        </p>

        <div className="options-grid">
          {[
            { key: 'keep_using', label: 'I would keep using it', desc: 'No retirement event triggered' },
            { key: 'sell_or_gift', label: 'Pass to someone else', desc: 'Family hand-down or resale (no automatic -1 credit)' },
            { key: 'store_unused', label: 'Store in drawer', desc: 'Dormant hardware (not recycling)' },
            { key: 'trade_in', label: 'Trade-in with seller', desc: 'Future fate unknown to user' },
            { key: 'formal_recycling', label: 'Formal e-waste recycling', desc: 'Certified material recovery' },
            { key: 'general_waste', label: 'General municipal waste', desc: 'Landfill / municipal incineration' },
            { key: 'unknown', label: 'I don’t know', desc: 'Downstream path unstated' },
          ].map((item) => {
            const isSelected = situation.oldPhoneFate === item.key;
            return (
              <button
                key={item.key}
                type="button"
                className={`option-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => update({ oldPhoneFate: item.key as any })}
              >
                <div className="option-header-row">
                  <span className="option-title">{item.label}</span>
                  <span className="option-radio">
                    {isSelected && <Check size={12} strokeWidth={3} />}
                  </span>
                </div>
                <span className="option-subtitle">{item.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Advancement Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32 }}>
        <button
          className="btn btn-primary"
          style={{ padding: '14px 28px', fontSize: '1.05rem' }}
          onClick={onComplete}
        >
          Proceed to Self-Inquiry
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
