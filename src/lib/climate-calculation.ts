// Prospective Climate LCA Calculation Engine

import { SituationState, RepairType } from '../types/situation';
import {
  QuantitativeClimateResult,
  PathwayEvaluation,
  QualitativePathwayResult,
} from '../types/evidence';
import { DEVICE_REGISTRY } from '../data/device-registry';
import {
  CHARGING_ENERGY_KWH_PER_YEAR,
  getGridFactor,
} from '../data/electricity-factors';
import { evaluateAdequacy } from './adequacy';

export interface CalculationOptions {
  candidateModelId?: string | null;
  refurbishedScenarioIsAdemeRef?: boolean;
  enableConsequentialDisplacement?: boolean; // Default false; strictly experimental
  includeSensitiveChargingRange?: boolean;
}

/**
 * Calculates prospective use-phase battery charging emissions over horizon H
 */
export function calculateChargingEmissions(
  horizonYears: number | [number, number] | null,
  countryCode: string | null
): {
  centralKg: number | null;
  rangeKg: [number, number] | null;
  status: 'known_single' | 'known_range' | 'unknown';
  notes: string;
} {
  const factor = getGridFactor(countryCode);

  // Invariant 1 & Invariant 4: If grid factor is unknown, charging carbon is UNKNOWN/OMITTED, NOT zero.
  if (!factor) {
    return {
      centralKg: null,
      rangeKg: null,
      status: 'unknown',
      notes: 'No approved electricity grid carbon factor provided. Charging emissions are omitted as unquantified rather than defaulted to zero.',
    };
  }

  // If horizon is unknown
  if (horizonYears === null) {
    return {
      centralKg: null,
      rangeKg: null,
      status: 'unknown',
      notes: 'Horizon H is unspecified by the user. Charging emissions over time remain unquantified.',
    };
  }

  const ci = factor.intensityKgCO2ePerKWh;
  const eCentral = CHARGING_ENERGY_KWH_PER_YEAR.central;
  const eMin = CHARGING_ENERGY_KWH_PER_YEAR.sensitivityMin;
  const eMax = CHARGING_ENERGY_KWH_PER_YEAR.sensitivityMax;

  if (typeof horizonYears === 'number') {
    const central = Number((eCentral * horizonYears * ci).toFixed(2));
    const rMin = Number((eMin * horizonYears * ci).toFixed(2));
    const rMax = Number((eMax * horizonYears * ci).toFixed(2));
    return {
      centralKg: central,
      rangeKg: [rMin, rMax],
      status: 'known_single',
      notes: `Based on ${factor.countryName} grid factor (${ci} kg CO2e/kWh) × 4.0 kWh/year (sensitivity 2–8 kWh/year) over ${horizonYears} yr(s).`,
    };
  } else {
    // Range horizon [hMin, hMax]
    const [hMin, hMax] = horizonYears;
    const rMin = Number((eMin * hMin * ci).toFixed(2));
    const rMax = Number((eMax * hMax * ci).toFixed(2));
    const central = Number((eCentral * ((hMin + hMax) / 2) * ci).toFixed(2));
    return {
      centralKg: central,
      rangeKg: [rMin, rMax],
      status: 'known_range',
      notes: `Based on ${factor.countryName} grid factor (${ci} kg CO2e/kWh) over user horizon range [${hMin}, ${hMax}] yrs.`,
    };
  }
}

/**
 * Evaluates the KEEP pathway
 */
