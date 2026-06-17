import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ModelViewerProps = HTMLAttributes<HTMLElement> & {
  src?: string;
  alt?: string;
  poster?: string;
  loading?: "auto" | "lazy" | "eager";
  reveal?: "auto" | "manual";
  "camera-controls"?: boolean | "";
  "touch-action"?: string;
  "shadow-intensity"?: string;
  "shadow-softness"?: string;
  "environment-image"?: string;
  exposure?: string;
  "camera-orbit"?: string;
  "auto-rotate"?: boolean | "";
  "auto-rotate-delay"?: string;
  "rotation-per-second"?: string;
  "interaction-prompt"?: "auto" | "when-focused" | "none";
  ar?: boolean | "";
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": DetailedHTMLProps<ModelViewerProps, HTMLElement>;
    }
  }
}

export {};
