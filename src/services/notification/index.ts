"use client";

export interface INotification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export async function fetchNotifications(): Promise<INotification[]> {
  try {
    const token = document.cookie
      .split("; ")
      .find((r) => r.startsWith("token="))
      ?.split("=")[1];
    if (!token) return [];

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/notifications`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("Fetch notifications error:", err);
    return [];
  }
}

export async function markAllRead(): Promise<{ success: boolean }> {
  try {
    const token = document.cookie
      .split("; ")
      .find((r) => r.startsWith("token="))
      ?.split("=")[1];
    if (!token) return { success: false };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notifications/mark-all-read`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err) {
    console.error("Mark all read error:", err);
    return { success: false };
  }
}

export async function markAsRead(id: string): Promise<{ success: boolean }> {
  try {
    const token = document.cookie
      .split("; ")
      .find((r) => r.startsWith("token="))
      ?.split("=")[1];
    if (!token) return { success: false };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notifications/${id}/read`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (err) {
    console.error("Mark as read error:", err);
    return { success: false };
  }
}
