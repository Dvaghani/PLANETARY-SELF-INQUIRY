// Preloaded Demo Cases (Cases A through G)

import { SituationState } from '../types/situation';
import { InquiryAnswers } from '../types/inquiry';
import { PersonCard } from '../types/planetary';

export interface DemoCase {
  id: string;
  code: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  title: string;
  summary: string;
  situation: SituationState;
  inquiry: InquiryAnswers;
  myFour: PersonCard[];
  specialOptions?: {
    candidateModelId?: string;
    refurbishedScenarioIsAdemeRef?: boolean;
  };
}

export const DEMO_CASES: Record<string, DemoCase> = {
  CASE_A: {
    id: 'CASE_A',
    code: 'A',
    title: 'Case A: Adequate Current Phone (Desire for Novelty)',
    summary: 'Current phone works fine; user estimates 2 more years of adequate service. Desires upgrade after viewing launch event. Honest comparison of all 5 pathways.',
    situation: {
      currentModelId: 'generic_smartphone',
      problemType: 'none',
      isSafeToUse: 'yes',
      meetsRequiredNeeds: 'yes',
      knowsSecuritySupportStatus: 'yes',
      hasHardwareRepairNeed: false,
      isReliableRepairAvailable: 'yes',
      remainingAdequateHorizon: {
        option: '2_to_3y',
        minYears: 2.0,
        maxYears: 3.0,
      },
      chargingLocationCode: 'DE',
      oldPhoneFate: 'store_unused',
    },
    inquiry: {
      APQ1_FUNCTION: 'It technically does what I need. The new phone has a 120Hz display and a slightly better telephoto zoom.',
      APQ2_EXPECTATION: 'I expect to feel more modern, excited, and get a fresh sensation when holding the device.',
      APQ3_ORIGIN: 'I saw the September keynote and YouTube reviews comparing the camera to older phones.',
      APQ4_VISIBILITY: 'If nobody ever saw it, I would probably still appreciate the display, but part of me enjoys having the new design in hand.',
      APQ5_NONPURCHASE: 'Staying with this one feels a bit boring, like I am falling behind on the newest tech.',
      APQ5_FOLLOWUP: 'It is almost entirely experiential rather than a practical work blocker.',
      APQ6_RESEE: 'Looking at my own words, my current phone is completely adequate. The desire is mainly driven by the launch buzz.',
      provisionalChoice: 'keep_current',
    },
    myFour: [
      { id: '1', role: 'parent', locationCode: 'DE', locationName: 'Germany (Rhine region)' },
      { id: '2', role: 'friend', locationCode: 'GB', locationName: 'United Kingdom' },
    ],
  },

  CASE_B: {
    id: 'CASE_B',
    code: 'B',
    title: 'Case B: Battery Degradation with Reliable Repair Available',
    summary: 'Current phone struggles only with battery life. Reliable certified battery replacement available to extend service by 2 years.',
    situation: {
      currentModelId: 'fairphone_5',
      problemType: 'battery',
      problemDescription: 'Battery dies in 3 hours; needs multiple mid-day charges.',
      isSafeToUse: 'yes',
      meetsRequiredNeeds: 'yes',
      knowsSecuritySupportStatus: 'yes',
      hasHardwareRepairNeed: true,
      selectedRepairType: 'battery',
      isReliableRepairAvailable: 'yes',
      remainingAdequateHorizon: {
        option: '1_to_2y',
        minYears: 1.0,
        maxYears: 2.0,
      },
      chargingLocationCode: 'GB',
      oldPhoneFate: 'keep_using',
    },
    inquiry: {
      APQ1_FUNCTION: 'A new phone would last all day without power-bank anxiety.',
      APQ2_EXPECTATION: 'Freedom from carrying chargers and power banks everywhere.',
      APQ3_ORIGIN: 'When my phone shut down during an urgent train ticket inspection last week.',
      APQ4_VISIBILITY: 'No difference. I just need dependable all-day battery life.',
      APQ5_NONPURCHASE: 'Carrying a bulky power bank everywhere is frustrating and stressful.',
      APQ5_FOLLOWUP: 'It is purely practical battery degradation.',
      APQ6_RESEE: 'Since Fairphone provides a DIY battery swap for ~0.57 kg CO2e and €30, swapping the battery solves 100% of my issue.',
      provisionalChoice: 'repair_current',
    },
    myFour: [
      { id: '1', role: 'partner', locationCode: 'GB', locationName: 'London, UK' },
      { id: '2', role: 'child', locationCode: 'GB', locationName: 'UK' },
    ],
  },

  CASE_C: {
    id: 'CASE_C',
    code: 'C',
    title: 'Case C: Function Inadequate (New Purchase Reasonable)',
    summary: 'Hardware/software incompatibilities block essential work and accessibility. Buying new is presented as a legitimate practical option.',
    situation: {
      currentModelId: 'generic_smartphone',
      problemType: 'performance',
      problemDescription: 'Screen magnifier and accessibility apps freeze; motherboard overheating causes frequent resets.',
      isSafeToUse: 'yes',
      meetsRequiredNeeds: 'no',
      knowsSecuritySupportStatus: 'no',
      hasHardwareRepairNeed: true,
      selectedRepairType: 'mainboard',
      isReliableRepairAvailable: 'no',
      remainingAdequateHorizon: {
        option: 'under_6m',
        minYears: 0.25,
        maxYears: 0.5,
      },
      chargingLocationCode: 'US',
      oldPhoneFate: 'formal_recycling',
    },
    inquiry: {
      APQ1_FUNCTION: 'Run my mandatory accessibility screen-reader and remote work software without system crashes.',
      APQ2_EXPECTATION: 'Relief from constant anxiety that the phone will crash during client calls.',
      APQ3_ORIGIN: 'Six months ago when the operating system stopped receiving memory management updates.',
      APQ4_VISIBILITY: 'Not at all. This is strictly my daily livelihood and accessibility.',
      APQ5_NONPURCHASE: 'I will literally lose work hours and struggle to navigate my daily errands.',
      APQ5_FOLLOWUP: 'Completely practical and occupational.',
      APQ6_RESEE: 'Replacing this device is a genuine necessity for my accessibility and livelihood.',
      provisionalChoice: 'buy_new',
    },
    myFour: [
      { id: '1', role: 'parent', locationCode: 'US', locationName: 'California, US' },
      { id: '2', role: 'someone_i_care_about', locationCode: 'US', locationName: 'US' },
    ],
  },

  CASE_D: {
    id: 'CASE_D',
    code: 'D',
    title: 'Case D: Horizon Unknown / Unestimated',
    summary: 'User cannot estimate how much longer the phone will last. System returns explicit uncertainty rather than inventing a default 3-year horizon.',
    situation: {
      currentModelId: 'generic_smartphone',
      problemType: 'unsure',
      isSafeToUse: 'yes',
      meetsRequiredNeeds: 'yes',
      knowsSecuritySupportStatus: 'unsure',
      hasHardwareRepairNeed: false,
      isReliableRepairAvailable: 'unsure',
      remainingAdequateHorizon: {
        option: 'unsure',
        minYears: null,
        maxYears: null,
      },
      chargingLocationCode: null,
      oldPhoneFate: 'unknown',
    },
    inquiry: {
      APQ1_FUNCTION: 'I am not sure. Maybe smoother apps?',
      APQ2_EXPECTATION: 'A bit of a reset, but I have not thought it through.',
      APQ3_ORIGIN: 'Just casually browsing tech news recently.',
      APQ4_VISIBILITY: 'I do not know.',
      APQ5_NONPURCHASE: 'Nothing specific feels difficult.',
      APQ6_RESEE: 'I realize I do not have enough clarity yet about what I actually need.',
      provisionalChoice: 'investigate_further',
    },
    myFour: [],
  },

  CASE_E: {
    id: 'CASE_E',
    code: 'E',
    title: 'Case E: Used / Second-Hand Acquisition (Cut-Off Account)',
    summary: 'Examines peer-to-peer second-hand device. Demonstrates distinct cut-off accounting and absence of false 1:1 displacement credit.',
    situation: {
      currentModelId: 'apple_iphone_16_128gb',
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
      chargingLocationCode: 'US',
      oldPhoneFate: 'sell_or_gift',
    },
    inquiry: {
      APQ1_FUNCTION: 'A friend is selling an iPhone 16. It would give me an updated camera.',
      APQ2_EXPECTATION: 'Having a newer model without paying retail prices.',
      APQ3_ORIGIN: 'When my friend mentioned they were upgrading.',
      APQ4_VISIBILITY: 'Minor factor.',
      APQ5_NONPURCHASE: 'Mild disappointment at passing on a deal.',
      APQ6_RESEE: 'It is a good opportunity, but my current phone is still performing well.',
      provisionalChoice: 'consider_used',
    },
    myFour: [{ id: '1', role: 'friend', locationCode: 'US', locationName: 'New York, US' }],
  },

  CASE_F: {
    id: 'CASE_F',
    code: 'F',
    title: 'Case F: Refurbished Device (Refusal of Fabricated Footprint)',
    summary: 'Evaluating a commercial refurbished phone without certified vendor LCA. System refuses to fabricate a footprint or blindly apply ADEME 7.61.',
    situation: {
      currentModelId: 'samsung_galaxy_s25_eur',
      problemType: 'none',
      isSafeToUse: 'yes',
      meetsRequiredNeeds: 'yes',
      knowsSecuritySupportStatus: 'yes',
      hasHardwareRepairNeed: false,
      isReliableRepairAvailable: 'yes',
      remainingAdequateHorizon: {
        option: '2_to_3y',
        minYears: 2.0,
        maxYears: 3.0,
      },
      chargingLocationCode: 'FR',
      oldPhoneFate: 'trade_in',
    },
    inquiry: {
      APQ1_FUNCTION: 'Considering a refurbished model from an online marketplace.',
      APQ2_EXPECTATION: 'Peace of mind that it was tested and has warranty.',
      APQ3_ORIGIN: 'Online advertisements for refurbished electronics.',
      APQ4_VISIBILITY: 'No difference.',
      APQ5_NONPURCHASE: 'No difficulty; present phone works.',
      APQ6_RESEE: 'Without certified repair/logistics data, the environmental claim should not be assumed zero or identical to ADEME.',
      provisionalChoice: 'consider_refurbished',
    },
    myFour: [{ id: '1', role: 'parent', locationCode: 'FR', locationName: 'France' }],
    specialOptions: {
      refurbishedScenarioIsAdemeRef: false,
    },
  },

  CASE_G: {
    id: 'CASE_G',
    code: 'G',
    title: 'Case G: Protect My Four with Regional IPCC Risk Context',
    summary: 'User connects 4 loved ones in India, UK, Germany, and US. Demonstrates global atmospheric circulation and regional climate risks while explicitly refusing individual causal guilt.',
    situation: {
      currentModelId: 'generic_smartphone',
      problemType: 'none',
      isSafeToUse: 'yes',
      meetsRequiredNeeds: 'yes',
      knowsSecuritySupportStatus: 'yes',
      hasHardwareRepairNeed: false,
      isReliableRepairAvailable: 'yes',
      remainingAdequateHorizon: {
        option: '2_to_3y',
        minYears: 2.0,
        maxYears: 3.0,
      },
      chargingLocationCode: 'DE',
      oldPhoneFate: 'keep_using',
    },
    inquiry: {
      APQ1_FUNCTION: 'Nothing critical. My phone still browses, calls, and texts fine.',
      APQ2_EXPECTATION: 'I felt drawn to the aesthetic finish of the new release.',
      APQ3_ORIGIN: 'Seen across tech social media feeds.',
      APQ4_VISIBILITY: 'I notice that I care about how it looks on the desk in front of others.',
      APQ5_NONPURCHASE: 'A sense of holding onto something that feels older.',
      APQ5_FOLLOWUP: 'Purely mental / identity.',
      APQ6_RESEE: 'When I see the physical pathway and where the people I care about live, this small aesthetic upgrade feels out of proportion.',
      provisionalChoice: 'keep_current',
    },
    myFour: [
      { id: '1', role: 'parent', locationCode: 'IN', locationName: 'Northern River Basin, India' },
      { id: '2', role: 'partner', locationCode: 'GB', locationName: 'Coastal UK' },
      { id: '3', role: 'child', locationCode: 'DE', locationName: 'Central Germany' },
      { id: '4', role: 'friend', locationCode: 'US', locationName: 'Western US' },
    ],
  },
};
