// app/page.tsx
import { Suspense } from "react";
import Hero from "@/components/Hero";
import AlertsSection from "@/components/AlertsSection";
import Footer from "@/components/Footer";

export default async function Home({
  searchParams,
  }: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
  }) {
  const sp = await searchParams;
  const raw = Number(sp?.page ?? 1);
  const page = Number.isFinite(raw) && raw > 0 ? raw : 1;

  return (
    <div className="w-full">
      {/* HERO (faixa azul) */}
      <section className="w-full bg-[linear-gradient(to_bottom,_theme(colors.blue.500)_0%,_theme(colors.blue.500)_60%,_theme(colors.gray.100)_100%)]">
        <div className="mx-auto max-w-7xl px-4">
          <Hero />
        </div>
      </section>

      {/* ALERTAS (logo abaixo do Hero) */}
      <section id="alerts" className="w-full bg-gray-100 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
          <Suspense fallback={<div className="py-8 text-center text-slate-500">Carregando alertas…</div>}>
            <AlertsSection page={page} searchParams={sp} />
          </Suspense>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
