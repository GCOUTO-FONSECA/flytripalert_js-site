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
  // Obtém os parâmetros de busca da URL (por exemplo, ?page=2)
  const sp = await searchParams;
  // Tenta pegar o número da página, se não existir usa 1
  const raw = Number(sp?.page ?? 1);
  // Garante que o número da página seja válido (maior que zero)
  const page = Number.isFinite(raw) && raw > 0 ? raw : 1;

  return (
    <div className="w-full">
      {/* HERO (faixa azul) */}
      <section className="w-full bg-[linear-gradient(to_bottom,_theme(colors.blue.500)_0%,_theme(colors.blue.500)_70%,_theme(colors.gray.100)_100%)]">
        <div className="mx-auto max-w-7xl px-4">
          <Hero />
        </div>
      </section>

      {/* ALERTAS (logo abaixo do Hero) */}
      <section id="alerts" className="w-full bg-gray-100 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 pt-1 sm:pt-1 pb-8 sm:pb-12">
          {/* Suspense mostra "Carregando alertas…" enquanto os alertas não carregam */}
          <Suspense fallback={<div className="py-8 text-center text-slate-500">Carregando alertas…</div>}>
            {/* Mostra os alertas, passando a página e os parâmetros de busca */}
            <AlertsSection page={page} searchParams={sp} />
          </Suspense>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
