"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllSpecialists = async () => {
  try {
    const res = await fetch(`${BASE_URL}/specialists`, {
      method: "GET",
      next: { tags: ["specialists"] },
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch specialists" };
  }
};

export const deleteSpecialist = async (profileId: string) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/specialists/${profileId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    if (result.success) {
      revalidatePath("/dashboard/admin/specialists");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to delete specialist" };
  }
};

export const suspendSpecialistUser = async (userId: string) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: false }),
    });
    const result = await res.json();
    if (result.success) {
      revalidatePath("/dashboard/admin/specialists");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to suspend specialist" };
  }
};

export const activateSpecialistUser = async (userId: string) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: true }),
    });
    const result = await res.json();
    if (result.success) {
      revalidatePath("/dashboard/admin/specialists");
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to activate specialist" };
  }
};
