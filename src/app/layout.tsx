import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sky AutoRent",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
