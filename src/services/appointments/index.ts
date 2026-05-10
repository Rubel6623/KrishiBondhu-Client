"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createAppointment = async (data: any) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      (revalidateTag as any)("appointments");
      revalidatePath("/dashboard/farmer/appointments");
      revalidatePath("/dashboard/veterinarian/appointments");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to book appointment",
    };
  }
};

export const getMyAppointments = async () => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/appointments/my-appointments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["appointments"] },
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch appointments",
    };
  }
};

export const updateAppointmentStatus = async (id: string, status: string) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/appointments/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const result = await res.json();
    if (result.success) {
      (revalidateTag as any)("appointments");
      revalidatePath("/dashboard/farmer/appointments");
      revalidatePath("/dashboard/veterinarian/appointments");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update appointment status",
    };
  }
};
