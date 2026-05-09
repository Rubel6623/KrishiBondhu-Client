"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllCategories = async () => {
  try {
    const res = await fetch(`${BASE_URL}/categories`, {
      method: "GET",
      next: { tags: ["categories"] },
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch categories",
    };
  }
};

export const createCategory = async (data: any) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      (revalidateTag as any)("categories");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create category",
    };
  }
};

export const updateCategory = async (id: string, data: any) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      (revalidateTag as any)("categories");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update category",
    };
  }
};

export const deleteCategory = async (id: string) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (result.success) {
      (revalidateTag as any)("categories");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to delete category",
    };
  }
};
