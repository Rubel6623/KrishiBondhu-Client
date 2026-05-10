"use server";

import { getAccessToken } from "../auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchAiAnalytics = async () => {
  const token = await getAccessToken();
  try {
    const res = await fetch(`${BASE_URL}/ai/analytics`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching AI analytics:", error);
    throw error;
  }
};

export const runAiDataAnalysis = async (prompt: string) => {
  const token = await getAccessToken();
  try {
    const res = await fetch(`${BASE_URL}/ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        prompt,
        featureType: "DATA_ANALYZER",
      }),
    });
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("Error running AI analysis:", error);
    throw error;
  }
};

export const getSmartRecommendations = async () => {
  const token = await getAccessToken();
  try {
    const res = await fetch(`${BASE_URL}/ai/recommendations`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
