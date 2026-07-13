import axios from "axios";
import type {
  ContactPayload,
  ContactResponse,
  ConsultationPayload,
  DocumentInfo,
  LandingContent,
} from "./types";

export type {
  SiteInfo,
  Requirement,
  Country,
  CountryOption,
  Review,
  DocumentInfo,
  LandingContent,
  ContactPayload,
  ConsultationPayload,
  ContactResponse,
} from "./types";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

const client = axios.create({ baseURL: API_BASE });

export async function fetchLandingContent(): Promise<LandingContent> {
  const { data } = await client.get<LandingContent>("/content/");
  return data;
}

export async function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  const { data } = await client.post<ContactResponse>("/contact/", payload);
  return data;
}

export async function submitConsultation(payload: ConsultationPayload): Promise<ContactResponse> {
  const { data } = await client.post<ContactResponse>("/consultation/", payload);
  return data;
}

export async function fetchDocuments(): Promise<DocumentInfo[]> {
  const { data } = await client.get<DocumentInfo[]>("/documents/");
  return data;
}
