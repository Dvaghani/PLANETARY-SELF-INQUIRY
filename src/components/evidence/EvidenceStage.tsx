// Stage 3: Empirical Evidence & Planetary Bridges Component

import React, { useState } from 'react';
import { SituationState } from '../../types/situation';
import { PersonCard } from '../../types/planetary';
import { AlternativePathway, PathwayEvaluation } from '../../types/evidence';
import { evaluateAllPathways } from '../../lib/climate-calculation';
import { PathwayCard } from './PathwayCard';
import { PlanetaryPathway } from '../planetary/PlanetaryPathway';
import { ProtectMyFour } from '../planetary/ProtectMyFour';
import { ArrowRight, Info, Layers, CheckCircle2 } from 'lucide-react';

interface EvidenceStageProps {
  situation: SituationState;
  myFour: PersonCard[];
  onChangeMyFour: (cards: PersonCard[]) => void;
  onOpenEvidence: (recordId?: string) => void;
  onComplete: () => void;
  specialOptions?: {
    candidateModelId?: string;
    refurbishedScenarioIsAdemeRef?: boolean;
  };
}

export const EvidenceStage: React.FC<EvidenceStageProps> = ({
  situation,
  myFour,
  onChangeMyFour,
  onOpenEvidence,
  onComplete,
  specialOptions,
}) => {
  const [selectedPathway, setSelectedPathway] = useState<AlternativePathway>('NEW');

  // Evaluate all 5 physical pathways deterministically
  const pathwayEvaluations = evaluateAllPathways(situation, specialOptions);

  return (
    <div className="evidence-stage">
      {/* Hero Header */}
      <div className="stage-hero">
        <div className="stage-tagline">Stage 3 of 4 &bull; Physical Consequence & Global Systems</div>
        <h2 className="stage-title">What changes physically if you choose each path?</h2>
        <p className="stage-desc">
          Comparing equivalent adequate service over the same user-relevant horizon. We do not collapse climate, materials, water, and circularity into a single simplified &ldquo;eco score.&rdquo;
        </p>
      </div>

      {/* Five Pathways Comparison Cards */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a' }}>
            The 5 Realistic Hardware Pathways
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Click &ldquo;Trace on Planet&rdquo; to visualize systemic connections
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {(['KEEP', 'REPAIR', 'USED', 'REFURBISHED', 'NEW'] as AlternativePathway[]).map((p) => (
            <PathwayCard
              key={p}
              evaluation={pathwayEvaluations[p]}
              onOpenEvidence={onOpenEvidence}
              isSelectedForPlanetary={selectedPathway === p}
              onSelectForPlanetary={() => setSelectedPathway(p)}
            />
          ))}
        </div>
      </div>

      {/* Major Visual Bridge 1: The Planetary Pathway */}
      <PlanetaryPathway
        selectedPathway={selectedPathway}
        onSelectPathway={setSelectedPathway}
        onOpenEvidence={onOpenEvidence}
      />

      {/* Major Visual Bridge 2: Protect My Four */}
      <ProtectMyFour cards={myFour} onChange={onChangeMyFour} />

      {/* Advancement Button to Final Choice */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32 }}>
        <button
          className="btn btn-primary"
          style={{ padding: '14px 28px', fontSize: '1.05rem' }}
          onClick={onComplete}
        >
          Proceed to Final Decision
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
