"use server";

export const getAllProviders = async (query?: Record<string, any>) => {
  const params = new URLSearchParams(query);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/providers?${params.toString()}`, {
      method: "GET",
      next: { tags: ["providers"] },
    });
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch providers",
    };
  }
};
