// components/Header.jsx
"use client";

import { usePathname } from "next/navigation";
import { useState, useId } from "react";
import Link from "next/link";
import Image from "next/image";
import { SiInstagram } from "react-icons/si";

// Bandeira da UE (simplificada), formato redondo
function FlagEU({ className = "h-5 w-5" }) {
  const uid = useId();
  const clipId = `${uid}-eu-clip`;
  // estrela de 5 pontas, pequena
  const STAR =
    "0,-3 0.59,-0.93 3,-0.93 1,0.35 1.85,2.7 0,1.4 -1.85,2.7 -1,0.35 -3,-0.93 -0.59,-0.93";

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <clipPath id={clipId}><circle cx="32" cy="32" r="32" /></clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`} shapeRendering="geometricPrecision">
        {/* fundo azul */}
        <rect width="64" height="64" fill="#003399" />
        {/* anel de 12 estrelas (sem trigonometria) */}
        {Array.from({ length: 12 }).map((_, i) => (
          <g
            key={i}
            transform={`translate(32 32) rotate(${i * 30}) translate(0 -18)`}
          >
            <polygon points={STAR} fill="#FFCC00" />
          </g>
        ))}
      </g>
    </svg>
  );
}

// Bandeira do Brasil (simplificada), formato redondo
function FlagBR({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <clipPath id="clipCircleBR"><circle cx="32" cy="32" r="32"/></clipPath>
      </defs>
      <g clipPath="url(#clipCircleBR)">
        {/* fundo verde */}
        <rect width="64" height="64" fill="#009b3a" />
        {/* losango amarelo */}
        <polygon
          points="32,8 56,32 32,56 8,32"
          fill="#ffdf00"
        />
        {/* círculo azul */}
        <circle cx="32" cy="32" r="12" fill="#002776" />
        {/* faixa branca (arco simples) */}
        <path
          d="M20 30c8-6 16-6 24 0"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

const NAV = [
  { id: "eu", href: "/eu", aria: "Switch to Europe region", Icon: FlagEU },
  { id: "br", href: "/br", aria: "Mudar para região Brasil", Icon: FlagBR },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = (href) => pathname?.startsWith(href);
  return (
    <header className="sticky top-0 z-50 bg-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="FlyTripAlert"
              width={150}
              height={150}
              priority
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          {NAV.map(({ id, href, aria, Icon }) => {
            const active = pathname?.startsWith(href);
            return (
              <Link
                key={id}
                href={href}
                aria-label={aria}
                className={`inline-flex items-center justify-center rounded-full p-[2px]
                  ring-1 transition hover:opacity-90
                  ${active ? "ring-white bg-white/10" : "ring-white/40 bg-white/0"}`}
              >
                <Icon className="h-6 w-6" />
                {/* acessibilidade */}
                <span className="sr-only">{id.toUpperCase()}</span>
              </Link>
            );
          })}
          <Link
            href="https://www.instagram.com/flytripalert/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex gap-2 items-center rounded-2xl px-3.5 py-2 text-sm font-medium shadow hover:shadow-md transition
                       bg-pink-600 text-white border-2 border-transparent hover:bg-pink-400"
          >
            <SiInstagram className="h-4 w-4" />
            Instagram
          </Link>
        </nav>

        {/* Mobile: flags + toggle */}
        <div className="md:hidden inline-flex items-center gap-2">
          {/* Flags sempre visíveis no topo */}
          <Link
            href="/eu"
            aria-label="Switch to Europe region"
            className={`inline-flex items-center justify-center rounded-full p-[2px] ring-1 transition
              ${active("/eu") ? "ring-white bg-white/10" : "ring-white/40 bg-white/0 hover:bg-white/10"}`}
          >
            <FlagEU className="h-6 w-6" />
            <span className="sr-only">EU</span>
          </Link>

          <Link
            href="/br"
            aria-label="Mudar para região Brasil"
            className={`inline-flex items-center justify-center rounded-full p-[2px] ring-1 transition
              ${active("/br") ? "ring-white bg-white/10" : "ring-white/40 bg-white/0 hover:bg-white/10"}`}
          >
            <FlagBR className="h-6 w-6" />
            <span className="sr-only">BR</span>
          </Link>

          {/* Toggle do menu */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-xl p-2 border"
          >
            <span className="sr-only">Toggle menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu (abre/fecha) */}
      <div
        className={`md:hidden border-t ${open ? "block" : "hidden"}`}
        role="dialog"
        aria-label="Mobile menu"
      >
        <div className="px-4 py-3 space-y-2">
          <Link
            href="https://www.instagram.com/flytripalert/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            onClick={() => setOpen(false)}
            className="inline-flex gap-2 items-center px-2 py-2 rounded bg-black text-white text-center border-2 border-transparent hover:bg-pink-600 transition w-full"
          >
            <SiInstagram className="h-4 w-4 mr-2" />
            Siga no Instagram
          </Link>
        </div>
      </div>
    </header>
  );
}
