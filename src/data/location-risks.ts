// Regional Climate Risk Context (IPCC AR6 WGII Supported Contextualization)

import { RegionalClimateRisk } from '../types/planetary';

export const LOCATION_RISKS: Record<string, RegionalClimateRisk> = {
  DE: {
    countryCode: 'DE',
    countryName: 'Germany',
    riskDomains: [
      {
        title: 'Riverine Flooding & Heavy Precipitation',
        description: 'Increased frequency and intensity of localized extreme convective rainfall events and seasonal river basin swelling (e.g. Rhine and Danube catchments).',
        evidenceSource: 'IPCC AR6 WGII Chapter 13 (Europe)',
        confidence: 'high',
      },
      {
        title: 'Summer Agricultural & Forest Drought',
        description: 'Consecutive summer soil moisture deficits impacting temperate forestry (spruce/beech die-off) and municipal heat stress in dense urban centres.',
        evidenceSource: 'IPCC AR6 WGII Europe Regional Factsheet',
        confidence: 'high',
      },
      {
        title: 'Extreme Heat Waves',
        description: 'Rising frequency of prolonged heat domes elevating excess mortality among vulnerable elderly populations.',
        evidenceSource: 'IPCC AR6 WGII Europe Regional Factsheet',
        confidence: 'high',
      },
    ],
    attributionDisclaimer:
      'Emissions from countless global activities accumulate globally. Climate change is already affecting and projected to further affect Germany through these documented risk pathways. However, your individual phone cannot be assigned a measurable fraction of any specific German flood, drought, or heatwave.',
  },

  GB: {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    riskDomains: [
      {
        title: 'Coastal Erosion & Storm Surge',
        description: 'Accelerated cliff retreat along vulnerable eastern and southern shorelines under accelerating sea level rise.',
        evidenceSource: 'IPCC AR6 WGII Chapter 13 (Europe)',
        confidence: 'high',
      },
      {
        title: 'Surface Water & Flash Flooding',
        description: 'Increased winter precipitation extremes overwhelming urban stormwater infrastructure in metropolitan areas.',
        evidenceSource: 'IPCC AR6 WGII Chapter 13 (Europe)',
        confidence: 'high',
      },
      {
        title: 'Unprecedented High Temperatures',
        description: 'Temperatures exceeding 40°C straining transport infrastructure, rail tracks, and un-airconditioned domestic dwellings.',
        evidenceSource: 'UK Met Office State of the UK Climate / IPCC AR6',
        confidence: 'high',
      },
    ],
    attributionDisclaimer:
      'Emissions from countless global activities accumulate globally. Climate change is already affecting and projected to further affect the United Kingdom through these documented risk pathways. However, your individual phone cannot be assigned a measurable fraction of any specific UK flooding or weather event.',
  },

  US: {
    countryCode: 'US',
    countryName: 'United States',
    riskDomains: [
      {
        title: 'Western Wildfire & Aridity',
        description: 'Expanding vapor pressure deficits and snowpack decline extending wildfire burn season and acute municipal water allocations in the Colorado River basin.',
        evidenceSource: 'IPCC AR6 WGII Chapter 14 (North America)',
        confidence: 'high',
      },
      {
        title: 'Gulf & Atlantic Tropical Cyclone Intensity',
        description: 'Higher proportion of Category 4-5 hurricanes accompanied by intensified storm surges and extreme coastal rainfall.',
        evidenceSource: 'IPCC AR6 WGII North America Regional Factsheet',
        confidence: 'high',
      },
      {
        title: 'Agricultural Heat Stress',
        description: 'Extreme heat stress impacting agricultural yields and outdoor labour conditions across the Midwest and Southern Sunbelt.',
        evidenceSource: 'US 5th National Climate Assessment / IPCC AR6',
        confidence: 'high',
      },
    ],
    attributionDisclaimer:
      'Emissions from countless global activities accumulate globally. Climate change is already affecting and projected to further affect North America through these documented risk pathways. However, your individual phone cannot be assigned a measurable fraction of any specific US hurricane, wildfire, or crop failure.',
  },

  IN: {
    countryCode: 'IN',
    countryName: 'India',
    riskDomains: [
      {
        title: 'Severe Humid Heat Waves (Wet-Bulb Stress)',
        description: 'Compounding high temperature and atmospheric humidity approaching physiological thresholds for outdoor informal workers in northern and coastal river plains.',
        evidenceSource: 'IPCC AR6 WGII Chapter 10 (Asia)',
        confidence: 'high',
      },
      {
        title: 'Erratic Monsoon Variability & Glacial Retreat',
        description: 'Disrupted summer monsoon rainfall cycles featuring fewer rainy days but more catastrophic intense downpours, paired with Himalayan glacial melt.',
        evidenceSource: 'IPCC AR6 WGII Asia Regional Factsheet',
        confidence: 'high',
      },
      {
        title: 'Coastal Inundation in Low-Lying Deltas',
        description: 'Elevated tropical cyclone storm surge and salinization of agricultural lands in the Sundarbans and metropolitan coastlines (Mumbai, Chennai, Kolkata).',
        evidenceSource: 'IPCC AR6 WGII Chapter 10 (Asia)',
        confidence: 'high',
      },
    ],
    attributionDisclaimer:
      'Emissions from countless global activities accumulate globally. Climate change is already affecting and projected to further affect South Asia through these documented risk pathways. However, your individual phone cannot be assigned a measurable fraction of any specific heatwave, flood, or harvest deficit in India.',
  },

  FR: {
    countryCode: 'FR',
    countryName: 'France',
    riskDomains: [
      {
        title: 'Mediterranean Aridification & Forest Fire',
        description: 'Substantial decline in summer runoff across the Rhone basin and increased fire vulnerability in southern pine forests.',
        evidenceSource: 'IPCC AR6 WGII Chapter 13 (Europe)',
        confidence: 'high',
      },
      {
        title: 'Alpine Glacier Recession',
        description: 'Rapid reduction of Mont Blanc massifs impacting hydro storage capacity, alpine tourism, and slope stability.',
        evidenceSource: 'IPCC AR6 WGII Cross-Chapter Paper on Mountains',
        confidence: 'high',
      },
      {
        title: 'Agricultural Drought in Grain Belts',
        description: 'Early spring warm spells followed by prolonged summer dry spells lowering wheat, corn, and vineyard yields.',
        evidenceSource: 'Météo-France / IPCC AR6 WGII',
        confidence: 'high',
      },
    ],
    attributionDisclaimer:
      'Emissions from countless global activities accumulate globally. Climate change is already affecting and projected to further affect France through these documented risk pathways. However, your individual phone cannot be assigned a measurable fraction of any specific French heatwave, fire, or drought.',
  },
};

export function getLocationRisk(countryCode: string | null): RegionalClimateRisk | null {
  if (!countryCode || !LOCATION_RISKS[countryCode]) {
    return null;
  }
  return LOCATION_RISKS[countryCode];
}
