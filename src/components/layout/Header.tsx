// Header Component with Epistemic Badges, Demo Case Selector, and Method Drawer Trigger

import React from 'react';
import { Compass, BookOpen, Layers, Sparkles } from 'lucide-react';
import { DEMO_CASES } from '../../lib/demo-cases';

interface HeaderProps {
  onSelectDemo: (caseId: string) => void;
  onOpenMethod: () => void;
  currentDemoId?: string;
}

export const Header: React.FC<HeaderProps> = ({ onSelectDemo, onOpenMethod, currentDemoId }) => {
  return (
    <header className="site-header">
      <div className="brand-block">
        <div className="brand-icon" title="Planetary Self-Inquiry">
          <Compass size={22} />
        </div>
        <div>
          <h1 className="brand-title">Planetary Self-Inquiry</h1>
          <p className="brand-subtitle">A Science-First Public Reasoning System</p>
        </div>
      </div>

      <div className="header-actions">
        {/* Epistemic Badges Legend */}
        <div className="badge badge-science" title="Claims verified by external empirical literature & LCA">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
          Empirical Science
        </div>
        <div className="badge badge-ap" title="Philosophical inquiries grounded in Acharya Prashant sources">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
          AP Framework
        </div>
        <div className="badge badge-project" title="Planetary Self-Inquiry visual bridges & structure">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
          Project Bridge
        </div>

        {/* Demo Case Selector */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <select
            className="select-input"
            style={{ padding: '6px 12px', fontSize: '0.84rem', minWidth: '170px' }}
            value={currentDemoId || ''}
            onChange={(e) => {
              if (e.target.value) onSelectDemo(e.target.value);
            }}
          >
            <option value="" disabled>
              Load Demo Case (A–G)...
            </option>
            {Object.values(DEMO_CASES).map((dc) => (
              <option key={dc.id} value={dc.id}>
                Case {dc.code}: {dc.title.replace(`Case ${dc.code}: `, '')}
              </option>
            ))}
          </select>
        </div>

        {/* Method & Assumptions Trigger */}
        <button
          className="btn btn-secondary btn-sm"
          onClick={onOpenMethod}
          title="Inspect scientific methodology, boundaries, and LCA standards"
        >
          <BookOpen size={14} />
          Method & Assumptions
        </button>
      </div>
    </header>
  );
};
