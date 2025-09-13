// app/layout.js
import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "FlyTripAlert",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-circle-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-circle-16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
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
