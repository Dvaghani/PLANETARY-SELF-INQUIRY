// Stage 4: Final Choice Types

export type FinalDecision =
  | 'keep_current'
  | 'repair_current'
  | 'look_for_used'
  | 'look_for_refurbished'
  | 'buy_new'
  | 'investigate_further'
  | 'still_unclear';

export interface FinalChoiceRecord {
  decision: FinalDecision;
  userRationale: string;
  timestamp: string;
  connectedPeopleCount: number;
  epistemicDeclarationAccepted: boolean;
}