export function evaluateKeepPathway(
  situation: SituationState,
  options: CalculationOptions = {}
): PathwayEvaluation {
  const adequacy = evaluateAdequacy(situation);
  const horizon = adequacy.comparisonHorizonYears;
  const charging = calculateChargingEmissions(situation.remainingAdequateHorizon.minYears !== null ? situation.remainingAdequateHorizon.minYears : horizon, situation.chargingLocationCode);

  const materials: QualitativePathwayResult = {
    domain: 'materials_extraction',
    summary: 'No additional whole-device or component mineral extraction.',
    details: 'Continuing to use existing hardware draws zero additional primary mining or raw semiconductor fabrication burden.',
    status: 'supported',
    recordIds: ['REC_MINING_PRESSURES_2025'],
  };

  const water: QualitativePathwayResult = {
    domain: 'water',
    summary: 'No additional wafer fabrication or extraction water withdrawal.',
    details: 'Operational handset water consumption is effectively negligible.',
    status: 'supported',
    recordIds: [],
  };

  const waste: QualitativePathwayResult = {
    domain: 'waste_circularity',
    summary: 'Defers electronic waste generation.',
    details: 'Hardware remains in active service; avoids premature entry into dormant drawer storage or informal recycling streams.',
    status: 'supported',
    recordIds: [],
  };

  if (!adequacy.isKeepFeasible) {
    return {
      pathway: 'KEEP',
      title: 'Keep Current Phone',
      subtitle: 'Currently Infeasible without repair',
      isFeasible: false,
      infeasibilityReason: adequacy.feasibilityReason,
      climate: {
        status: 'infeasible',
        centralKgCO2e: null,
        rangeKgCO2e: null,
        breakdown: {
          productionKg: null,
          distributionKg: null,
          repairKg: null,
          useChargingKg: null,
          eolDisposalKg: null,
        },
        horizonYears: horizon,
        explanation: 'Keeping as-is is not feasible due to an active safety hazard.',
        epistemicNotes: ['Prospective decision boundary: past manufacturing is historical, but safety precludes unmaintained use.'],
        recordIds: [],
      },
      materials,
      water,
      waste,
    };
  }

  return {
    pathway: 'KEEP',
    title: 'Keep Current Phone',
    subtitle: 'Prospective continued service',
    isFeasible: true,
    climate: {
      status: charging.status === 'unknown' ? 'partial' : charging.rangeKg ? 'known_range' : 'known_single',
      centralKgCO2e: charging.centralKg,
      rangeKgCO2e: charging.rangeKg,
      breakdown: {
        productionKg: 0, // Invariant: past manufacture is historical, not charged prospective
        distributionKg: 0,
        repairKg: 0,
        useChargingKg: charging.centralKg ?? charging.rangeKg,
        eolDisposalKg: null, // End of life unquantified generic
      },
      horizonYears: horizon,
      explanation:
        charging.status === 'unknown'
          ? 'Prospective manufacturing is 0 kg (device already exists). Charging emissions omitted as unquantified (no location factor).'
          : `Prospective burden is limited to operational charging (${charging.centralKg ?? charging.rangeKg?.[0]} kg CO2e) over the expected service horizon.`,
      epistemicNotes: [
        'Prospective decision boundary: Historical manufacturing emissions are past sunk events and excluded from the prospective decision.',
        'No amortized past embodied carbon is charged forward.',
      ],
      recordIds: ['REC_GENERIC_CHARGING_KWH'],
    },
    materials,
    water,
    waste,
  };
}

/**
 * Evaluates the REPAIR pathway
 */
