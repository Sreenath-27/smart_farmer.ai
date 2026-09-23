export type AuthMode = "google" | "facebook" | "github" | "guest" | "phone";

export interface UserProfile {
  id: string;
  name: string;
  authMode: AuthMode;
  emailOrPhone?: string;
  avatarUrl?: string;
  village: string; // Used as City / Village
  districtState: string;
  farmSizeAcres: number;
  preferredLanguage: LanguageCode;
  primaryCrops: string[];
  lat?: number;
  lon?: number;
  exactLocationName?: string;
  locationPermissionGranted?: boolean;
}

export type LanguageCode = "en" | "te" | "hi" | "ta" | "kn";

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export type SeverityLevel = "Low" | "Medium" | "High";

export interface PesticideRecommendation {
  productName: string;
  activeIngredient: string;
  manufacturer: string;
  category: "Chemical" | "Bio-Pesticide" | "Organic" | "Fungicide" | "Insecticide" | "Herbicide" | "Bactericide";
  dosagePerAcre: string;
  toxicityLevel: "Class I (Red)" | "Class II (Yellow)" | "Class III (Blue)" | "Class IV (Green)";
  waitingPeriodDays: number;
  sprayTiming: string;
  numberOfCycles?: string;
  safetyInstructions: string;
  priceEstimateRupees?: number;
}

export interface PlantScanResult {
  id: string;
  timestamp: string;
  imageUrl: string;
  cropName: string;
  diseaseName: string;
  scientificName: string;
  isHealthy: boolean;
  severity: SeverityLevel;
  confidencePercent: number;
  infectionAreaPercent: number;
  cause: string;
  symptoms: string[];
  spreadMethod: string;
  preventionTips: string[];
  recoveryTimeDays: string;
  cropLossEstimatePercent: number;
  recommendedPesticides: PesticideRecommendation[];
  organicAlternatives: string[];
  notes?: string;
  treatmentApplied?: boolean;
  farmPlotId?: string;
}

export interface PesticideCatalogItem {
  id: string;
  productName: string;
  activeIngredient: string;
  manufacturer: string;
  category: "Bio/Organic" | "Chemical Fungicide" | "Insecticide" | "Herbicide" | "Bactericide";
  targetCrops: string[];
  targetDiseases: string[];
  dosagePerAcre: string;
  dosagePerLiterWater: string;
  toxicityLevel: "Class I (Red)" | "Class II (Yellow)" | "Class III (Blue)" | "Class IV (Green)";
  waitingPeriodDays: number;
  sprayTiming: string;
  organicAlternative?: string;
  safetyInstructions: string;
  pricePerUnit: number;
  unit: string;
  rating: number;
  qrCodeId: string;
}

export interface FarmPlot {
  id: string;
  name: string;
  location: string;
  acres: number;
  cropsGrown: string;
  infectedZonesCount: number;
  healthScorePercent: number;
  lastScanDate?: string;
}

export interface FarmDiaryEntry {
  id: string;
  date: string;
  farmPlotName: string;
  activityType: "Pesticide Spray" | "Fertilizer" | "Irrigation" | "Disease Inspection" | "Harvesting";
  productUsed: string;
  quantityApplied: string;
  weatherCondition: string;
  notes: string;
}

export interface WeatherData {
  location: string;
  lat: number;
  lon: number;
  temperatureC: number;
  condition: string;
  humidityPercent: number;
  windSpeedKmh: number;
  rainChancePercent: number;
  rainForecast: string;
  uvIndex: number;
  sprayAdvisory: string;
  canSprayToday: boolean;
}

export interface RainPredictionInput {
  temperatureC: number;
  humidityPercent: number;
  windSpeedKmh: number;
  pressureHpa: number;
  cloudCoverPercent: number;
  season: string;
  location: string;
  timeOfDay?: string;
}

export interface RainPredictionResult {
  willRain: boolean;
  rainProbabilityPercent: number;
  statusText: string; // e.g. "Heavy Rain Likely", "No Rain Expected", "Light Drizzle"
  predictedRainfallMm: number;
  expectedStartTimeHours: string; // e.g. "Within 2-4 hours"
  cloudDensityAssessment: string;
  dewPointC: number;
  sprayRecommendation: {
    safeToSpray: boolean;
    rainfastnessRisk: "Low" | "Medium" | "High" | "Severe";
    advisoryMessage: string;
    bestAlternativeWindow: string;
  };
  meteorologicalExplanation: string;
}


export interface MarketplaceItem {
  id: string;
  name: string;
  category: "Pesticide" | "Fertilizer" | "Seeds" | "Sprayer Equipment";
  priceRupees: number;
  rating: number;
  dealerName: string;
  dealerLocation: string;
  dealerPhone: string;
  dealerDistanceKm: number;
  inStock: boolean;
  image: string;
}

export interface GovernmentScheme {
  id: string;
  title: string;
  category: "Subsidy" | "Insurance" | "Equipment" | "Loan";
  subsidyPercent: string;
  eligibility: string;
  benefits: string;
  howToApply: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
