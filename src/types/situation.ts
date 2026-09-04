// Stage 1: Situation Types

export type ProblemType =
  | 'none'
  | 'battery'
  | 'display'
  | 'mainboard'
  | 'apps'
  | 'security'
  | 'performance'
  | 'other'
  | 'unsure';

export type TriState = 'yes' | 'no' | 'unsure';

export type RepairType = 'battery' | 'display' | 'mainboard' | 'other';

export type HorizonOption =
  | 'unsure'
  | 'under_6m'
  | '6_to_12m'
  | '1_to_2y'
  | '2_to_3y'
  | '3p_y'
  | 'custom';

export interface HorizonEstimate {
  option: HorizonOption;
  minYears: number | null;
  maxYears: number | null;
  isCustom?: boolean;
}

export type OldPhoneFate =
  | 'keep_using'
  | 'sell_or_gift'
  | 'trade_in'
  | 'store_unused'
  | 'formal_recycling'
  | 'general_waste'
  | 'unknown';

export interface SituationState {
  currentModelId: string | null; // specific ID or null/generic
  customModelName?: string;
  problemType: ProblemType;
  problemDescription?: string;
  isSafeToUse: TriState;
  meetsRequiredNeeds: TriState;
  knowsSecuritySupportStatus: TriState;
  hasHardwareRepairNeed: boolean;
  selectedRepairType?: RepairType;
  isReliableRepairAvailable: TriState;
  remainingAdequateHorizon: HorizonEstimate;
  chargingLocationCode: string | null; // Country code or null for unknown
  expectedCandidateHorizon?: HorizonEstimate;
  oldPhoneFate: OldPhoneFate;
}
