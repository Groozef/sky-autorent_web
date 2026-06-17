"use client";

import { useEffect } from "react";
import { publicEnv } from "@/core/config/env";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    if (publicEnv.enableDarkTheme) {
      root.dataset.theme = "auto";
    } else {
      root.dataset.theme = "light";
    }
  }, []);

  return children;
}
