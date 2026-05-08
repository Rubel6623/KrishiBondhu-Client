"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllUsers = async () => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
    // Note: The server route for this might be /users/:id or similar.
    // Adjusting to /users/:id based on common patterns since /admin/users doesn't exist in server.
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}`, {
      method: "PATCH", // Changed from PUT to PATCH as per server's common update pattern
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const result = await res.json();
    if (result.success) {
      (revalidateTag as any)("users");
    }
    return result;
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (result.success) {
      (revalidateTag as any)("users");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong while deleting user",
    };
  }
};
