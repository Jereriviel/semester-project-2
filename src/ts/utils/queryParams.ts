export type ListingQueryParams = {
  seller?: boolean;
  bids?: boolean;
  listings?: boolean;
  active?: boolean;
  page?: number;
  limit?: number;
  sort?: string;
  sortOrder?: "asc" | "desc";
  tag?: string;
  search?: string;
};

export function buildQuery(params?: ListingQueryParams): string {
  const query = new URLSearchParams();

  if (params?.page) query.append("page", String(params.page));
  if (params?.limit) query.append("limit", String(params.limit));
  if (params?.sort) query.append("sort", params.sort);
  if (params?.sortOrder) query.append("sortOrder", params.sortOrder);

  if (params?.seller) query.append("_seller", "true");
  if (params?.bids) query.append("_bids", "true");
  if (params?.listings) query.append("_listings", "true");
  if (params?.active !== undefined)
    query.append("_active", String(params.active));
  if (params?.tag) query.append("_tag", params.tag);
  if (params?.search) query.append("q", params.search);

  const result = query.toString();
  return result ? `?${result}` : "";
}
