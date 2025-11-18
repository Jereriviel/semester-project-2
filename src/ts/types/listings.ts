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
  _count: ListingCount;
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
}

export interface UpdateListingResponse {
  data: ListingBase;
  meta: Record<string, never>;
}

//Bid on Listing

export interface CreateBidRequest {
  amount: number;
}

export interface CreateBidResponse {
  data: ListingBase;
  meta: Record<string, never>;
}

//Search on Listings

export interface SearchListingsResponse {
  data: ListingBase[];
  meta: Meta;
}
