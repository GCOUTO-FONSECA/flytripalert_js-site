// app/page.tsx
"use client";
import Hero from "@/components/Hero";
import AlertsSection from "@/components/AlertsSection";

export default function Home() {
  return (
    <div className="w-full">
      {/* HERO (faixa azul) */}
      <section className="w-full bg-[linear-gradient(to_bottom,_theme(colors.blue.500)_0%,_theme(colors.blue.500)_60%,_theme(colors.gray.100)_100%)]">
        <div className="mx-auto max-w-7xl px-4">
          <Hero />
        </div>
      </section>

      {/* ALERTAS (logo abaixo do Hero) */}
      <section id="alerts" className="w-full bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
          <AlertsSection />
        </div>
      </section>
    </div>
  );
}
