// Electricity Factors & Charging Energy Constants

export interface GridEmissionFactor {
  countryCode: string;
  countryName: string;
  intensityKgCO2ePerKWh: number;
  year: number;
  sourceName: string;
  sourceUrl?: string;
  notes: string;
}

export const CHARGING_ENERGY_KWH_PER_YEAR = {
  central: 4.0, // Approved EU JRC central value
  sensitivityMin: 2.0,
  sensitivityMax: 8.0,
  literatureRangeNotes: 'Reviewed estimates range around ~2.0 to 7.74 kWh/year depending on standby losses, usage patterns, and charger efficiency (EC JRC 2022).',
};

export const GRID_FACTORS: Record<string, GridEmissionFactor> = {
  DE: {
    countryCode: 'DE',
    countryName: 'Germany',
    intensityKgCO2ePerKWh: 0.38,
    year: 2023,
    sourceName: 'Umweltbundesamt (UBA) German Environment Agency',
    notes: 'National grid average including coal, gas, wind, and solar mix.',
  },
  GB: {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    intensityKgCO2ePerKWh: 0.15,
    year: 2024,
    sourceName: 'Department for Energy Security and Net Zero (DESNZ / DEFRA)',
    notes: 'UK greenhouse gas reporting conversion factors for grid electricity.',
  },
  US: {
    countryCode: 'US',
    countryName: 'United States',
    intensityKgCO2ePerKWh: 0.37,
    year: 2024,
    sourceName: 'US Environmental Protection Agency (EPA eGRID 2024 national gross output)',
    notes: 'US national average mix. Regional grid subregions vary significantly.',
  },
  FR: {
    countryCode: 'FR',
    countryName: 'France',
    intensityKgCO2ePerKWh: 0.05,
    year: 2023,
    sourceName: 'Réseau de Transport d’Électricité (RTE) France',
    notes: 'Low direct generation emissions due to high nuclear and hydro generation.',
  },
  IN: {
    countryCode: 'IN',
    countryName: 'India',
    intensityKgCO2ePerKWh: 0.71,
    year: 2023,
    sourceName: 'Central Electricity Authority (CEA) CO2 Baseline Database',
    notes: 'Weighted average grid emission factor for the National Grid of India.',
  },
  GLOBAL_AVG: {
    countryCode: 'GLOBAL_AVG',
    countryName: 'Global Average (IEA Benchmark)',
    intensityKgCO2ePerKWh: 0.44,
    year: 2023,
    sourceName: 'International Energy Agency (IEA World Energy Outlook)',
    notes: 'Global average carbon intensity of electricity generation.',
  },
};

export const COUNTRY_OPTIONS = [
  { code: 'NONE', label: 'I prefer not to say / Not listed (Omit charging carbon)' },
  { code: 'DE', label: 'Germany (~0.38 kg CO2e/kWh, UBA)' },
  { code: 'GB', label: 'United Kingdom (~0.15 kg CO2e/kWh, DESNZ)' },
  { code: 'US', label: 'United States (~0.37 kg CO2e/kWh, EPA)' },
  { code: 'FR', label: 'France (~0.05 kg CO2e/kWh, RTE)' },
  { code: 'IN', label: 'India (~0.71 kg CO2e/kWh, CEA)' },
  { code: 'GLOBAL_AVG', label: 'Global Average (~0.44 kg CO2e/kWh, IEA benchmark)' },
];

export function getGridFactor(code: string | null): GridEmissionFactor | null {
  if (!code || code === 'NONE' || !GRID_FACTORS[code]) {
    return null;
  }
  return GRID_FACTORS[code];
}