export function evaluateRepairPathway(
  situation: SituationState,
  options: CalculationOptions = {}
): PathwayEvaluation {
  const adequacy = evaluateAdequacy(situation);
  const horizon = adequacy.comparisonHorizonYears;
  const charging = calculateChargingEmissions(situation.remainingAdequateHorizon.minYears !== null ? situation.remainingAdequateHorizon.minYears : horizon, situation.chargingLocationCode);

  const repairType: RepairType = situation.selectedRepairType ?? (
    ['battery', 'display', 'mainboard'].includes(situation.problemType)
      ? (situation.problemType as RepairType)
      : 'battery'
  );

  const model = situation.currentModelId ? DEVICE_REGISTRY[situation.currentModelId] : null;

  let repairKgRange: [number, number] | null = null;
  let repairKgCentral: number | null = null;
  let repairStatus: 'known_single' | 'known_range' | 'unknown' = 'unknown';
  let repairNotes = '';

  // Invariant 9: Generic mainboard repair -> repair climate impact is UNKNOWN
  if (repairType === 'mainboard') {
    if (model && model.id === 'fairphone_5' && model.repairBurdenCO2e?.mainboardKg) {
      const mb = model.repairBurdenCO2e.mainboardKg;
      repairKgCentral = mb.diyModule ?? 17.84;
      repairStatus = 'known_single';
      repairNotes = `Fairphone 5 certified modular replacement: ~${repairKgCentral} kg CO2e (Fraunhofer IZM 2023).`;
    } else {
      repairStatus = 'unknown';
      repairNotes = 'No generic mainboard / primary-PCBA repair CO2e factor is approved. Impact is unquantified rather than assumed zero.';
    }
  } else if (repairType === 'battery') {
    if (model && model.id === 'fairphone_5' && model.repairBurdenCO2e?.batteryKg && 'diy' in model.repairBurdenCO2e.batteryKg) {
      repairKgCentral = model.repairBurdenCO2e.batteryKg.diy;
      repairStatus = 'known_single';
      repairNotes = `Fairphone 5 certified battery swap: ${repairKgCentral} kg CO2e (Fraunhofer IZM).`;
    } else {
      // Generic battery bracket
      repairKgRange = [0.3, 0.7];
      repairKgCentral = 0.5;
      repairStatus = 'known_range';
      repairNotes = 'Generic provisional battery replacement bracket: 0.3–0.7 kg CO2e.';
    }
  } else if (repairType === 'display') {
    if (model && model.id === 'fairphone_5' && model.repairBurdenCO2e?.displayKg && 'diy' in model.repairBurdenCO2e.displayKg) {
      repairKgCentral = model.repairBurdenCO2e.displayKg.diy;
      repairStatus = 'known_single';
      repairNotes = `Fairphone 5 certified display replacement: ${repairKgCentral} kg CO2e (Fraunhofer IZM).`;
    } else {
      // Generic display bracket
      repairKgRange = [3.0, 8.0];
      repairKgCentral = 5.5;
      repairStatus = 'known_range';
      repairNotes = 'Generic provisional display replacement bracket: 3.0–8.0 kg CO2e.';
    }
  } else {
    repairStatus = 'unknown';
    repairNotes = 'Unspecified repair type; component manufacturing burden is unquantified.';
  }

  // Combine repair + charging
  let totalCentral: number | null = null;
  let totalRange: [number, number] | null = null;

  if (repairStatus === 'unknown') {
    totalCentral = null;
    totalRange = null;
  } else if (repairKgCentral !== null) {
    if (charging.centralKg !== null) {
      totalCentral = Number((repairKgCentral + charging.centralKg).toFixed(2));
      if (repairKgRange && charging.rangeKg) {
        totalRange = [
          Number((repairKgRange[0] + charging.rangeKg[0]).toFixed(2)),
          Number((repairKgRange[1] + charging.rangeKg[1]).toFixed(2)),
        ];
      } else if (repairKgRange) {
        totalRange = [
          Number((repairKgRange[0] + charging.centralKg).toFixed(2)),
          Number((repairKgRange[1] + charging.centralKg).toFixed(2)),
        ];
      }
    } else {
      totalCentral = repairKgCentral;
      totalRange = repairKgRange;
    }
  }

  const materials: QualitativePathwayResult = {
    domain: 'materials_extraction',
    summary: `Component-level material demand (${repairType} part only).`,
    details: 'Requires raw materials only for the replacement module, avoiding whole-chassis, SoC semiconductor wafer, and camera stack extraction.',
    status: 'supported',
    recordIds: ['REC_MINING_PRESSURES_2025'],
  };

  const water: QualitativePathwayResult = {
    domain: 'water',
    summary: 'Localized component manufacturing water use.',
    details: 'Significantly reduced compared to full new handset silicon lithography.',
    status: 'supported',
    recordIds: [],
  };

  const waste: QualitativePathwayResult = {
    domain: 'waste_circularity',
    summary: 'Replaces single defective part; recovers handset functionality.',
    details: 'Old component (e.g. spent battery or cracked screen) requires proper electrical recycling.',
    status: 'supported',
    recordIds: [],
  };

  return {
    pathway: 'REPAIR',
    title: 'Repair Current Phone',
    subtitle: `Targeted repair (${repairType})`,
    isFeasible: situation.isReliableRepairAvailable !== 'no',
    infeasibilityReason: situation.isReliableRepairAvailable === 'no' ? 'Reliable repair is reported as unavailable.' : undefined,
    climate: {
      status: repairStatus === 'unknown' ? 'unknown' : (totalRange ? 'known_range' : 'known_single'),
      centralKgCO2e: totalCentral,
      rangeKgCO2e: totalRange,
      breakdown: {
        productionKg: 0,
        distributionKg: 0,
        repairKg: repairKgRange ?? repairKgCentral,
        useChargingKg: charging.centralKg ?? charging.rangeKg,
        eolDisposalKg: null,
      },
      horizonYears: horizon,
      explanation: `${repairNotes} Prospective burden consists of part replacement plus operational charging over horizon H.`,
      epistemicNotes: [
        'Repair burdens represent component manufacturing, packaging, and replacement logistics.',
        'Past handset manufacture remains excluded.',
      ],
      recordIds: model?.id === 'fairphone_5' ? ['REC_FAIRPHONE_5_LCA'] : ['REC_GENERIC_PROD_BRACKET'],
    },
    materials,
    water,
    waste,
  };
}

