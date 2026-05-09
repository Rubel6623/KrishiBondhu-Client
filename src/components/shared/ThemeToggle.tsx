"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: 36, height: 36 }} />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "1.5px solid rgba(45,138,82,0.25)",
        background: isDark ? "rgba(74,184,112,0.15)" : "rgba(45,138,82,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontSize: "16px",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = isDark
          ? "rgba(74,184,112,0.3)"
          : "rgba(45,138,82,0.15)";
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = isDark
          ? "rgba(74,184,112,0.15)"
          : "rgba(45,138,82,0.08)";
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
      }}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
