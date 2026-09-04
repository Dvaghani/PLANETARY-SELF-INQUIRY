// Visual & Conceptual Bridges: The Planetary Pathway & Protect My Four Types

export type PersonRole =
  | 'parent'
  | 'partner'
  | 'friend'
  | 'sibling'
  | 'child'
  | 'mentor'
  | 'someone_i_care_about'
  | 'future_generation'
  | 'custom';

export interface PersonCard {
  id: string;
  role: PersonRole;
  customLabel?: string;
  locationCode?: string; // Country or region code
  locationName?: string;
  notes?: string;
}

export interface RegionalClimateRisk {
  countryCode: string;
  countryName: string;
  riskDomains: {
    title: string;
    description: string;
    evidenceSource: string; // e.g. "IPCC AR6 WGII Chapter on Europe / Regional Factsheet"
    confidence: 'high' | 'medium';
  }[];
  attributionDisclaimer: string;
}

export interface PlanetaryPathwayNode {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  category: 'DEVICE' | 'PHYSICAL_DEMANDS' | 'ATMOSPHERE_BIOSPHERE' | 'PLANETARY_DYNAMICS' | 'SHARED_RISKS' | 'PEOPLE_AND_PLACES';
  scientificNote: string;
}
