// components/Header.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/deals", label: "Deals" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="FlyTripAlert"
              width={28}
              height={28}
              priority
            />
            <span className="font-semibold text-lg tracking-tight">
              FlyTripAlert
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm hover:opacity-80"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/signup"
            className="rounded-2xl px-3.5 py-2 text-sm font-medium shadow hover:shadow-md transition
                       bg-black text-white"
          >
            Get alerts
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-xl p-2 border"
        >
          <span className="sr-only">Toggle menu</span>
          {/* ícone simples */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* Mobile menu (abre/fecha) */}
      <div
        className={`md:hidden border-t ${open ? "block" : "hidden"}`}
        role="dialog"
        aria-label="Mobile menu"
      >
        <div className="px-4 py-3 space-y-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-2 py-2 rounded hover:bg-black/5"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/signup"
            onClick={() => setOpen(false)}
            className="block px-2 py-2 rounded bg-black text-white text-center"
          >
            Get alerts
          </Link>
        </div>
      </div>
    </header>
  );
}
