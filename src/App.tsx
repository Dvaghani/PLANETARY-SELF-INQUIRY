// Planetary Self-Inquiry: Main Application Entry

import React, { useState } from 'react';
import { SituationState } from './types/situation';
import { InquiryAnswers } from './types/inquiry';
import { PersonCard } from './types/planetary';
import { StageId, StepProgress } from './components/layout/StepProgress';
import { Header } from './components/layout/Header';
import { MethodDrawer } from './components/layout/MethodDrawer';
import { EvidenceDrawer } from './components/evidence/EvidenceDrawer';
import { SituationStage } from './components/situation/SituationStage';
import { InquiryStage } from './components/inquiry/InquiryStage';
import { EvidenceStage } from './components/evidence/EvidenceStage';
import { ChoiceStage } from './components/choice/ChoiceStage';
import { DEMO_CASES } from './lib/demo-cases';

const initialSituation: SituationState = {
  currentModelId: 'generic_smartphone',
  problemType: 'none',
  isSafeToUse: 'yes',
  meetsRequiredNeeds: 'yes',
  knowsSecuritySupportStatus: 'yes',
  hasHardwareRepairNeed: false,
  isReliableRepairAvailable: 'yes',
  remainingAdequateHorizon: {
    option: '1_to_2y',
    minYears: 1.0,
    maxYears: 2.0,
  },
  chargingLocationCode: 'DE',
  oldPhoneFate: 'store_unused',
};

const initialInquiry: InquiryAnswers = {
  APQ1_FUNCTION: '',
  APQ2_EXPECTATION: '',
  APQ3_ORIGIN: '',
  APQ4_VISIBILITY: '',
  APQ5_NONPURCHASE: '',
  APQ6_RESEE: '',
};

export const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<StageId>(1);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [situation, setSituation] = useState<SituationState>(initialSituation);
  const [inquiry, setInquiry] = useState<InquiryAnswers>(initialInquiry);
  const [myFour, setMyFour] = useState<PersonCard[]>([
    { id: '1', role: 'parent', locationCode: 'DE', locationName: 'Germany' },
    { id: '2', role: 'friend', locationCode: 'GB', locationName: 'United Kingdom' },
  ]);
  const [specialOptions, setSpecialOptions] = useState<{
    candidateModelId?: string;
    refurbishedScenarioIsAdemeRef?: boolean;
  }>({});
  const [currentDemoId, setCurrentDemoId] = useState<string>('CASE_A');

  // Drawers
  const [isMethodOpen, setIsMethodOpen] = useState<boolean>(false);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState<boolean>(false);
  const [activeEvidenceRecordId, setActiveEvidenceRecordId] = useState<string | null>(null);

  // Load a demo case seamlessly
  const handleSelectDemo = (caseId: string) => {
    const demo = DEMO_CASES[caseId];
    if (!demo) return;
    setCurrentDemoId(caseId);
    setSituation({ ...demo.situation });
    setInquiry({ ...demo.inquiry });
    setMyFour([...demo.myFour]);
    setSpecialOptions(demo.specialOptions || {});
  };

  const markCompleted = (stage: number) => {
    if (!completedStages.includes(stage)) {
      setCompletedStages([...completedStages, stage]);
    }
  };

  const handleOpenEvidence = (recordId?: string) => {
    setActiveEvidenceRecordId(recordId || 'REC_GENERIC_PROD_BRACKET');
    setIsEvidenceOpen(true);
  };

  const handleRestart = () => {
    setCurrentStage(1);
    setCompletedStages([]);
    setSituation(initialSituation);
    setInquiry(initialInquiry);
    setMyFour([]);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header
        onSelectDemo={handleSelectDemo}
        onOpenMethod={() => setIsMethodOpen(true)}
        currentDemoId={currentDemoId}
      />

      {/* Stage Stepper */}
      <StepProgress
        currentStage={currentStage}
        onNavigate={(stage) => setCurrentStage(stage)}
        completedStages={completedStages}
      />

      {/* Stage Router */}
      <main style={{ flex: 1 }}>
        {currentStage === 1 && (
          <SituationStage
            situation={situation}
            onChange={setSituation}
            onComplete={() => {
              markCompleted(1);
              setCurrentStage(2);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentStage === 2 && (
          <InquiryStage
            situation={situation}
            answers={inquiry}
            onChange={setInquiry}
            onComplete={() => {
              markCompleted(2);
              setCurrentStage(3);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentStage === 3 && (
          <EvidenceStage
            situation={situation}
            myFour={myFour}
            onChangeMyFour={setMyFour}
            onOpenEvidence={handleOpenEvidence}
            specialOptions={specialOptions}
            onComplete={() => {
              markCompleted(3);
              setCurrentStage(4);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentStage === 4 && (
          <ChoiceStage
            situation={situation}
            inquiry={inquiry}
            myFour={myFour}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          marginTop: 60,
          paddingTop: 24,
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
        }}
      >
        <div>
          <strong>Planetary Self-Inquiry</strong> &bull; Science-First Public Reasoning &bull; V0 Vertical Slice
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <span>Client-Side Privacy (Zero Tracking)</span>
          <span>€0/Month Sustainable Hosting</span>
          <button
            className="btn btn-subtle btn-sm"
            onClick={() => setIsMethodOpen(true)}
            style={{ fontSize: '0.82rem', padding: '0 4px' }}
          >
            LCA Methodology
          </button>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <MethodDrawer isOpen={isMethodOpen} onClose={() => setIsMethodOpen(false)} />
      <EvidenceDrawer
        isOpen={isEvidenceOpen}
        onClose={() => setIsEvidenceOpen(false)}
        recordId={activeEvidenceRecordId}
      />
    </div>
  );
};

export default App;