/**
 * Evaluates the USED / SECOND-HAND pathway
 * Invariant 21: used_secondhand != refurbished
 * Invariant 22: past manufacture excluded under cut-off != "avoided manufacturing credit"
 * Invariant 23: no consequential displacement credit unless explicitly enabled
 * Invariant 28: generic used-phone direct CO2e remains unknown unless supported component burdens are actually available
 * Invariant 29: unknown transfer/logistics burden != 0
 */
export function evaluateUsedPathway(
  situation: SituationState,
  options: CalculationOptions = {}
): PathwayEvaluation {
  const adequacy = evaluateAdequacy(situation);
  const horizon = adequacy.comparisonHorizonYears;
  const charging = calculateChargingEmissions(horizon, situation.chargingLocationCode);

  const materials: QualitativePathwayResult = {
    domain: 'materials_extraction',
    summary: 'No whole-device manufacturing demand triggered.',
    details: 'Transaction transfers an existing manufactured asset without invoking new primary ore extraction or wafer fabrication.',
    status: 'supported',
    recordIds: [],
  };

  const water: QualitativePathwayResult = {
    domain: 'water',
    summary: 'Zero direct manufacturing water consumption.',
    details: 'Operational second-user water impact is negligible.',
    status: 'supported',
    recordIds: [],
  };

  const waste: QualitativePathwayResult = {
    domain: 'waste_circularity',
    summary: 'Extends product second life; defers disposal.',
    details: 'Circulates existing hardware into extended service.',
    status: 'supported',
    recordIds: ['REC_US_MARKET_DISPLACEMENT_2026'],
  };

  // Invariant 28 & 29: Direct logistics/transfer burden is unknown/unapproved.
  // Direct score = partial / unknown (only charging known if grid factor available).
  return {
    pathway: 'USED',
    title: 'Used / Second-Hand Phone',
    subtitle: 'Direct peer transfer / as-is acquisition',
    isFeasible: true,
    climate: {
      status: 'partial',
      centralKgCO2e: charging.centralKg, // partial quantification: charging only
      rangeKgCO2e: charging.rangeKg,
      breakdown: {
        productionKg: 0, // cut-off: past manufacture excluded
        distributionKg: null, // unknown shipping/transfer burden != 0
        repairKg: 0,
        useChargingKg: charging.centralKg ?? charging.rangeKg,
        eolDisposalKg: null,
      },
      horizonYears: horizon,
      explanation:
        'Direct cut-off perspective: Historical initial manufacturing is not recharged to the second user. Transfer logistics and packaging burdens are currently unquantified (not zero). Known burden reflects second-life operational charging.',
      epistemicNotes: [
        'Used is scientifically distinct from refurbished: no formal refurbishment or industrial re-manufacturing process.',
        'Market displacement: Stated intent to buy new does not prove 1:1 market displacement. Consequential displacement credit is omitted from the primary direct footprint.',
        'Unknown transport/transfer burden is treated as unquantified, never assumed to be 0 kg.',
      ],
      recordIds: ['REC_US_MARKET_DISPLACEMENT_2026'],
    },
    materials,
    water,
    waste,
  };
}

/**
 * Evaluates the REFURBISHED pathway
 * Invariant 11: arbitrary refurbished device + no approved direct footprint -> no fabricated climate number
 * Invariant 12: ADEME reference selected -> 7.61 kg CO2e, exactly labelled 2-year reference, not decomposed, not universal
 * Invariant 26: ADEME 7.61 must never become generic refurbished fallback
 */
