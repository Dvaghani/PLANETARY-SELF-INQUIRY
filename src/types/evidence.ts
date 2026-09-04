// Stage 3: Empirical Evidence & Epistemic Schema Types

export type EpistemicCategory = 'SCIENCE_EMPIRICAL' | 'AP_PHILOSOPHICAL' | 'PROJECT_INTERPRETATION';

export type EvidenceDomain =
  | 'climate_ghg'
  | 'materials_extraction'
  | 'water'
  | 'waste_circularity'
  | 'planetary_systems';

export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'provisional_range';

export type EvidenceScope =
  | 'model_specific'
  | 'product_class'
  | 'global_assessment'
  | 'systematic_review'
  | 'site_specific'
  | 'global_context'
  | 'methodological';

export type AttributionStatus =
  | 'device_specific'
  | 'product_class_generalization'
  | 'pressure_to_outcome'
  | 'conditional_pathway'
  | 'scenario_assumption'
  | 'not_attributable_to_specific_device'
  | 'unknown';

export type ResultCapability =
  | 'quantitative'
  | 'range_quantitative'
  | 'partial_quantitative'
  | 'conditional'
  | 'qualitative_only'
  | 'insufficient_information';

export interface ImpactPathwayRecord {
  record_id: string;
  version: string;
  claim: string;
  evidence_domain: EvidenceDomain;
  epistemic_category: EpistemicCategory;
  confidence: ConfidenceLevel;
  evidence_scope: EvidenceScope;
  attribution_status: AttributionStatus;
  result_capability: ResultCapability;
  conditions: string[];
  status: 'approved' | 'provisional' | 'screened_unapproved';
  quantitative_value?: number;
  range_value?: [number, number];
  unit?: string;
  source_ids: string[];
  notes: string;
  what_it_does_not_mean?: string;
  assumptions?: string;
  uncertainty_description?: string;
}

export interface SourceCitation {
  id: string;
  shortTitle: string;
  fullTitle: string;
  authors: string;
  year: number;
  publisherOrJournal: string;
  url?: string;
  doi?: string;
  governingFamily:
    | 'IPCC_AR6_WG1'
    | 'IPCC_AR6_WG2'
    | 'IPCC_AR6_WG3'
    | 'EU_JRC'
    | 'FRAUNHOFER_FAIRPHONE'
    | 'SAMSUNG_LCA'
    | 'APPLE_PER'
    | 'ADEME_2022'
    | 'ITU_T_L1410'
    | 'US_SECONDHAND_2026'
    | 'NATURE_REVIEWS_2025'
    | 'AP_FRAMEWORK'
    | 'GREEN_SOFTWARE_SWD';
  provenanceNotes?: string;
}

export type AlternativePathway = 'KEEP' | 'REPAIR' | 'USED' | 'REFURBISHED' | 'NEW';

export interface QuantitativeClimateResult {
  status: 'known_single' | 'known_range' | 'partial' | 'unknown' | 'infeasible';
  centralKgCO2e: number | null;
  rangeKgCO2e: [number, number] | null;
  breakdown: {
    productionKg: number | [number, number] | null;
    distributionKg: number | [number, number] | null;
    repairKg: number | [number, number] | null;
    useChargingKg: number | [number, number] | null;
    eolDisposalKg: number | [number, number] | null;
  };
  horizonYears: number | [number, number] | null;
  explanation: string;
  epistemicNotes: string[];
  recordIds: string[];
}

export interface QualitativePathwayResult {
  domain: EvidenceDomain;
  summary: string;
  details: string;
  status: 'supported' | 'conditional' | 'unsupported_unknown';
  recordIds: string[];
}

export interface PathwayEvaluation {
  pathway: AlternativePathway;
  title: string;
  subtitle: string;
  isFeasible: boolean;
  infeasibilityReason?: string;
  climate: QuantitativeClimateResult;
  materials: QualitativePathwayResult;
  water: QualitativePathwayResult;
  waste: QualitativePathwayResult;
}
