export interface Media {
  url: string;
  alt: string;
}

export interface ListingCount {
  bids: number;
}

export interface ListingBase {
  id: string;
  title: string;
  description: string;
  tags: string[];
  media: Media[];
  created: string;
  updated: string;
  endsAt: string;
  seller?: UserProfile;
  bids?: Bid[];
  _count: ListingCount;
}

export interface UserProfile {
  name: string;
  email: string;
  bio?: string;
  avatar?: Media;
  banner?: Media;
  wins?: string[];
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

//All Listings

export interface AllListingsResponse {
  data: ListingBase[];
  meta: Meta;
}

//Single Listing

export interface SingleListingResponse {
  data: ListingBase;
  meta: Record<string, never>;
}

//Create Listing

export interface CreateListingRequest {
  title: string;
  description?: string;
  tags?: string[];
  media?: Media[];
  endsAt: string;
}

export interface CreateListingResponse {
  data: ListingBase;
  meta: Record<string, never>;
}

//Update Listing

export interface UpdateListingRequest {
  title?: string;
  description?: string;
  tags?: string[];
  media?: Media[];
  endsAt?: string;
}

export interface UpdateListingResponse {
  data: ListingBase;
  meta: Record<string, never>;
}

//Bids

export interface Bid {
  id: string;
  amount: number;
  bidder: UserProfile;
  created: string;
}

export interface CreateBidRequest {
  amount: number;
}

export interface CreateBidResponse {
  data: ListingBase;
  meta: Record<string, never>;
}

//Search Listings

export interface SearchListingsResponse {
  data: ListingBase[];
  meta: Meta;
}

//Paginated Response (All Listings and Search Listings)

export interface PaginatedResponse<T> {
  data: T[];
  meta: Meta;
}
