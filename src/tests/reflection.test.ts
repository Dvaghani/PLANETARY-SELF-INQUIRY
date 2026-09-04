// Reflection Test Suite: Testing AP reflection grammar & non-diagnostic invariant

import { describe, it, expect } from 'vitest';
import { buildReflection, assertNoPsychologicalDiagnosis } from '../lib/reflection-engine';
import { SituationState } from '../types/situation';
import { InquiryAnswers } from '../types/inquiry';

const dummySituation: SituationState = {
  currentModelId: 'generic_smartphone',
  problemType: 'none',
  isSafeToUse: 'yes',
  meetsRequiredNeeds: 'yes',
  knowsSecuritySupportStatus: 'yes',
  hasHardwareRepairNeed: false,
  isReliableRepairAvailable: 'yes',
  remainingAdequateHorizon: { option: '1_to_2y', minYears: 1.0, maxYears: 2.0 },
  chargingLocationCode: 'DE',
  oldPhoneFate: 'store_unused',
};

describe('AP Reflection Grammar & Non-Diagnostic Constraints', () => {
  it('Mandatory grammar elements are always present', () => {
    const answers: InquiryAnswers = {
      APQ1_FUNCTION: 'It works for calls and browsing.',
      APQ2_EXPECTATION: 'I want a fresh sleek feeling.',
      APQ3_ORIGIN: 'Saw the phone launch advertisement.',
      APQ4_VISIBILITY: 'I like having something stylish in meetings.',
      APQ5_NONPURCHASE: 'Staying with this one feels slightly dull.',
      APQ6_RESEE: 'My phone is fine, but I like new gadgets.',
    };

    const { grammar } = buildReflection(dummySituation, answers);
    expect(grammar.restatement).toBeDefined();
    expect(grammar.restatement.length).toBeGreaterThan(10);
    expect(grammar.question).toBeDefined();
    expect(grammar.question.length).toBeGreaterThan(10);
    expect(grammar.openChoice).toBeDefined();
  });

  it('Strictly forbids psychological diagnosis phrases', () => {
    expect(() => assertNoPsychologicalDiagnosis('You are greedy and seeking validation.')).toThrow();
    expect(() => assertNoPsychologicalDiagnosis('Your ego wants this device.')).toThrow();
    expect(() => assertNoPsychologicalDiagnosis('Deep down you are rationalising.')).toThrow();
  });

  it('Preserves user text in restatement', () => {
    const answers: InquiryAnswers = {
      APQ1_FUNCTION: 'Required banking app crashed twice yesterday.',
      APQ2_EXPECTATION: 'No constant crashes.',
      APQ3_ORIGIN: 'When the app stopped loading.',
      APQ4_VISIBILITY: 'Zero difference.',
      APQ5_NONPURCHASE: 'I cannot complete work payments.',
      APQ6_RESEE: 'I need a working banking app.',
    };

    const { grammar } = buildReflection(dummySituation, answers);
    expect(grammar.restatement).toContain('Required banking app crashed twice yesterday.');
  });
});
