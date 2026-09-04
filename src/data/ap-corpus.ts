// AP Framework Corpus: Neutral Paraphrases & Philosophical Lenses

export interface APLensDefinition {
  id: string;
  conceptName: string;
  approvedParaphrase: string;
  inquiryPrompt: string;
  relevanceTriggerNotes: string;
}

export const AP_LENSES: Record<string, APLensDefinition> = {
  INCOMPLETENESS: {
    id: 'INCOMPLETENESS',
    conceptName: 'Internal Incompleteness',
    approvedParaphrase:
      'Acharya Prashant points out a frequent tendency of the mind: feeling an inner dissatisfaction or restless void, which we instinctively attempt to soothe by acquiring a new physical object.',
    inquiryPrompt: 'Looking at what you expected to feel with the new phone, do you notice anything resembling that dynamic in your own answer?',
    relevanceTriggerNotes: 'Relevant when expected difference relates to mood, excitement, freshness, or filling time.',
  },

  ORIGIN_AND_EXPOSURE: {
    id: 'ORIGIN_AND_EXPOSURE',
    conceptName: 'Origin & Exposure',
    approvedParaphrase:
      'Desires often feel intensely personal, yet historically they often ignite right after repeated exposure to launch events, reviews, or peer comparisons. When we notice the timeline, we see the desire entered from the outside.',
    inquiryPrompt: 'Looking back at when you first began wanting the upgrade, was the desire already active before you saw those images or reviews, or did it start with the exposure?',
    relevanceTriggerNotes: 'Relevant when origin references advertisements, reviews, launches, or others having new phones.',
  },

  EXTERNAL_REFERENCE: {
    id: 'EXTERNAL_REFERENCE',
    conceptName: 'External Reference & Visibility',
    approvedParaphrase:
      'In this framework, an object is often sought not purely for what it does, but for what having it signals to others. The mind relies on external eyes to confirm its own significance.',
    inquiryPrompt: 'When you consider whether you would still want it if nobody else knew, what does that reveal about where the impulse is rooted?',
    relevanceTriggerNotes: 'Relevant when visibility affects the desire or social impressions are mentioned.',
  },

  SEEING_WITHOUT_JUDGMENT: {
    id: 'SEEING_WITHOUT_JUDGMENT',
    conceptName: 'Direct Seeing',
    approvedParaphrase:
      'True understanding does not require beating oneself up, feeling guilty, or forcing austere self-denial. It requires simply seeing things exactly as they are. When facts are clearly seen, appropriate action follows naturally.',
    inquiryPrompt: 'Reading your own answers together without defense or self-criticism, what seems genuinely appropriate now?',
    relevanceTriggerNotes: 'Default lens for final inquiry reflection step.',
  },
};

export const AP_QUESTIONS_CONFIG = [
  {
    key: 'APQ1_FUNCTION',
    number: 1,
    title: 'Function & Practical Boundary',
    question: 'What would the new phone let you do that your current phone cannot do adequately?',
    placeholder: 'e.g. My banking app crashes, the camera is too slow for my work, or actually it still does everything I strictly need...',
    guidance: 'Be specific about actual practical tasks, not general feelings.',
  },
  {
    key: 'APQ2_EXPECTATION',
    number: 2,
    title: 'Expectation Beyond Function',
    question: 'Imagine you already have the new phone. Besides what it can technically do, what do you expect to be different for you?',
    placeholder: 'e.g. I might feel more modern, feel less irritated, or expect a sense of freshness and relief...',
    guidance: 'Notice any emotional, social, or psychological expectation attached to the device.',
  },
  {
    key: 'APQ3_ORIGIN',
    number: 3,
    title: 'Origin & Chronology',
    question: 'When did you first begin seriously wanting this phone or an upgrade? What were you seeing, hearing or comparing around that time? Was the desire already this strong before that?',
    placeholder: 'e.g. I saw the launch keynote last month, or my colleague got one, or my battery died at an awkward moment...',
    guidance: 'Trace back to what triggered the thought.',
  },
  {
    key: 'APQ4_VISIBILITY',
    number: 4,
    title: 'Visibility & Other Eyes',
    question: 'Would wanting this phone change if nobody else ever knew which phone you owned? Why or why not?',
    placeholder: 'e.g. Honestly, part of me likes having a sleek phone people see, or no, I only care about the screen quality for myself...',
    guidance: 'Explore whether others seeing it plays any role.',
  },
  {
    key: 'APQ5_NONPURCHASE',
    number: 5,
    title: 'Staying As-Is for Another Year',
    question: 'Imagine deciding today to keep your current phone for another year. What, if anything, feels difficult about that?',
    placeholder: 'e.g. The battery would be frustrating when traveling, or I feel FOMO about missing the latest features...',
    followUpQuestion: 'Is that difficulty mainly practical, or is something else involved too?',
    guidance: 'Test what resistance surfaces when you imagine choosing not to buy.',
  },
  {
    key: 'APQ6_RESEE',
    number: 6,
    title: 'Re-seeing the Whole Picture',
    question: 'Reading your own answers together, does anything about the desire look different now? What seems appropriate now?',
    placeholder: 'e.g. Seeing it written down, my current phone is fine except for the battery, so a battery swap makes more sense than a €1000 phone...',
    guidance: 'Step back and look at your own words as an objective observer.',
  },
];
