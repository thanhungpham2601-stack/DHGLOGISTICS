export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  image: string;
  suitableFor: string[];
  features: string[];
  equipmentUsed: string[];
}

export interface VehicleSpec {
  id: string;
  name: string;
  category: string;
  payload: string;
  dimensions: string;
  description: string;
  image: string;
  features: string[];
  axleCount?: string;
  enginePower?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  details: string[];
  icon: string;
}

export interface ProjectCase {
  id: string;
  title: string;
  clientType: string;
  cargo: string;
  weight: string;
  dimension: string;
  route: string;
  image: string;
  highlight: string;
}

export interface QuoteFormData {
  cargoName: string;
  length: number | string;
  width: number | string;
  height: number | string;
  weight: number | string;
  quantity: number | string;
  pickupLocation: string;
  deliveryLocation: string;
  estimatedDate: string;
  specialRequirements: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  companyName: string;
}

export interface RouteSurveyItem {
  title: string;
  desc: string;
  icon: string;
  criticalPoints: string[];
}

export interface MenuItemRow {
  id: string;
  label: string;
  href: string;
  sort_order: number;
  is_active: boolean;
}
