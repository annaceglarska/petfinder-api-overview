import {
  Address,
  LinkToSource,
  Pagination,
  Photo,
  ToCheck,
} from "../pets/pets.types";

export interface OrganizationsDTO {
  organizations: Organization[];
  pagination: Pagination;
}

export interface OrganizationDTO {
  organization: Organization;
}

export interface Organization {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  hours: WorkingHours;
  url: string;
  website: string | null;
  mission_statement: string | null;
  adoption: Adoption;
  social_media: SocialMedia;
  photos: Photo[];
  distance: ToCheck | null;
  _links: OrganizationInfo;
}

export interface WorkingHours {
  monday: string | null;
  tuesday: string | null;
  wednesday: string | null;
  thursday: string | null;
  friday: string | null;
  saturday: string | null;
  sunday: string | null;
}

export interface Adoption {
  policy: string | null;
  url: string | null;
}

export interface SocialMedia {
  facebook: string | null;
  twitter: string | null;
  youtube: string | null;
  instagram: string | null;
  pinterest: string | null;
}

export interface OrganizationInfo {
  self: LinkToSource;
  animals: LinkToSource;
}

export interface OrganizationQueryParam {
  name?: string;
  location?: string;
  /**
   * @default
   * 100
   *
   * @description
   *  max: 500
   */
  distance?: number;
  /**
   * @description
   * Accepts two-letter abbreviations, e.g. AL, WY
   */
  state?: string;
  /**
   * @description
   * Accepts two-letter abbreviations, e.g. US, CA
   */
  country?: string;
  query?: string;
  sort?: SortOrganization;
  /**
   * @default
   * 100
   *
   * @description
   *  max: 500
   */
  limit?: number;
  /**
   * @default
   * 1
   */
  page?: number;
}

export type SortOrganization =
  | "distance"
  | "-distance"
  | "name"
  | "-name"
  | "country"
  | "-country"
  | "state"
  | "-state";
