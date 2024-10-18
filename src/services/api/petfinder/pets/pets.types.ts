export type ToCheck = any;

export interface PetsDTO {
  animals: Pet[];
  pagination: Pagination;
}

export interface PetDTO {
  animal: Pet;
}

export interface Pagination {
  count_per_page: number;
  total_count: number;
  current_page: number;
  total_pages: number;
  _links: {
    next: LinkToSource;
  };
}

export interface Pet {
  id: number;
  organization_id: string;
  url: string;
  type: string;
  species: string;
  breeds: Breeds;
  colors: Colors;
  age: Age;
  gender: Gender;
  size: Size;
  coat: Coat;
  attributes: Attributes;
  environment: Environment;
  tags: string[];
  name: string;
  description: string | null;
  organization_animal_id: string | null;
  photos: Photo[];
  primary_photo_cropped: Photo;
  videos: Video[];
  status: Status;
  status_changed_at: string;
  published_at: string;
  distance: ToCheck | null;
  contact: Contact;
  _links: ObjectInfo;
}

export type Video = ToCheck

export interface Breeds {
  primary: string;
  secondary: string | null;
  mixed: boolean;
  unknown: boolean;
}

export interface Colors {
  primary: string;
  secondary: string | null;
  tertiary: string | null;
}

export interface Attributes {
  spayed_neutered: boolean;
  house_trained: boolean;
  declawed: boolean | null;
  special_needs: boolean;
  shots_current: boolean;
}

export interface Environment {
  children: boolean | null;
  dogs: boolean | null;
  cats: boolean | null;
}

export interface Photo {
  small: string;
  medium: string;
  large: string;
  full: string;
}

export interface Contact {
  email: string;
  phone: string | null;
  address: Address;
}

export interface Address {
  address1: string | null;
  address2: string | null;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface LinkToSource {
  href: string;
}

export interface ObjectInfo {
  self: LinkToSource;
  type: LinkToSource;
  organization: LinkToSource;
}

export type AnimalType =
  | "dog"
  | "cat"
  | "rabbit"
  | "horse"
  | "bird"
  | "small & furry"
  | "scales, fins & other"
  | "barnyard";

export interface PetsQueryParams {
  type?: AnimalType;
  breed?: MultipleValuesString;
  size?: MultipleValuesString<Size>;
  gender?: MultipleValuesString<Gender>;
  age?: MultipleValuesString<Age>;
  color?: string;
  coat?: MultipleValuesString<Coat>;
  status?: MultipleValuesString<Status>;
  name?: string;
  organization?: MultipleValuesString;
  good_with_children?: boolean;
  good_with_dogs?: boolean;
  good_with_cats?: boolean;
  house_trained?: boolean;
  declawed?: boolean;
  special_needs?: boolean;
  /**
   * @description
   * city, state; latitude,longitude; or postal code.
   */
  location?: string | number;
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
   * Must be a valid ISO8601 date-time string
   */
  before?: string;
  /**
   * Must be a valid ISO8601 date-time string
   */
  after?: string;
  /**
   * @default
   * recent
   */
  sort?: Sort;
  /**
   * @default
   * 1
   */
  page?: number;
  /**
   * @default
   * 20
   * @description
   * max: 100
   */
  limit?: number;
}

export type Size = "small" | "medium" | "large" | "xlarge";
export type Gender = "male" | "female" | "unknown";
export type Age = "baby" | "young" | "adult" | "senior";
export type Coat = "short" | "medium" | "long" | "wire" | "hairless" | "curly";
export type Status = "adoptable" | "adopted" | "found";
export type Sort = "recent" | "-recent" | "distance" | "-distance";

/**
 * @description
 * Accepts multiple values, e.g. breed=pug,samoyed
 */
export type MultipleValuesString<T extends string | number | boolean = never> =
  | string
  | T;

export interface AnimalTypesInfoDTO {
  types: AnimalTypesDetails[];
}

export interface AnimalTypesDetails {
  name: Capitalize<AnimalType>;
  coats: string[];
  colors: string[];
  genders: string[];
  _links: {
    self: LinkToSource;
    breeds: LinkToSource;
  };
}

