// app/layout.js
import "./globals.css";
import Header from "@/components/Header";

export const metadata = { title: "FlyTripAlert" };

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
