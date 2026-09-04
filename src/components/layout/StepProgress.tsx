// Stage Stepper Navigation Component

import React from 'react';
import { Check } from 'lucide-react';

export type StageId = 1 | 2 | 3 | 4;

interface StepProgressProps {
  currentStage: StageId;
  onNavigate: (stage: StageId) => void;
  completedStages: number[];
}

const STAGES = [
  { id: 1 as StageId, number: 1, label: 'Situation', desc: 'Hardware & Adequacy' },
  { id: 2 as StageId, number: 2, label: 'Inquiry', desc: 'Desire & Origin' },
  { id: 3 as StageId, number: 3, label: 'Evidence', desc: 'Physical Pathways & Systems' },
  { id: 4 as StageId, number: 4, label: 'Choice', desc: 'Your Autonomous Decision' },
];

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStage,
  onNavigate,
  completedStages,
}) => {
  return (
    <nav className="stepper-nav" aria-label="Inquiry Stages">
      {STAGES.map((s) => {
        const isActive = currentStage === s.id;
        const isCompleted = completedStages.includes(s.id);

        return (
          <button
            key={s.id}
            className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            onClick={() => onNavigate(s.id)}
            aria-current={isActive ? 'step' : undefined}
          >
            <span className="step-circle">
              {isCompleted && !isActive ? <Check size={12} strokeWidth={3} /> : s.number}
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.2 }}>
              <strong style={{ fontSize: '0.85rem' }}>{s.label}</strong>
              <span style={{ fontSize: '0.72rem', opacity: isActive ? 0.85 : 0.65 }}>
                {s.desc}
              </span>
            </span>
          </button>
        );
      })}
    </nav>
  );
};
