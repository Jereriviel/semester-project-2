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

export async function getProfile(name: string): Promise<Profile> {
  const response = await get<ProfileResponse>(`/auction/profiles/${name}`);
  if (!response) {
    throw new Error("Profile not found");
  }
  return response.data;
}

export async function updateProfile(
  body: UpdateProfileRequest,
  name: string
): Promise<UpdateProfileResponse> {
  return put<UpdateProfileResponse>(`/auction/profiles/${name}`, body);
}

export async function getProfileListings(
  name: string
): Promise<ProfileListingsResponse> {
  const url = `/auction/profiles/${name}/listings?_seller=true&_bids=true`;
  return get<ProfileListingsResponse>(url);
}

export async function getProfileBids(
  name: string
): Promise<ProfileBidsResponse> {
  const url = `/auction/profiles/${name}/bids?_listings=true&_seller=true&_bids=true`;
  return get<ProfileBidsResponse>(url);
}

export async function getProfileWins(
  name: string
): Promise<ProfileWinsResponse> {
  const url = `/auction/profiles/${name}/wins?_seller=true&_bids=true`;
  return get<ProfileWinsResponse>(url);
}
