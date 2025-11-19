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
  return get<ProfileListingsResponse>(`/auction/profiles/${name}/listings`);
}

export async function getProfileBids(
  name: string
): Promise<ProfileBidsResponse> {
  return get<ProfileBidsResponse>(`/auction/profiles/${name}/bids`);
}

export async function getProfileWins(
  name: string
): Promise<ProfileWinsResponse> {
  return get<ProfileWinsResponse>(`/auction/profiles/${name}/wins`);
}
