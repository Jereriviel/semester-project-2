import { get, put } from "./api.js";
import type {
  Profile,
  ProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  ProfileListingsResponse,
  ProfileBidsResponse,
  ProfileWinsResponse,
} from "../types/profile.js";
import { buildQuery } from "../utils/queryParams.js";

const BASE = "/auction/profiles";

export async function getProfile(name: string): Promise<Profile> {
  const response = await get<ProfileResponse>(`${BASE}/${name}`);
  return response.data;
}

export async function updateProfile(
  body: UpdateProfileRequest,
  name: string
): Promise<UpdateProfileResponse> {
  return put(`${BASE}/${name}`, body);
}

export async function getProfileListings(
  name: string
): Promise<ProfileListingsResponse> {
  return get(
    `${BASE}/${name}/listings` +
      buildQuery({
        seller: true,
        bids: true,
      })
  );
}

export async function getProfileBids(
  name: string
): Promise<ProfileBidsResponse> {
  return get(
    `${BASE}/${name}/bids` +
      buildQuery({
        listings: true,
        seller: true,
        bids: true,
      })
  );
}

export async function getProfileWins(
  name: string
): Promise<ProfileWinsResponse> {
  return get(
    `${BASE}/${name}/wins` +
      buildQuery({
        seller: true,
        bids: true,
      })
  );
}
