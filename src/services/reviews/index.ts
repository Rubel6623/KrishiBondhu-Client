"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getMyReviews = async () => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/reviews/my-reviews`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["reviews"] },
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch reviews",
    };
  }
};

export const deleteReview = async (id: string) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/reviews/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (result.success) {
      (revalidateTag as any)("reviews");
      revalidatePath("/dashboard/farmer/reviews");
      revalidatePath("/dashboard/provider/reviews");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to delete review",
    };
  }
};

export const getAllReviews = async () => {
  try {
    const res = await fetch(`${BASE_URL}/reviews`, {
      method: "GET",
      next: { tags: ["reviews"], revalidate: 3600 }, // Cache for 1 hour
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch all reviews",
    };
  }
};
export const createReview = async (data: any) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      (revalidateTag as any)("reviews");
      revalidatePath("/dashboard/farmer/reviews");
      revalidatePath("/dashboard/provider/reviews");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create review",
    };
  }
};
