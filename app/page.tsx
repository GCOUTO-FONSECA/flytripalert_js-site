// app/page.tsx
import Hero from "@/components/Hero";
import AlertsSection from "@/components/AlertsSection";
import Footer from "@/components/Footer";

export default function Home({
  searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined };
  }) {
  const raw = Number(searchParams?.page ?? 1);
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
      <section id="alerts" className="w-full bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
          <AlertsSection page={page} searchParams={searchParams} />
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
