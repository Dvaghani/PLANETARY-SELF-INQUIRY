// Stage 2: AP-Grounded Self-Inquiry Types

export type APQuestionKey =
  | 'APQ1_FUNCTION'
  | 'APQ2_EXPECTATION'
  | 'APQ3_ORIGIN'
  | 'APQ4_VISIBILITY'
  | 'APQ5_NONPURCHASE'
  | 'APQ6_RESEE';

export type ProvisionalChoice =
  | 'keep_current'
  | 'repair_current'
  | 'consider_used'
  | 'consider_refurbished'
  | 'buy_new'
  | 'investigate_further'
  | 'unclear';

export interface InquiryAnswers {
  APQ1_FUNCTION: string;
  APQ2_EXPECTATION: string;
  APQ3_ORIGIN: string;
  APQ4_VISIBILITY: string;
  APQ5_NONPURCHASE: string;
  APQ5_FOLLOWUP?: string; // Optional: "Is that difficulty mainly practical, or is something else involved too?"
  APQ6_RESEE: string;
  provisionalChoice?: ProvisionalChoice;
}

export type InternalBranch =
  | 'apparent_contradiction'
  | 'mixed'
  | 'insufficient_observation'
  | 'exposure_novelty'
  | 'visibility_identity'
  | 'concrete_practical_need'
  | 'unclear';

export interface ReflectionGrammar {
  restatement: string; // Mandatory faithful paraphrase of raw user input
  juxtaposition?: string; // Optional juxtaposition of explicit user statements
  question: string; // Mandatory non-judgmental inquiry question
  sourceLens?: {
    concept: string; // e.g. "External Reference", "Origin & Conditioning", "Incompleteness"
    approvedParaphrase: string;
    inquiryPrompt: string; // e.g. "Do you see anything resembling that in your own answer?"
  };
  openChoice: string; // Mandatory invitation to self-determine next steps
}
