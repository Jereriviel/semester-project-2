import { get, post, put, del } from "./api.js";
import type {
  ListingBase,
  PaginatedResponse,
  SingleListingResponse,
  CreateListingRequest,
  CreateListingResponse,
  UpdateListingRequest,
  UpdateListingResponse,
  CreateBidRequest,
  CreateBidResponse,
} from "../types/listings.js";

export async function getAllListings(
  page: number = 1,
  limit: number = 12
): Promise<PaginatedResponse<ListingBase>> {
  return get<PaginatedResponse<ListingBase>>(
    `/auction/listings?page=${page}&limit=${limit}&sort=created&sortOrder=desc&_seller=true&_bids=true`
  );
}

export async function getSingleListing(
  id: string
): Promise<SingleListingResponse> {
  return get<SingleListingResponse>(
    `/auction/listings/${id}?_seller=true&_bids=true`
  );
}

export async function createListing(
  body: CreateListingRequest
): Promise<CreateListingResponse> {
  return post<CreateListingResponse>("/auction/listings", body);
}

export async function updateListing(
  body: UpdateListingRequest,
  id: string
): Promise<UpdateListingResponse> {
  return put<UpdateListingResponse>(`/auction/listings/${id}`, body);
}

export async function deleteListing(id: string): Promise<void> {
  return del<void>(`/auction/listings/${id}`);
}

export async function bidOnListing(
  body: CreateBidRequest,
  id: string
): Promise<CreateBidResponse> {
  return post<CreateBidResponse>(`/auction/listings/${id}/bids`, body);
}

export async function searchListings(
  query: string,
  page: number = 1,
  pageSize: number = 12
): Promise<PaginatedResponse<ListingBase>> {
  return get<PaginatedResponse<ListingBase>>(
    `/auction/listings/search?` +
      `q=${encodeURIComponent(query)}` +
      `&page=${page}` +
      `&limit=${pageSize}` +
      `&_seller=true&_bids=true`
  );
}

export async function filterListingsByTag(
  tag: string,
  page: number = 1,
  pageSize: number = 12
): Promise<PaginatedResponse<ListingBase>> {
  const params = new URLSearchParams();
  if (tag) params.append("_tag", tag);
  params.append("page", String(page));
  params.append("limit", String(pageSize));
  params.append("_seller", "true");
  params.append("_bids", "true");

  return get<PaginatedResponse<ListingBase>>(
    `/auction/listings?${params.toString()}`
  );
}
