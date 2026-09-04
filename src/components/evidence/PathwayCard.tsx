// Pathway Card Component for Stage 3 Evidence Comparison

import React from 'react';
import { PathwayEvaluation } from '../../types/evidence';
import { AlertCircle, HelpCircle, CheckCircle2, ChevronRight, Layers, Droplet, Trash2, Cpu } from 'lucide-react';

interface PathwayCardProps {
  evaluation: PathwayEvaluation;
  onOpenEvidence: (recordId?: string) => void;
  isSelectedForPlanetary: boolean;
  onSelectForPlanetary: () => void;
}

export const PathwayCard: React.FC<PathwayCardProps> = ({
  evaluation,
  onOpenEvidence,
  isSelectedForPlanetary,
  onSelectForPlanetary,
}) => {
  const { pathway, title, subtitle, isFeasible, infeasibilityReason, climate, materials, water, waste } = evaluation;

  return (
    <div
      className={`card card-hover ${isSelectedForPlanetary ? 'selected-pathway' : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        borderLeft: isSelectedForPlanetary ? '4px solid var(--accent-science)' : undefined,
        background: !isFeasible ? '#fffaf9' : '#ffffff',
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-science" style={{ fontSize: '0.72rem' }}>
              {pathway}
            </span>
            {!isFeasible && (
              <span className="badge badge-neutral" style={{ color: '#991b1b', background: '#fee2e2' }}>
                Infeasible State
              </span>
            )}
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '4px 0 2px' }}>
            {title}
          </h3>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>{subtitle}</p>
        </div>

        <button
          className={`btn btn-sm ${isSelectedForPlanetary ? 'btn-primary' : 'btn-secondary'}`}
          onClick={onSelectForPlanetary}
          style={{ fontSize: '0.78rem' }}
        >
          {isSelectedForPlanetary ? 'Viewing in Pathway' : 'Trace on Planet'}
        </button>
      </div>

      {/* Infeasibility Alert if applicable */}
      {!isFeasible && infeasibilityReason && (
        <div style={{ background: '#fef2f2', padding: 12, borderRadius: 8, border: '1px solid #fecaca', display: 'flex', gap: 8 }}>
          <AlertCircle size={16} color="#dc2626" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: '0.85rem', color: '#991b1b', margin: 0 }}>
            {infeasibilityReason}
          </p>
        </div>
      )}

      {/* Quantitative Climate Indicator */}
      <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569' }}>
            Prospective Climate Burden
          </span>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Horizon: {climate.horizonYears ? (Array.isArray(climate.horizonYears) ? `${climate.horizonYears[0]}–${climate.horizonYears[1]} yrs` : `${climate.horizonYears} yrs`) : 'Unspecified'}
          </span>
        </div>

        {climate.status === 'infeasible' ? (
          <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#991b1b' }}>
            Infeasible without repair
          </div>
        ) : climate.status === 'unknown' ? (
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#64748b', fontStyle: 'italic' }}>
              Not enough evidence to quantify responsibly
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 2 }}>
              Unknown != 0 &bull; We refuse to invent a default number.
            </div>
          </div>
        ) : climate.rangeKgCO2e ? (
          <div className="font-mono" style={{ fontSize: '1.45rem', fontWeight: 700, color: '#1e3a8a' }}>
            {climate.rangeKgCO2e[0]} – {climate.rangeKgCO2e[1]} <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>kg CO2e</span>
          </div>
        ) : climate.centralKgCO2e !== null ? (
          <div className="font-mono" style={{ fontSize: '1.45rem', fontWeight: 700, color: '#1e3a8a' }}>
            ~{climate.centralKgCO2e} <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>kg CO2e</span>
          </div>
        ) : (
          <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Omitted / Unquantified</div>
        )}

        <p style={{ fontSize: '0.84rem', color: '#334155', marginTop: 8, lineHeight: 1.4 }}>
          {climate.explanation}
        </p>

        {/* Breakdown Badges */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10, fontSize: '0.74rem' }}>
          {climate.breakdown.productionKg !== null && (
            <span style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: 4 }}>
              Fab: {Array.isArray(climate.breakdown.productionKg) ? `${climate.breakdown.productionKg[0]}–${climate.breakdown.productionKg[1]}` : climate.breakdown.productionKg} kg
            </span>
          )}
          {climate.breakdown.repairKg !== null && climate.breakdown.repairKg !== 0 && (
            <span style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: 4 }}>
              Repair part: {Array.isArray(climate.breakdown.repairKg) ? `${climate.breakdown.repairKg[0]}–${climate.breakdown.repairKg[1]}` : climate.breakdown.repairKg} kg
            </span>
          )}
          {climate.breakdown.useChargingKg !== null && (
            <span style={{ background: '#e2e8f0', padding: '2px 8px', borderRadius: 4 }}>
              Charging: {Array.isArray(climate.breakdown.useChargingKg) ? `${climate.breakdown.useChargingKg[0]}–${climate.breakdown.useChargingKg[1]}` : climate.breakdown.useChargingKg} kg
            </span>
          )}
        </div>
      </div>

      {/* Non-Climate Domains (Separate, Never Collapsed into a Single Score) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.82rem' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <Cpu size={14} color="#475569" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong>Materials:</strong> {materials.summary}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <Droplet size={14} color="#0284c7" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong>Water:</strong> {water.summary}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <Trash2 size={14} color="#64748b" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong>Waste / Circularity:</strong> {waste.summary}
          </div>
        </div>
      </div>

      {/* Inspect Evidence Button */}
      <div style={{ marginTop: 'auto', paddingTop: 8, borderTop: '1px solid var(--border-subtle)' }}>
        <button
          className="btn btn-subtle btn-sm"
          style={{ width: '100%', justifyContent: 'space-between', padding: '6px 4px', fontSize: '0.8rem' }}
          onClick={() => onOpenEvidence(climate.recordIds[0])}
        >
          <span>Why are we saying this? (Inspect Evidence)</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};
