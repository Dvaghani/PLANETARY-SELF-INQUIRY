// Adequacy & Feasibility Evaluator

import { SituationState } from '../types/situation';

export interface AdequacyAssessment {
  isKeepFeasible: boolean;
  isCurrentAdequate: boolean;
  feasibilityReason?: string;
  adequacyNotes: string[];
  requiresRepair: boolean;
  securitySupportCaution: boolean;
  comparisonHorizonYears: number | [number, number] | null;
  comparisonHorizonDisplay: string;
}

export function evaluateAdequacy(situation: SituationState): AdequacyAssessment {
  const notes: string[] = [];
  let isKeepFeasible = true;
  let feasibilityReason: string | undefined;

  // Invariant 5: safe_to_use = false -> keep as-is is not feasible
  if (situation.isSafeToUse === 'no') {
    isKeepFeasible = false;
    feasibilityReason = 'The current phone has an active safety hazard (e.g. swollen battery or dangerous shattered glass). Keeping it without repair or retirement is not physically safe.';
    notes.push('Safety hazard identified: phone cannot be kept in its present state.');
  }

  // Invariant 6: Required functions not met -> phone is inadequate even if it powers on
  const isCurrentAdequate =
    situation.isSafeToUse !== 'no' &&
    situation.meetsRequiredNeeds === 'yes' &&
    situation.problemType === 'none';

  if (situation.meetsRequiredNeeds === 'no') {
    notes.push('Phone is inadequate for required needs, regardless of whether it still powers on.');
  }

  // Invariant 7: Ended security support alone must NOT automatically force replacement
  let securitySupportCaution = false;
  if (situation.knowsSecuritySupportStatus === 'no' || situation.problemType === 'security') {
    securitySupportCaution = true;
    notes.push('Ended or unconfirmed software support does not automatically force replacement; feasibility depends on specific banking, organizational, or threat model requirements.');
  }

  // Check hardware repair requirement
  const requiresRepair =
    situation.hasHardwareRepairNeed ||
    ['battery', 'display', 'mainboard'].includes(situation.problemType);

  // Invariant 8: Device age must NOT derive remaining adequate life.
  // Horizon must come strictly from user estimate.
  let comparisonHorizonYears: number | [number, number] | null = null;
  let comparisonHorizonDisplay = 'Unspecified';

  const h = situation.remainingAdequateHorizon;
  switch (h.option) {
    case 'under_6m':
      comparisonHorizonYears = [0.25, 0.5];
      comparisonHorizonDisplay = 'Under 6 months (0.25–0.5 yrs)';
      break;
    case '6_to_12m':
      comparisonHorizonYears = [0.5, 1.0];
      comparisonHorizonDisplay = '6–12 months (0.5–1.0 yr)';
      break;
    case '1_to_2y':
      comparisonHorizonYears = [1.0, 2.0];
      comparisonHorizonDisplay = '1–2 years';
      break;
    case '2_to_3y':
      comparisonHorizonYears = [2.0, 3.0];
      comparisonHorizonDisplay = '2–3 years';
      break;
    case '3p_y':
      comparisonHorizonYears = [3.0, 5.0];
      comparisonHorizonDisplay = '3+ years';
      break;
    case 'custom':
      if (h.minYears !== null && h.maxYears !== null) {
        comparisonHorizonYears = h.minYears === h.maxYears ? h.minYears : [h.minYears, h.maxYears];
        comparisonHorizonDisplay = `${h.minYears}–${h.maxYears} years (user estimate)`;
      } else if (h.minYears !== null) {
        comparisonHorizonYears = h.minYears;
        comparisonHorizonDisplay = `${h.minYears} year(s)`;
      } else {
        comparisonHorizonYears = null;
        comparisonHorizonDisplay = 'Unknown / Not specified';
      }
      break;
    case 'unsure':
    default:
      // Invariant 4: missing evidence with no approved fallback remains null/unknown
      comparisonHorizonYears = null;
      comparisonHorizonDisplay = 'Unknown / Unestimated';
      notes.push('User did not specify a remaining service horizon. Relative comparisons over time will reflect this uncertainty rather than inventing a 3-year baseline.');
      break;
  }

  return {
    isKeepFeasible,
    isCurrentAdequate,
    feasibilityReason,
    adequacyNotes: notes,
    requiresRepair,
    securitySupportCaution,
    comparisonHorizonYears,
    comparisonHorizonDisplay,
  };
}
