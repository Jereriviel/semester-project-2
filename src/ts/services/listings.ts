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
import { buildQuery } from "../utils/queryParams.js";

const BASE = "/auction/listings";

export async function getAllListings(
  page: number = 1,
  limit: number = 12,
  sortOrder: "asc" | "desc" = "desc",
  active?: boolean
): Promise<PaginatedResponse<ListingBase>> {
  return get(
    BASE +
      buildQuery({
        page,
        limit,
        sort: "created",
        sortOrder,
        seller: true,
        bids: true,
        active,
      })
  );
}

export async function getSingleListing(
  id: string
): Promise<SingleListingResponse> {
  return get(
    `${BASE}/${id}` +
      buildQuery({
        seller: true,
        bids: true,
      })
  );
}

export async function createListing(
  body: CreateListingRequest
): Promise<CreateListingResponse> {
  return post(BASE, body);
}

export async function updateListing(
  body: UpdateListingRequest,
  id: string
): Promise<UpdateListingResponse> {
  return put(`${BASE}/${id}`, body);
}

export async function deleteListing(id: string): Promise<void> {
  return del(`${BASE}/${id}`);
}

export async function bidOnListing(
  body: CreateBidRequest,
  id: string
): Promise<CreateBidResponse> {
  return post(`${BASE}/${id}/bids`, body);
}

export async function searchListings(
  query: string,
  page: number = 1,
  pageSize: number = 12,
  sortOrder: "asc" | "desc" = "desc",
  active?: boolean
): Promise<PaginatedResponse<ListingBase>> {
  return get(
    `${BASE}/search` +
      buildQuery({
        search: query,
        page,
        limit: pageSize,
        sort: "created",
        sortOrder,
        seller: true,
        bids: true,
        active,
      })
  );
}

export async function filterListingsByTag(
  tag: string,
  page: number = 1,
  pageSize: number = 12,
  sortOrder: "asc" | "desc" = "desc",
  active?: boolean
): Promise<PaginatedResponse<ListingBase>> {
  const normalizedTag = tag.trim().toLowerCase();

  return get(
    BASE +
      buildQuery({
        tag: normalizedTag,
        page,
        limit: pageSize,
        sort: "created",
        sortOrder,
        seller: true,
        bids: true,
        active,
      })
  );
}
