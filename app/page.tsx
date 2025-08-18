"use client";

import Hero from "@/components/Hero";

export default function Home() {
  return(
    <div className="flex w-full">
      {/* blue Rectangle below */}
      <main className="flex-1 bg-white flex flex-col items-center justify-center">
        <div className="w-full bg-blue-500 shadow-lg"></div>

        {/* page body */}
        <section className="w-full h-500 bg-white">
          <main>
            <Hero />
          </main>
          {/* Aqui você coloca o próximo conteúdo */}
        </section>
      </main>
    </div>
  );
}