export function evaluateRefurbishedPathway(
  situation: SituationState,
  options: CalculationOptions = {}
): PathwayEvaluation {
  const adequacy = evaluateAdequacy(situation);
  const horizon = adequacy.comparisonHorizonYears;
  const charging = calculateChargingEmissions(horizon, situation.chargingLocationCode);

  const materials: QualitativePathwayResult = {
    domain: 'materials_extraction',
    summary: 'Selective spare parts extraction only.',
    details: 'May require new replacement battery, casing, or glass modules depending on grading and diagnostics.',
    status: 'supported',
    recordIds: ['REC_ADEME_REFURBISHED_2022'],
  };

  const water: QualitativePathwayResult = {
    domain: 'water',
    summary: 'Reduced process water consumption.',
    details: 'Restricted to component cleaning and partial replacement part manufacture.',
    status: 'supported',
    recordIds: [],
  };

  const waste: QualitativePathwayResult = {
    domain: 'waste_circularity',
    summary: 'Formal industrial circularity with testing and grading.',
    details: 'Industrial refurbishment processes defective components and prevents premature device shredding.',
    status: 'supported',
    recordIds: ['REC_ADEME_REFURBISHED_2022'],
  };

  if (options.refurbishedScenarioIsAdemeRef) {
    // Invariant 12: exactly labelled ADEME 2-year reference scenario
    return {
      pathway: 'REFURBISHED',
      title: 'Refurbished Phone (ADEME 2-Year Scenario)',
      subtitle: 'ADEME 2022 specific reference scenario',
      isFeasible: true,
      climate: {
        status: 'known_single',
        centralKgCO2e: 7.61,
        rangeKgCO2e: null,
        breakdown: {
          productionKg: null, // not decomposed
          distributionKg: null,
          repairKg: null,
          useChargingKg: null,
          eolDisposalKg: null,
        },
        horizonYears: 2.0,
        explanation:
          '7.61 kg CO2e represents ADEME’s (2022) specific 2-year refurbished reference scenario under direct cut-off accounting in France. It is not decomposed into invented sub-factors and is not a universal refurbished constant.',
        epistemicNotes: [
          'Direct cut-off allocation: past manufacture excluded.',
          'Applicable specifically to the ADEME reference scenario; do not generalize across arbitrary vendors or horizons.',
        ],
        recordIds: ['REC_ADEME_REFURBISHED_2022'],
      },
      materials,
      water,
      waste,
    };
  }

  // Invariant 11 & 26: Arbitrary refurbished phone with no approved candidate data
  return {
    pathway: 'REFURBISHED',
    title: 'Refurbished Phone',
    subtitle: 'Industrial reconditioning & testing',
    isFeasible: true,
    climate: {
      status: 'unknown',
      centralKgCO2e: null,
      rangeKgCO2e: null,
      breakdown: {
        productionKg: null,
        distributionKg: null,
        repairKg: null,
        useChargingKg: charging.centralKg ?? charging.rangeKg,
        eolDisposalKg: null,
      },
      horizonYears: horizon,
      explanation:
        'Not enough evidence to quantify this responsibly. Refurbishment burdens depend heavily on exact facility energy, parts replaced (battery, screen), logistics, and vendor standards. No certified candidate-specific footprint is available.',
      epistemicNotes: [
        'Unknown != zero. We refuse to fabricate an arbitrary average.',
        'ADEME 7.61 kg CO2e is restricted to its own 2-year French reference scenario and is not applied automatically here.',
        'No depreciation allocation percentage is invented.',
      ],
      recordIds: ['REC_ADEME_REFURBISHED_2022'],
    },
    materials,
    water,
    waste,
  };
}

/**
 * Evaluates the NEW phone pathway
 * Invariant 13: unknown new phone identity -> generic production bracket 25–70 kg, distribution 2–4 kg
 * Invariant 14: approved exact model evidence overrides generic fallback
 * Invariant 20: long lifetime must NOT amortize production to make replacement appear favourable in horizon H
 */
