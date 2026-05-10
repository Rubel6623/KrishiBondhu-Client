"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getMyBookings = async (filters: any = {}) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  const queryParams = new URLSearchParams();
  if (filters.status) queryParams.append("status", filters.status);

  try {
    const res = await fetch(`${BASE_URL}/bookings/my-bookings?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["bookings"] },
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch bookings",
    };
  }
};

export const createBooking = async (data: any) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      (revalidateTag as any)("bookings");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create booking",
    };
  }
};

export const updateBookingStatus = async (id: string, status: string) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/bookings/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const result = await res.json();
    if (result.success) {
      (revalidateTag as any)("bookings");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update booking status",
    };
  }
};
