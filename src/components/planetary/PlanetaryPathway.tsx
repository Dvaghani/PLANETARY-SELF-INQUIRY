// Visual Bridge: The Planetary Pathway ("From this phone to a shared planet")

import React, { useState } from 'react';
import { Smartphone, Factory, Wind, Globe, ShieldAlert, Users, Sparkles, HelpCircle } from 'lucide-react';
import { AlternativePathway } from '../../types/evidence';

interface PlanetaryPathwayProps {
  selectedPathway: AlternativePathway;
  onSelectPathway: (p: AlternativePathway) => void;
  onOpenEvidence: (recordId: string) => void;
}

export const PlanetaryPathway: React.FC<PlanetaryPathwayProps> = ({
  selectedPathway,
  onSelectPathway,
  onOpenEvidence,
}) => {
  const [activeStep, setActiveStep] = useState<number>(3);

  return (
    <div className="card" style={{ background: '#f8fafc', border: '1px solid #cbd5e1', marginBottom: 36 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        <div>
          <div className="badge badge-project" style={{ marginBottom: 6 }}>
            Major Visual Bridge &bull; Scientific Consequence Flow
          </div>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a' }}>
            From This Phone to a Shared Planet
          </h3>
          <p style={{ fontSize: '0.92rem', color: '#475569', maxWidth: '640px' }}>
            Every electronic device participates in physical planetary systems. Examine how choosing{' '}
            <strong style={{ color: '#0f172a' }}>{selectedPathway}</strong> ripples outward from direct hardware demands to cumulative atmospheric risks.
          </p>
        </div>

        {/* Pathway switcher pill */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {(['KEEP', 'REPAIR', 'USED', 'REFURBISHED', 'NEW'] as AlternativePathway[]).map((p) => (
            <button
              key={p}
              className={`btn btn-sm ${selectedPathway === p ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => onSelectPathway(p)}
              style={{ fontSize: '0.78rem', padding: '4px 10px' }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Pathway Steps / Visual Flow */}
      <div className="pathway-flow-container">
        {/* Step 1: Handset Choice */}
        <div className="pathway-step-card" onClick={() => setActiveStep(1)}>
          <div className="pathway-step-indicator">
            <div className="pathway-node-icon" style={{ background: '#eff6ff', color: '#1d4ed8' }}>
              <Smartphone size={20} />
            </div>
            <div className="pathway-connector-line" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#1d4ed8' }}>
              Step 1 &bull; Personal Handset Decision
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', margin: '2px 0 6px' }}>
              Choice: {selectedPathway}
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#475569' }}>
              {selectedPathway === 'KEEP' && 'Retaining existing hardware. Zero new device production is triggered.'}
              {selectedPathway === 'REPAIR' && 'Replacing defective part (e.g. battery or display). Avoids replacing 95%+ of device mass.'}
              {selectedPathway === 'USED' && 'Transferring existing device without industrial remanufacturing (cut-off accounting).'}
              {selectedPathway === 'REFURBISHED' && 'Industrial testing, grading, cleaning, and targeted component replacement.'}
              {selectedPathway === 'NEW' && 'Triggering whole-device primary mineral extraction and semiconductor wafer fabrication.'}
            </p>
          </div>
        </div>

        {/* Step 2: Upstream Physical Pressures */}
        <div className="pathway-step-card" onClick={() => setActiveStep(2)}>
          <div className="pathway-step-indicator">
            <div className="pathway-node-icon" style={{ background: '#fef3c7', color: '#b45309' }}>
              <Factory size={20} />
            </div>
            <div className="pathway-connector-line" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#b45309' }}>
              Step 2 &bull; Upstream Physical Pressures
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', margin: '2px 0 6px' }}>
              Raw Materials, Fab Energy & Logistics
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#475569' }}>
              {selectedPathway === 'NEW' ? (
                <span>
                  Triggers extraction of 40+ metals (lithium, cobalt, copper, gold) reviewed across 47 ores in Nature Reviews (2025), plus high-temperature wafer lithography.
                </span>
              ) : selectedPathway === 'REPAIR' ? (
                <span>Confined to single component manufacturing (e.g., 0.3–0.7 kg CO2e for battery replacement).</span>
              ) : (
                <span>Diverts or defers whole-chassis mining pressures; operational energy dominates.</span>
              )}
            </p>
            <button
              className="btn btn-subtle btn-sm"
              style={{ padding: '2px 6px', fontSize: '0.75rem', marginTop: 4 }}
              onClick={(e) => {
                e.stopPropagation();
                onOpenEvidence('REC_MINING_PRESSURES_2025');
              }}
            >
              Why are we saying this? (Nature Reviews 2025)
            </button>
          </div>
        </div>

        {/* Step 3: Shared Atmospheric & Biospheric Systems */}
        <div className="pathway-step-card" onClick={() => setActiveStep(3)}>
          <div className="pathway-step-indicator">
            <div className="pathway-node-icon" style={{ background: '#ecfdf5', color: '#047857' }}>
              <Wind size={20} />
            </div>
            <div className="pathway-connector-line" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#047857' }}>
              Step 3 &bull; Atmospheric Circulation
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', margin: '2px 0 6px' }}>
              Cumulative Global Atmospheric Pool
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#475569' }}>
              Greenhouse gas emissions do not remain where a phone was manufactured or charged. They mix globally within months. Under IPCC AR6 WG1, every 1,000 GtCO2 cumulative emissions causes ~0.45°C of global warming.
            </p>
            <button
              className="btn btn-subtle btn-sm"
              style={{ padding: '2px 6px', fontSize: '0.75rem', marginTop: 4 }}
              onClick={(e) => {
                e.stopPropagation();
                onOpenEvidence('REC_IPCC_CUMULATIVE_WARMING');
              }}
            >
              See IPCC AR6 WG1 Near-Linear Warming Evidence
            </button>
          </div>
        </div>

        {/* Step 4: Shared Regional Risks */}
        <div className="pathway-step-card" onClick={() => setActiveStep(4)}>
          <div className="pathway-step-indicator">
            <div className="pathway-node-icon" style={{ background: '#fee2e2', color: '#b91c1c' }}>
              <Globe size={20} />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#b91c1c' }}>
              Step 4 &bull; Shared Systemic Risks
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', margin: '2px 0 6px' }}>
              Risks to People, Ecosystems, and Places You Care About
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#475569' }}>
              As the cumulative atmospheric energy balance shifts, extreme heat, heavy downpours, droughts, and fire weather intensify across regions where real people live.
            </p>
          </div>
        </div>
      </div>

      {/* Critical Epistemic Callout */}
      <div style={{ background: '#ffffff', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0', display: 'flex', gap: 12 }}>
        <ShieldAlert size={20} color="#0369a1" style={{ flexShrink: 0, marginTop: 2 }} />
        <div style={{ fontSize: '0.85rem', color: '#334155' }}>
          <strong>Scientific Principle:</strong> This is a physical pathway of incremental contribution to shared cumulative pressures, <em>not attribution of a specific disaster or illness to one phone</em>.
        </div>
      </div>
    </div>
  );
};
