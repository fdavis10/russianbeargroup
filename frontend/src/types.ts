export interface SiteInfo {
  title: string;
  email: string;
  whatsapp: string;
  whatsapp_phone: string;
  vk: string;
}

export interface Requirement {
  label: string;
  value: string;
}

export interface Country {
  name: string;
  code: string;
}

export interface CountryOption {
  value: string;
  label: string;
  code: string;
}

export interface Review {
  name: string;
  country: string;
  text: string;
  avatar: string;
}

export interface DocumentInfo {
  id: string;
  title: string;
  description: string;
  url: string;
  preview_color: string;
}

export interface LandingContent {
  site: SiteInfo;
  hero: { headline: string; subheadline: string; cta: string };
  requirements: Requirement[];
  conditions: string[];
  advantages: string[];
  services: string[];
  countries: Country[];
  country_options: CountryOption[];
  reviews: Review[];
}

export interface ContactPayload {
  name: string;
  phone: string;
  country: string;
  message?: string;
  website?: string;
}

export interface ContactResponse {
  status: string;
  message: string;
  links: { whatsapp: string };
}
