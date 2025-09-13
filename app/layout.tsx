// app/layout.js
import "./globals.css";
import Header from "@/components/Header";

// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "FlyTripAlert",
    template: "%s • FlyTripAlert",
  },
  description: "Alertas de passagens aéreas",
  themeColor: "#ffffff",
  manifest: "/icons/site.webmanifest",
  icons: {
    // Favicon clássico + PNGs transparentes "wing-*"
    icon: [
      { url: "/icons/favicon.ico" },
      { url: "/icons/wing-16.png",  sizes: "16x16",  type: "image/png" },
      { url: "/icons/wing-32.png",  sizes: "32x32",  type: "image/png" },
      { url: "/icons/wing-64.png",  sizes: "64x64",  type: "image/png" },
      { url: "/icons/wing-128.png", sizes: "128x128", type: "image/png" },
      { url: "/icons/wing-256.png", sizes: "256x256", type: "image/png" },
      { url: "/icons/wing-512.png", sizes: "512x512", type: "image/png" }, // opcional
      { url: "/icons/wing-1024.png", sizes: "1024x1024", type: "image/png" } // opcional
    ],

    // iOS usa especificamente o Apple Touch
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],

    // Referências explícitas aos ícones Android (além do manifest)
    other: [
      { rel: "icon", url: "/icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { rel: "icon", url: "/icons/maskable-icon-512x512.png", sizes: "512x512", type: "image/png" }
    ],
  },
};



import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="min-h-screen antialiased">
        <Header />
          {children}
      </body>
    </html>
  );
}
