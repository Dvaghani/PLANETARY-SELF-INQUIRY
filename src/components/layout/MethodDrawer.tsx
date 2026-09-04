// Method & Assumptions Drawer: Progressive Disclosure for Technical LCA and Epistemic Architecture

import React from 'react';
import { X, ShieldCheck, Scale, Cpu, Globe, Info } from 'lucide-react';

interface MethodDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodDrawer: React.FC<MethodDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="method-drawer-title">
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Scale size={20} className="text-primary" />
            <h3 id="method-drawer-title" style={{ fontSize: '1.2rem', margin: 0 }}>
              Method & Scientific Assumptions
            </h3>
          </div>
          <button className="btn btn-subtle btn-sm" onClick={onClose} aria-label="Close drawer">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '0.88rem', color: '#334155', margin: 0 }}>
              <strong>Progressive Disclosure Policy:</strong> To keep the public questionnaire accessible and friendly, technical terms (such as GWP100, cut-off allocation, and grid carbon intensity) are kept in this reference drawer rather than cluttered across the main flow.
            </p>
          </div>

          {/* Section 1: Tripartite Epistemic Structure */}
          <div className="drawer-row">
            <div className="drawer-row-label" style={{ color: 'var(--accent-science)' }}>
              1. Tripartite Epistemic Separation
            </div>
            <div className="drawer-row-value">
              Every statement in this application belongs to one of three strictly separated domains:
              <ul style={{ paddingLeft: 20, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li>
                  <strong style={{ color: 'var(--accent-science)' }}>SCIENCE / EMPIRICAL:</strong> Externally testable claims, peer-reviewed Life Cycle Assessments (LCAs), IPCC AR6 data, and physical resource measurements.
                </li>
                <li>
                  <strong style={{ color: 'var(--accent-ap)' }}>AP FRAMEWORK / PHILOSOPHICAL:</strong> Core inquiries inspired by Acharya Prashant sources exploring psychological incompleteness, external referencing, and direct observation without self-deception.
                </li>
                <li>
                  <strong style={{ color: 'var(--accent-project)' }}>PROJECT INTERPRETATION:</strong> Planetary Self-Inquiry's authored bridges, question juxtapositions, and visual models (such as <em>Protect My Four</em>).
                </li>
              </ul>
            </div>
          </div>

          {/* Section 2: Prospective Decision Boundary */}
          <div className="drawer-row">
            <div className="drawer-row-label">2. Prospective Decision Boundary (Keep Pathway)</div>
            <div className="drawer-row-value">
              When deciding whether to keep an existing phone, historical manufacturing emissions are sunk events in the past. Under standard prospective decision boundaries (ISO 14044), keeping the phone incurs <strong>0 kg new prospective production emissions</strong>; its future burden is limited to battery charging, maintenance, and eventual recycling.
            </div>
          </div>

          {/* Section 3: Cut-Off Accounting for Second-Hand and Refurbished */}
          <div className="drawer-row">
            <div className="drawer-row-label">3. Cut-Off Accounting & Rebound Dynamics</div>
            <div className="drawer-row-value">
              Following <strong>ITU-T L.1410</strong> guidelines for ICT second lives, we apply cut-off accounting. Historical manufacturing emissions are not recharged to the second user. However, we do not grant an automatic &quot;-1 new phone avoided&quot; credit. As demonstrated in 2026 secondary electronics research, second-hand transactions in real markets exhibit rebound and displacement coefficients (~0.40 in studied US contexts), rather than a 1:1 displacement.
            </div>
          </div>

          {/* Section 4: ADEME Reference Restriction */}
          <div className="drawer-row">
            <div className="drawer-row-label">4. The 7.61 kg CO2e Refurbished Figure</div>
            <div className="drawer-row-value">
              The widely cited <strong>7.61 kg CO2e</strong> figure originates from ADEME&apos;s (2022) study of a specific 2-year refurbished reference scenario in France. We explicitly refuse to apply 7.61 kg as a universal constant across arbitrary refurbished devices or vendor claims. Where vendor data is uncertified, the footprint is reported as <em>unquantified</em> rather than defaulted.
            </div>
          </div>

          {/* Section 5: Atmospheric & Global Warming Mechanism */}
          <div className="drawer-row">
            <div className="drawer-row-label">5. Near-Linear Cumulative Warming (IPCC AR6 WG1)</div>
            <div className="drawer-row-value">
              The connection between handset manufacturing/charging and planetary temperature is governed by IPCC AR6 WG1: each 1,000 GtCO2 of cumulative human emissions leads to ~0.45°C of warming. Smartphone emissions accumulate incrementally in this shared atmospheric pool. We strictly prohibit translating one phone into a fake fraction of a degree Celsius or blaming it for a specific storm.
            </div>
          </div>

          {/* Section 6: Non-Diagnostic Policy & Privacy */}
          <div className="drawer-row">
            <div className="drawer-row-label">6. Non-Diagnostic Rule & Client-Side Privacy</div>
            <div className="drawer-row-value">
              The application never diagnoses the user (no &quot;you are greedy&quot; or &quot;your ego is rationalising&quot;). It only juxtaposes explicit statements made by the user. All calculations run client-side; no answers or person cards are uploaded or sold.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
