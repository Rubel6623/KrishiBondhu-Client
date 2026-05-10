"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

interface CustomJwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
  exp?: number;
  iat?: number;
}

import * as Sentry from "@sentry/nextjs";

export const registerUser = async (userData: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return await res.json();
  } catch (error: any) {
    Sentry.captureException(error, {
      extra: { userData: { ...userData, password: "[REDACTED]" } },
    });
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
};

export const loginUser = async (userData: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result.success) {
      const storeCookie = await cookies();
      storeCookie.set("token", result?.data?.token);
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
};

export const socialLogin = async (userData: { email: string; name: string; avatar?: string }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/social-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result.success) {
      const storeCookie = await cookies();
      storeCookie.set("token", result?.data?.token);
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
};

export const getUser = async () => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  if (token) {
    try {
      const decodedData = jwtDecode<CustomJwtPayload>(token);

      // Check if token has expired
      if (decodedData.exp && decodedData.exp < Date.now() / 1000) {
        return null;
      }

      return decodedData;
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
};

export const getMe = async () => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
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

export const updateProfile = async (data: any) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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

export const UserLogOut = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
};

export const getAccessToken = async () => {
  const storeCookie = await cookies();
  return storeCookie.get("token")?.value;
};