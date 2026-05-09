"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllEquipment = async (query?: Record<string, any>) => {
  const params = new URLSearchParams(query);
  try {
    const res = await fetch(`${BASE_URL}/equipment?${params.toString()}`, {
      method: "GET",
      next: { tags: ["equipment"] },
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch equipment",
    };
  }
};

export const deleteEquipment = async (id: string) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/equipment/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (result.success) {
      (revalidateTag as any)("equipment");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong while deleting equipment",
    };
  }
};

export const getSingleEquipment = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/equipment/${id}`, {
      method: "GET",
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch equipment details",
    };
  }
};

export const createEquipment = async (data: any) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/equipment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      (revalidateTag as any)("equipment");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create equipment",
    };
  }
};
