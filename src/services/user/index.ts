"use server";

import { cookies } from "next/headers";

export const getAllUsers = async () => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      next: { tags: ["users"] },
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch users",
    };
  }
};

export const updateUserStatus = async (id: string, status: "ACTIVE" | "BANNED") => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong while updating user status",
    };
  }
};

export const deleteUser = async (id: string) => {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      return await res.json();
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Something went wrong while deleting user",
      };
    }
  };
