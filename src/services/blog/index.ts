"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllBlogs = async (query?: Record<string, any>) => {
  const params = new URLSearchParams(query);
  try {
    const res = await fetch(`${BASE_URL}/blogs?${params.toString()}`, {
      method: "GET",
      next: { tags: ["blogs"] },
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch blogs",
    };
  }
};

export const getBlogById = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/blogs/${id}`, {
      method: "GET",
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch blog",
    };
  }
};

export const getBlogBySlug = async (slug: string) => {
  try {
    const res = await fetch(`${BASE_URL}/blogs/slug/${slug}`, {
      method: "GET",
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch blog by slug",
    };
  }
};

export const createBlog = async (data: any) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.success) {
      (revalidateTag as any)("blogs");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create blog",
    };
  }
};

export const updateBlog = async (id: string, data: any) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/blogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.success) {
      (revalidateTag as any)("blogs");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update blog",
    };
  }
};

export const deleteBlog = async (id: string) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${BASE_URL}/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    if (result.success) {
      (revalidateTag as any)("blogs");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to delete blog",
    };
  }
};
