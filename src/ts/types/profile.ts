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
  bio: string;
  avatar: Media;
  banner: Media;
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

export interface SingleProfileResponse {
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

export interface Listing {
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
  data: Listing[];
  meta: Meta;
}

//Active Bids by Profile

export interface Bid {
  id: string;
  amount: number;
  bidder: Profile;
  created: string;
}

export interface ProfileBidsResponse {
  data: Bid[];
  meta: Meta;
}

//Wins by Profile

export interface ProfileWinsResponse {
  data: Listing[];
  meta: Meta;
}