export function evaluateNewPathway(
  situation: SituationState,
  options: CalculationOptions = {}
): PathwayEvaluation {
  const adequacy = evaluateAdequacy(situation);
  const horizon = adequacy.comparisonHorizonYears;
  const charging = calculateChargingEmissions(horizon, situation.chargingLocationCode);

  const candidateId = options.candidateModelId;
  const model = candidateId ? DEVICE_REGISTRY[candidateId] : null;

  let prodBurden: number | [number, number];
  let distBurden: number | [number, number];
  let totalCentral: number | null = null;
  let totalRange: [number, number] | null = null;
  let explanation = '';
  let recordIds: string[] = [];

  if (model && model.dataStatus === 'model_specific_approved') {
    // Invariant 14: exact model overrides generic
    prodBurden = model.lifecycleCO2e.productionKg;
    distBurden = model.lifecycleCO2e.distributionKg;
    const baseDirect = (typeof prodBurden === 'number' ? prodBurden : prodBurden[0]) +
      (typeof distBurden === 'number' ? distBurden : distBurden[0]);

    if (charging.centralKg !== null) {
      totalCentral = Number((baseDirect + charging.centralKg).toFixed(2));
      if (charging.rangeKg) {
        totalRange = [
          Number((baseDirect + charging.rangeKg[0]).toFixed(2)),
          Number((baseDirect + charging.rangeKg[1]).toFixed(2)),
        ];
      }
    } else {
      totalCentral = Number(baseDirect.toFixed(2));
    }

    explanation = `${model.name} certified data: production approx ${prodBurden} kg CO2e, transport ${distBurden} kg CO2e (${model.provenance.studyName}). Prospective manufacturing burden is committed upfront upon purchase.`;
    recordIds = [model.provenance.sourceId];
  } else {
    // Invariant 13: generic production bracket 25–70 kg, distribution 2–4 kg
    prodBurden = [25, 70];
    distBurden = [2, 4];

    const baseMin = prodBurden[0] + distBurden[0]; // 27
    const baseMax = prodBurden[1] + distBurden[1]; // 74

    if (charging.centralKg !== null) {
      totalRange = [
        Number((baseMin + (charging.rangeKg ? charging.rangeKg[0] : charging.centralKg)).toFixed(2)),
        Number((baseMax + (charging.rangeKg ? charging.rangeKg[1] : charging.centralKg)).toFixed(2)),
      ];
      totalCentral = Number((40 + 3 + charging.centralKg).toFixed(2)); // 40 is illustrative scenario value
    } else {
      totalRange = [baseMin, baseMax];
      totalCentral = 43; // 40 prod + 3 dist illustrative
    }

    explanation = 'Generic evidence bracket: 25–70 kg CO2e manufacturing + 2–4 kg distribution (heterogeneous peer-reviewed literature). 40 kg is an illustrative scenario value, not an industry average.';
    recordIds = ['REC_GENERIC_PROD_BRACKET'];
  }

  const materials: QualitativePathwayResult = {
    domain: 'materials_extraction',
    summary: 'Additional whole-device material extraction and processing.',
    details: 'Triggers extraction of ~40+ distinct metals (copper, lithium, cobalt, gold, neodymium) and high-purity monocrystalline silicon wafer lithography.',
    status: 'supported',
    recordIds: ['REC_MINING_PRESSURES_2025'],
  };

  const water: QualitativePathwayResult = {
    domain: 'water',
    summary: 'Substantial fab-level ultrapure water consumption.',
    details: 'Semiconductor chip fabrication requires thousands of litres of ultrapure water per wafer cycle.',
    status: 'supported',
    recordIds: [],
  };

  const waste: QualitativePathwayResult = {
    domain: 'waste_circularity',
    summary: 'Introduces a new physical device into the global electronics inventory.',
    details: 'Places the user’s existing phone into retirement (drawer, resale, trade-in, or disposal).',
    status: 'supported',
    recordIds: [],
  };

  return {
    pathway: 'NEW',
    title: 'Buy a New Phone',
    subtitle: 'Newly manufactured device',
    isFeasible: true,
    climate: {
      status: totalRange ? 'known_range' : 'known_single',
      centralKgCO2e: totalCentral,
      rangeKgCO2e: totalRange,
      breakdown: {
        productionKg: prodBurden,
        distributionKg: distBurden,
        repairKg: 0,
        useChargingKg: charging.centralKg ?? charging.rangeKg,
        eolDisposalKg: null,
      },
      horizonYears: horizon,
      explanation,
      epistemicNotes: [
        'Invariant: The entire manufacturing burden is incurred at the decision point. It is not amortized over a hypothetical 8-year span to artificially lower the prospective comparison burden against an existing adequate phone.',
        'Materials pathway carbon is already incorporated into cradle-to-gate LCA; do not add mineral CO2 on top.',
      ],
      recordIds,
    },
    materials,
    water,
    waste,
  };
}

/**
 * Evaluates all 5 pathways simultaneously
 */
export function evaluateAllPathways(
  situation: SituationState,
  options: CalculationOptions = {}
): Record<string, PathwayEvaluation> {
  return {
    KEEP: evaluateKeepPathway(situation, options),
    REPAIR: evaluateRepairPathway(situation, options),
    USED: evaluateUsedPathway(situation, options),
    REFURBISHED: evaluateRefurbishedPathway(situation, options),
    NEW: evaluateNewPathway(situation, options),
  };
}
