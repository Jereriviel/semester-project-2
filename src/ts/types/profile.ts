import { ListingBase } from "./listings";

export interface Media {
  url: string;
  alt: string;
}

export interface ProfileCount {
  listings: number;
  wins: number;
}

export interface Profile {
  name: string;
  email: string;
  bio?: string;
  avatar?: Media;
  banner?: Media;
  credits: number;
  _count: ProfileCount;
}

export interface Meta {
  isFirstPage?: boolean;
  isLastPage?: boolean;
  currentPage?: number;
  previousPage?: number | null;
  nextPage?: number | null;
  pageCount?: number;
  totalCount?: number;
}

export interface ProfileResponse {
  data: Profile;
  meta: Record<string, never>;
}

//Update Profile

export interface UpdateProfileRequest {
  bio?: string;
  avatar?: Media;
  banner?: Media;
}

export interface UpdateProfileResponse {
  data: Profile;
  meta: Record<string, never>;
}

//Listings by Profile

export interface ListingMedia {
  url: string;
  alt: string;
}

export interface ListingCount {
  bids: number;
}

export interface ProfileListing {
  id: string;
  title: string;
  description: string;
  media: ListingMedia[];
  tags: string[];
  created: string;
  updated: string;
  endsAt: string;
  _count: ListingCount;
}

export interface ProfileListingsResponse {
  data: ProfileListing[];
  meta: Meta;
}

//Active Bids by Profile

export interface ProfileBid {
  id: string;
  amount: number;
  bidder: Profile;
  created: string;
  listing?: ListingBase;
}

export interface ProfileBidsResponse {
  data: ProfileBid[];
  meta: Meta;
}

//Wins by Profile

export interface ProfileWinsResponse {
  data: ProfileListing[];
  meta: Meta;
}
