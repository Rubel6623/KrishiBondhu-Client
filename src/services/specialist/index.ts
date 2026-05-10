"use server";

import { getAccessToken } from "../auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllSpecialists = async (query?: Record<string, any>) => {
  const params = new URLSearchParams(query);
  try {
    const res = await fetch(`${BASE_URL}/specialists?${params.toString()}`, {
      method: "GET",
      next: { tags: ["specialists"] },
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch specialists",
    };
  }
};

export const getSpecialistById = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/specialists/${id}`, {
      method: "GET",
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch specialist",
    };
  }
};

export const getMySpecialistProfile = async () => {
  const token = await getAccessToken();
  try {
    const res = await fetch(`${BASE_URL}/specialists/my-profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch profile",
    };
  }
};

export const upsertSpecialistProfile = async (data: any) => {
  const token = await getAccessToken();
  try {
    const res = await fetch(`${BASE_URL}/specialists/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update profile",
    };
  }
};
