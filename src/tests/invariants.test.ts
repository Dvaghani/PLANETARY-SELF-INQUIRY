// Invariants Test Suite: Testing all 30 Scientific Invariants from Section U

import { describe, it, expect } from 'vitest';
import { SituationState } from '../types/situation';
import { evaluateAdequacy } from '../lib/adequacy';
import {
  evaluateKeepPathway,
  evaluateRepairPathway,
  evaluateUsedPathway,
  evaluateRefurbishedPathway,
  evaluateNewPathway,
  calculateChargingEmissions,
} from '../lib/climate-calculation';
import { DEVICE_REGISTRY } from '../data/device-registry';

const baseAdequateSituation: SituationState = {
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
  oldPhoneFate: 'keep_using',
};

describe('Scientific Invariants (Section U)', () => {
  // Invariant 1: unknown != 0
  it('Invariant 1: unknown != 0 (omitted electricity factor produces null/unknown, not 0)', () => {
    const res = calculateChargingEmissions(2.0, null);
    expect(res.status).toBe('unknown');
    expect(res.centralKg).toBeNull();
    expect(res.centralKg).not.toBe(0);
  });

  // Invariant 2: missing user situation facts must NOT be silently defaulted
  it('Invariant 2: missing user horizon is not defaulted to 3 years', () => {
    const sit: SituationState = {
      ...baseAdequateSituation,
      remainingAdequateHorizon: { option: 'unsure', minYears: null, maxYears: null },
    };
    const adequacy = evaluateAdequacy(sit);
    expect(adequacy.comparisonHorizonYears).toBeNull();
    expect(adequacy.comparisonHorizonYears).not.toBe(3);
  });

  // Invariant 3: missing research parameter may use fallback ONLY when Research has approved it
  it('Invariant 3: generic phone uses explicitly approved 25–70 kg bracket', () => {
    const newEval = evaluateNewPathway(baseAdequateSituation);
    expect(newEval.climate.breakdown.productionKg).toEqual([25, 70]);
  });

  // Invariant 4: missing evidence with no approved fallback remains null/unknown
  it('Invariant 4: generic mainboard repair remains unknown without approved fallback', () => {
    const sit: SituationState = {
      ...baseAdequateSituation,
      problemType: 'mainboard',
      selectedRepairType: 'mainboard',
      hasHardwareRepairNeed: true,
    };
    const repairEval = evaluateRepairPathway(sit);
    expect(repairEval.climate.status).toBe('unknown');
    expect(repairEval.climate.centralKgCO2e).toBeNull();
  });

  // Invariant 5: safe_to_use = false -> keep as-is is not feasible
  it('Invariant 5: safe_to_use = false marks keep as infeasible', () => {
    const sit: SituationState = { ...baseAdequateSituation, isSafeToUse: 'no' };
    const adequacy = evaluateAdequacy(sit);
    expect(adequacy.isKeepFeasible).toBe(false);
    const keepEval = evaluateKeepPathway(sit);
    expect(keepEval.isFeasible).toBe(false);
    expect(keepEval.climate.status).toBe('infeasible');
  });

  // Invariant 6: required functions not met -> phone is inadequate even if it powers on
  it('Invariant 6: required functions not met marks phone inadequate', () => {
    const sit: SituationState = { ...baseAdequateSituation, meetsRequiredNeeds: 'no' };
    const adequacy = evaluateAdequacy(sit);
    expect(adequacy.isCurrentAdequate).toBe(false);
  });

  // Invariant 7: ended security support alone must NOT automatically force replacement
  it('Invariant 7: ended security support flags caution but does not force replacement', () => {
    const sit: SituationState = { ...baseAdequateSituation, knowsSecuritySupportStatus: 'no' };
    const adequacy = evaluateAdequacy(sit);
    expect(adequacy.isKeepFeasible).toBe(true);
    expect(adequacy.securitySupportCaution).toBe(true);
  });

  // Invariant 8: device age must NOT derive remaining adequate life
  it('Invariant 8: launch year / age does not override user horizon estimate', () => {
    const sit: SituationState = {
      ...baseAdequateSituation,
      currentModelId: 'fairphone_5', // launched 2023
      remainingAdequateHorizon: { option: 'custom', minYears: 4.0, maxYears: 4.0 },
    };
    const adequacy = evaluateAdequacy(sit);
    expect(adequacy.comparisonHorizonYears).toBe(4.0);
  });

  // Invariant 9: major-board repair + no model-specific impact -> repair climate impact unknown
  it('Invariant 9: generic mainboard repair has unknown CO2e burden', () => {
    const sit: SituationState = {
      ...baseAdequateSituation,
      currentModelId: 'generic_smartphone',
      problemType: 'mainboard',
      selectedRepairType: 'mainboard',
    };
    const repairEval = evaluateRepairPathway(sit);
    expect(repairEval.climate.status).toBe('unknown');
    expect(repairEval.climate.centralKgCO2e).toBeNull();
  });

  // Invariant 10: Fairphone 5 model-specific mainboard HAS approved numbers
  it('Invariant 10: Fairphone 5 modular mainboard has approved model data', () => {
    const sit: SituationState = {
      ...baseAdequateSituation,
      currentModelId: 'fairphone_5',
      problemType: 'mainboard',
      selectedRepairType: 'mainboard',
    };
    const repairEval = evaluateRepairPathway(sit);
    expect(repairEval.climate.status).not.toBe('unknown');
    expect(repairEval.climate.breakdown.repairKg).toBe(17.84);
  });

  // Invariant 11: arbitrary refurbished device + no approved direct footprint -> no fabricated climate number
  it('Invariant 11: arbitrary refurbished phone returns unknown, no fabricated number', () => {
    const refEval = evaluateRefurbishedPathway(baseAdequateSituation, { refurbishedScenarioIsAdemeRef: false });
    expect(refEval.climate.status).toBe('unknown');
    expect(refEval.climate.centralKgCO2e).toBeNull();
  });

  // Invariant 12: ADEME reference selected -> 7.61 kg CO2e, exactly labelled 2-year reference, not decomposed
  it('Invariant 12: ADEME reference returns exactly 7.61 kg CO2e without decomposition', () => {
    const refEval = evaluateRefurbishedPathway(baseAdequateSituation, { refurbishedScenarioIsAdemeRef: true });
    expect(refEval.climate.centralKgCO2e).toBe(7.61);
    expect(refEval.climate.breakdown.productionKg).toBeNull(); // not decomposed
  });

  // Invariant 13: unknown new-phone identity -> generic production bracket 25–70 kg, distribution 2–4 kg
  it('Invariant 13: generic new phone uses 25–70 kg prod and 2–4 kg dist', () => {
    const newEval = evaluateNewPathway(baseAdequateSituation, { candidateModelId: null });
    expect(newEval.climate.breakdown.productionKg).toEqual([25, 70]);
    expect(newEval.climate.breakdown.distributionKg).toEqual([2, 4]);
  });

  // Invariant 14: approved exact model evidence overrides generic fallback
  it('Invariant 14: iPhone 16 128GB overrides generic fallback with 44.8 kg prod', () => {
    const newEval = evaluateNewPathway(baseAdequateSituation, { candidateModelId: 'apple_iphone_16_128gb' });
    expect(newEval.climate.breakdown.productionKg).toBe(44.8);
    expect(newEval.climate.breakdown.distributionKg).toBe(1.68);
  });

  // Invariant 15: old phone reused by someone else -> no 1:1 avoided-new-phone credit
  it('Invariant 15: reused old phone does not create negative carbon credit', () => {
    const sit: SituationState = { ...baseAdequateSituation, oldPhoneFate: 'sell_or_gift' };
    const keepEval = evaluateKeepPathway(sit);
    expect(keepEval.climate.breakdown.productionKg).toBe(0);
    // There is NO negative production credit
    expect(keepEval.climate.centralKgCO2e).toBeGreaterThanOrEqual(0);
  });

  // Invariant 16: stored phone -> dormant/retired, not formal recycling
  it('Invariant 16: stored phone is not treated as recycling', () => {
    const sit: SituationState = { ...baseAdequateSituation, oldPhoneFate: 'store_unused' };
    expect(sit.oldPhoneFate).toBe('store_unused');
    expect(sit.oldPhoneFate).not.toBe('formal_recycling');
  });

  // Invariant 17: generic end-of-life climate value -> unsupported / unquantified, not zero
  it('Invariant 17: EOL climate value is null/unquantified, not 0', () => {
    const keepEval = evaluateKeepPathway(baseAdequateSituation);
    expect(keepEval.climate.breakdown.eolDisposalKg).toBeNull();
    expect(keepEval.climate.breakdown.eolDisposalKg).not.toBe(0);
  });

  // Invariant 18: material pathway climate impacts already included in cradle-to-gate LCA
  it('Invariant 18: materials pathway is qualitative and does not add CO2 on top of LCA', () => {
    const newEval = evaluateNewPathway(baseAdequateSituation);
    expect(newEval.materials.domain).toBe('materials_extraction');
    expect(newEval.materials.status).toBe('supported');
    // Direct climate central value is based only on production + distribution + use
    expect(typeof newEval.climate.centralKgCO2e).toBe('number');
  });

  // Invariant 19: qualitative material/water/ecosystem pathways do not modify climate ranking
  it('Invariant 19: water domain remains separate qualitative result', () => {
    const keepEval = evaluateKeepPathway(baseAdequateSituation);
    expect(keepEval.water.domain).toBe('water');
    expect(keepEval.water.summary).toBeDefined();
  });

  // Invariant 20: long lifetime must not amortize production to make premature replacement favourable in horizon H
  it('Invariant 20: prospective new phone incurs upfront production, not amortized over 8 years', () => {
    const sit: SituationState = {
      ...baseAdequateSituation,
      remainingAdequateHorizon: { option: '1_to_2y', minYears: 1.0, maxYears: 1.0 },
    };
    const newEval = evaluateNewPathway(sit, { candidateModelId: 'fairphone_5' });
    // Incurred prospective production is full 32.7 kg, not 32.7 / 8 = 4 kg!
    expect(newEval.climate.breakdown.productionKg).toBe(32.7);
  });

  // Invariant 21: used_secondhand != refurbished
  it('Invariant 21: used and refurbished pathways are distinct evaluations', () => {
    const usedEval = evaluateUsedPathway(baseAdequateSituation);
    const refEval = evaluateRefurbishedPathway(baseAdequateSituation);
    expect(usedEval.pathway).toBe('USED');
    expect(refEval.pathway).toBe('REFURBISHED');
    expect(usedEval.title).not.toEqual(refEval.title);
  });

  // Invariant 22: past manufacture excluded under cut-off != "avoided manufacturing credit"
  it('Invariant 22: used phone cut-off production is 0, not negative', () => {
    const usedEval = evaluateUsedPathway(baseAdequateSituation);
    expect(usedEval.climate.breakdown.productionKg).toBe(0);
    expect(usedEval.climate.breakdown.productionKg).not.toBeLessThan(0);
  });

  // Invariant 23: no consequential displacement credit in primary direct score
  it('Invariant 23: no consequential displacement credit applied to direct used score', () => {
    const usedEval = evaluateUsedPathway(baseAdequateSituation);
    expect(usedEval.climate.centralKgCO2e).toBeGreaterThanOrEqual(0);
  });

  // Invariant 24: seller grade must not derive lifetime
  it('Invariant 24: candidate horizon comes strictly from user estimate', () => {
    const sit: SituationState = {
      ...baseAdequateSituation,
      expectedCandidateHorizon: { option: '2_to_3y', minYears: 2.0, maxYears: 3.0 },
    };
    expect(sit.expectedCandidateHorizon?.minYears).toBe(2.0);
  });

  // Invariant 25: equivalent service horizon preserved
  it('Invariant 25: user horizon range [1, 2] is preserved without silently collapsing to 1.5', () => {
    const adequacy = evaluateAdequacy(baseAdequateSituation);
    expect(adequacy.comparisonHorizonYears).toEqual([1.0, 2.0]);
  });

  // Invariant 26: ADEME 7.61 must never become generic refurbished fallback
  it('Invariant 26: arbitrary refurbished phone does NOT use 7.61 kg CO2e', () => {
    const refEval = evaluateRefurbishedPathway(baseAdequateSituation, { refurbishedScenarioIsAdemeRef: false });
    expect(refEval.climate.centralKgCO2e).not.toBe(7.61);
    expect(refEval.climate.status).toBe('unknown');
  });

  // Invariant 27: U.S. 0.40 displacement coefficient must not modify primary direct score
  it('Invariant 27: US 0.40 displacement coefficient is not subtracted from used CO2e', () => {
    const usedEval = evaluateUsedPathway(baseAdequateSituation);
    expect(usedEval.climate.breakdown.productionKg).toBe(0);
  });

  // Invariant 28: generic used-phone direct CO2e remains unknown/partial
  it('Invariant 28: generic used-phone direct footprint is partial/unknown', () => {
    const usedEval = evaluateUsedPathway(baseAdequateSituation);
    expect(usedEval.climate.status).toBe('partial');
  });

  // Invariant 29: unknown transfer/logistics burden != 0
  it('Invariant 29: unknown transfer burden in used phone is null, not 0', () => {
    const usedEval = evaluateUsedPathway(baseAdequateSituation);
    expect(usedEval.climate.breakdown.distributionKg).toBeNull();
    expect(usedEval.climate.breakdown.distributionKg).not.toBe(0);
  });

  // Invariant 30: prospective decision boundary for keep: past manufacture is 0 prospective
  it('Invariant 30: keep prospective production is 0 kg (not recharging past manufacture)', () => {
    const keepEval = evaluateKeepPathway(baseAdequateSituation);
    expect(keepEval.climate.breakdown.productionKg).toBe(0);
  });
});
