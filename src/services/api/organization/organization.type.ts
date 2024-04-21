import { Address, LinkToSource, Photo, ToCheck } from "../pets/pets.types";

export interface OrganizationDTO {
  organizations: Organization[];
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

export interface OrganizationQueryParam {}
