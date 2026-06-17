"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface CarViewer3DProps {
  src: string;
  alt: string;
  className?: string;
  autoRotate?: boolean;
}

export function CarViewer3D({ src, alt, className, autoRotate = true }: CarViewer3DProps) {
  const t = useTranslations("catalog");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import("@google/model-viewer").then(() => setReady(true));
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-b from-white via-[#f8fbff] to-[#eef6ff]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(0,112,224,0.08),transparent_60%)]" />

      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-[#0070e0]" />
        </div>
      )}

      {ready && (
        <model-viewer
          src={src}
          alt={alt}
          camera-controls
          touch-action="pan-y"
          shadow-intensity="0.8"
          shadow-softness="0.6"
          environment-image="neutral"
          exposure="1.2"
          camera-orbit="35deg 72deg 6m"
          auto-rotate={autoRotate ? "" : undefined}
          auto-rotate-delay="2000"
          rotation-per-second="12deg"
          interaction-prompt="none"
          loading="eager"
          className="h-full w-full"
          style={{ width: "100%", height: "100%", minHeight: "inherit" }}
        />
      )}

      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-1.5 text-[11px] font-medium tracking-wide text-slate-500 shadow-sm">
        {t("rotateHint")}
      </div>
    </div>
  );
}
