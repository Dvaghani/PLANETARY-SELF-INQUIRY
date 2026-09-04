// AP Reflection Engine: Non-Diagnostic Juxtaposition & Faithful Reflection

import { InquiryAnswers, ReflectionGrammar, InternalBranch } from '../types/inquiry';
import { SituationState } from '../types/situation';
import { AP_LENSES } from '../data/ap-corpus';

/**
 * Validates that generated reflection text NEVER contains prohibited accusatory phrases
 */
const FORBIDDEN_PHRASES = [
  'you are greedy',
  'your ego wants',
  'you are conditioned',
  'you are selfish',
  'you are seeking validation',
  'deep down',
  'your real motive is',
  'you are rationalising',
  'if you really cared',
  'denial proves',
];

export function assertNoPsychologicalDiagnosis(text: string): void {
  const lower = text.toLowerCase();
  for (const phrase of FORBIDDEN_PHRASES) {
    if (lower.includes(phrase)) {
      throw new Error(`CRITICAL INVARIANT VIOLATION: Forbidden diagnosis phrase detected: "${phrase}"`);
    }
  }
}

/**
 * Builds the faithful reflection using the mandatory reflection grammar:
 * 1. RESTATEMENT (mandatory)
 * 2. JUXTAPOSITION (optional)
 * 3. QUESTION (mandatory)
 * 4. SOURCE LENS (optional)
 * 5. OPEN CHOICE (mandatory)
 */
export function buildReflection(
  situation: SituationState,
  answers: InquiryAnswers
): {
  grammar: ReflectionGrammar;
  internalBranch: InternalBranch;
} {
  const q1 = (answers.APQ1_FUNCTION || '').trim();
  const q2 = (answers.APQ2_EXPECTATION || '').trim();
  const q3 = (answers.APQ3_ORIGIN || '').trim();
  const q4 = (answers.APQ4_VISIBILITY || '').trim();
  const q5 = (answers.APQ5_NONPURCHASE || '').trim();

  // Determine internal branch strictly from explicit answers
  let branch: InternalBranch = 'unclear';
  let restatement = '';
  let juxtaposition: string | undefined;
  let question = '';
  let selectedLensKey: string | undefined;

  const hasPracticalDefect =
    situation.problemType !== 'none' ||
    situation.meetsRequiredNeeds === 'no' ||
    (q1.length > 0 && /crash|broken|slow|battery|screen|broken|work|app|job|access/i.test(q1));

  const hasEmotionalExpectation =
    q2.length > 0 &&
    /feel|happy|fresh|modern|prestige|excited|bored|status|identity|relief|newness/i.test(q2);

  const hasVisibilityFactor =
    q4.length > 0 &&
    /yes|partly|care|people|look|seen|impress|judgment|colleague|friend/i.test(q4);

  const hasOriginTrigger =
    q3.length > 0 &&
    /ad|keynote|launch|video|review|saw|bought|youtube|instagram|billboard|shop/i.test(q3);

  if (hasPracticalDefect && !hasEmotionalExpectation && !hasVisibilityFactor) {
    branch = 'concrete_practical_need';
    restatement = `You noted that the current device struggles with concrete tasks: "${q1 || 'specific functional limitations'}".`;
    question = 'Given that the challenge is specifically functional, what minimum change or repair would restore adequate capability?';
    selectedLensKey = 'SEEING_WITHOUT_JUDGMENT';
  } else if (!hasPracticalDefect && hasEmotionalExpectation) {
    branch = 'apparent_contradiction';
    restatement = `Regarding function, you mentioned: "${q1 || 'it still meets required needs'}". When imagining life with the new device, you noted expecting: "${q2}".`;
    juxtaposition = 'On one hand, the present hardware continues to handle your core required tasks. On the other hand, the expected difference lies in how you anticipate feeling or experiencing the day.';
    question = 'How do those two observations fit together for you? Is the upgrade being asked to resolve a functional limitation, or something of a different nature?';
    selectedLensKey = 'INCOMPLETENESS';
  } else if (hasVisibilityFactor) {
    branch = 'visibility_identity';
    restatement = `When asked if wanting the phone would change if nobody else knew, your reflection was: "${q4}".`;
    question = 'What do you make of the role that other eyes play in this decision? If the device were completely invisible to others, what would remain of the impulse?';
    selectedLensKey = 'EXTERNAL_REFERENCE';
  } else if (hasOriginTrigger) {
    branch = 'exposure_novelty';
    restatement = `Looking at when the desire first took hold, you recorded: "${q3}".`;
    question = 'Looking back at that timeline, was the desire already active prior to that moment, or did it ignite in response to seeing the external material?';
    selectedLensKey = 'ORIGIN_AND_EXPOSURE';
  } else if (hasPracticalDefect && hasEmotionalExpectation) {
    branch = 'mixed';
    restatement = `You described practical functional needs: "${q1}", alongside expected shifts in experience: "${q2}".`;
    juxtaposition = 'There appear to be both practical utility elements and experiential/emotional expectations present in the situation.';
    question = 'Is there more than one distinct thing being sought here? How would you separate the practical requirement from the emotional anticipation?';
    selectedLensKey = 'SEEING_WITHOUT_JUDGMENT';
  } else {
    branch = 'insufficient_observation';
    restatement = `You recorded your thoughts across function ("${q1 || 'unspecified'}"), expectations ("${q2 || 'unspecified'}"), and the prospect of waiting another year ("${q5 || 'unspecified'}").`;
    question = 'Reading your own statements side by side, does the overall desire feel clear and necessary, or does it leave you with lingering questions?';
    selectedLensKey = 'SEEING_WITHOUT_JUDGMENT';
  }

  let sourceLens: ReflectionGrammar['sourceLens'] | undefined;
  if (selectedLensKey && AP_LENSES[selectedLensKey]) {
    const l = AP_LENSES[selectedLensKey];
    sourceLens = {
      concept: l.conceptName,
      approvedParaphrase: l.approvedParaphrase,
      inquiryPrompt: l.inquiryPrompt,
    };
  }

  const grammar: ReflectionGrammar = {
    restatement,
    juxtaposition,
    question,
    sourceLens,
    openChoice:
      'This inquiry does not seek a specific outcome or declare what you should do. What provisional direction seems most truthful to you right now?',
  };

  // Verify non-diagnostic rule
  assertNoPsychologicalDiagnosis(grammar.restatement);
  if (grammar.juxtaposition) assertNoPsychologicalDiagnosis(grammar.juxtaposition);
  assertNoPsychologicalDiagnosis(grammar.question);
  if (grammar.sourceLens) assertNoPsychologicalDiagnosis(grammar.sourceLens.approvedParaphrase);
  assertNoPsychologicalDiagnosis(grammar.openChoice);

  return { grammar, internalBranch: branch };
}
