"use client";
import type {} from "ldrs";
import { grid } from "ldrs";

// grid.register();
export default function Loading() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <l-grid size="500" speed="1.5" color="black"></l-grid>
    </main>
  );
}
