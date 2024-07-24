"use client";
import type {} from "ldrs";
import { grid } from "ldrs";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

// grid.register();
export default function Loading() {
  const { theme } = useTheme();
  const [loadingColor, setLoadingColor] = useState<"black" | "white">();

  useEffect(() => {
    if (theme === "white") {
      setLoadingColor("black");
    }
    if (theme === "dark" || theme === "system") setLoadingColor("white");
  }, [theme]);

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <l-grid size="500" speed="1.5" color={loadingColor} />
    </main>
  );
}
