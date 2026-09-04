// Device Registry: Authoritative Model-Specific Data & Generic Fallbacks

export interface ModelData {
  id: string;
  name: string;
  manufacturer: string;
  launchYear: number;
  dataStatus: 'model_specific_approved' | 'generic_fallback';
  provenance: {
    sourceId: string;
    studyName: string;
    notes: string;
    capacityRestriction?: string;
  };
  lifecycleCO2e: {
    totalLifecycleKg?: number;
    productionKg: number | [number, number];
    distributionKg: number | [number, number];
    usePhaseKg?: number | [number, number];
    eolKg?: number | [number, number];
    useYearsAssumed?: number;
  };
  repairBurdenCO2e?: {
    batteryKg?: { diy: number; professional: number } | [number, number];
    displayKg?: { diy: number; professional: number } | [number, number];
    mainboardKg?: { diyModule?: number; proModule?: number; proBoardLevel?: number };
  };
  securitySupport?: {
    announcedYears: number;
    statusSummary: string;
    source: string;
  };
}

export const DEVICE_REGISTRY: Record<string, ModelData> = {
  fairphone_5: {
    id: 'fairphone_5',
    name: 'Fairphone 5',
    manufacturer: 'Fairphone',
    launchYear: 2023,
    dataStatus: 'model_specific_approved',
    provenance: {
      sourceId: 'FRAUNHOFER_FAIRPHONE_2023',
      studyName: 'Life Cycle Assessment of the Fairphone 5 (Fraunhofer IZM, 2023)',
      notes: 'Commissioned by Fairphone B.V. Full modular disassembly accounting.',
    },
    lifecycleCO2e: {
      totalLifecycleKg: 42.10,
      productionKg: 32.70,
      distributionKg: 2.81,
      usePhaseKg: 6.59,
      eolKg: 0.041,
      useYearsAssumed: 3,
    },
    repairBurdenCO2e: {
      batteryKg: { diy: 0.568, professional: 0.617 },
      displayKg: { diy: 7.431, professional: 7.493 },
      mainboardKg: { diyModule: 17.840, proModule: 17.909, proBoardLevel: 6.959 },
    },
    securitySupport: {
      announcedYears: 8,
      statusSummary: 'Software and security support committed until 2031 (8-10 years from launch).',
      source: 'Fairphone official product specifications',
    },
  },

  samsung_galaxy_s25_eur: {
    id: 'samsung_galaxy_s25_eur',
    name: 'Samsung Galaxy S25 (EUR)',
    manufacturer: 'Samsung',
    launchYear: 2025,
    dataStatus: 'model_specific_approved',
    provenance: {
      sourceId: 'SAMSUNG_S25_LCA_2025',
      studyName: 'Samsung Galaxy S25 Product Environmental Report / LCA (EUR Configuration)',
      notes: 'Values are configuration-specific (EUR model). Rounded percentages reported: 88.0% production, 5.2% distribution, 6.5% use, 0.3% disposal. Do not transfer to other Galaxy variants.',
      capacityRestriction: 'Standard base storage EUR configuration only',
    },
    lifecycleCO2e: {
      totalLifecycleKg: 45.7,
      productionKg: 40.22,
      distributionKg: 2.38,
      usePhaseKg: 2.97,
      eolKg: 0.14,
      useYearsAssumed: 3,
    },
    securitySupport: {
      announcedYears: 7,
      statusSummary: '7 generations of OS upgrades and 7 years of security updates from global launch.',
      source: 'Samsung Electronics official policy declaration',
    },
  },

  apple_iphone_16_128gb: {
    id: 'apple_iphone_16_128gb',
    name: 'Apple iPhone 16 (128 GB)',
    manufacturer: 'Apple',
    launchYear: 2024,
    dataStatus: 'model_specific_approved',
    provenance: {
      sourceId: 'APPLE_IPHONE16_PER_2024',
      studyName: 'Apple iPhone 16 Product Environmental Report (September 2024)',
      notes: 'Values specific to 128 GB model. Apple assumes three years of first-owner product use. Derived from 80% production, 3% transport, 18% use, <1% EOL. Do not generalize to 256GB or 512GB.',
      capacityRestriction: '128 GB configuration only',
    },
    lifecycleCO2e: {
      totalLifecycleKg: 56.0,
      productionKg: 44.80,
      distributionKg: 1.68,
      usePhaseKg: 10.08,
      eolKg: 0.50,
      useYearsAssumed: 3,
    },
    securitySupport: {
      announcedYears: 5,
      statusSummary: 'Minimum 5 years of security updates mandated by UK PSTI Act compliance; historically 6-7 years.',
      source: 'Apple UK PSTI Act compliance statement',
    },
  },

  generic_smartphone: {
    id: 'generic_smartphone',
    name: 'Generic / Unlisted Smartphone',
    manufacturer: 'Various',
    launchYear: 2023,
    dataStatus: 'generic_fallback',
    provenance: {
      sourceId: 'JRC_SMARTPHONE_EVIDENCE_2022',
      studyName: 'European Commission Joint Research Centre (JRC) Ecodesign Preparatory Study & Academic Reviews',
      notes: 'Heterogeneous evidence bracket (25–70 kg CO2e production). 40 kg CO2e is an illustrative scenario value, NOT an industry average.',
    },
    lifecycleCO2e: {
      productionKg: [25, 70],
      distributionKg: [2, 4],
      usePhaseKg: [2.5, 5.0],
      eolKg: [0.0, 0.2],
      useYearsAssumed: 3,
    },
    repairBurdenCO2e: {
      batteryKg: [0.3, 0.7],
      displayKg: [3.0, 8.0],
      // Mainboard has NO generic approved value. Must remain null/unknown.
    },
  },
};

export const POPULAR_DEVICE_OPTIONS = [
  { id: 'generic_smartphone', label: 'Unlisted / Generic Smartphone (Generic Evidence Bracket)' },
  { id: 'apple_iphone_16_128gb', label: 'Apple iPhone 16 (128 GB)' },
  { id: 'samsung_galaxy_s25_eur', label: 'Samsung Galaxy S25 (EUR configuration)' },
  { id: 'fairphone_5', label: 'Fairphone 5 (Modular LCA)' },
];
