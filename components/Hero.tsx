"use client";
import { useRouter, useSearchParams } from "next/navigation";
import SelectField from "./SelectField";
import RangeField from "./RangeField";
import { useEffect, useMemo, useState } from "react";
import deals from './../data/deals.json';
import { buildMenusFromDeals } from './../lib/menu-from-deals';

// MENUS: definição dos menus de filtro disponíveis, fora do componente para estabilidade
const MENUS = buildMenusFromDeals(deals as any);

/** Função pura: monta filtros a partir da string da URL */
function buildFiltersFromParams(qs: string) {
  const sp = new URLSearchParams(qs);
  const next: Record<string, string> = {};
  MENUS.forEach((m) => {
    next[m.id] = sp.get(m.id) ?? (String(m.defaultValue) ?? "");
  });
  return next;
}

// Componente principal Hero
export default function Hero() {
  // Hook do Next.js para navegação programática
  const router = useRouter();
  // Hook para acessar os parâmetros da URL
  const searchParams = useSearchParams();
  // String dos parâmetros da URL (estável)
  const spString = searchParams.toString();
  // Menus de filtro (mantidos estáveis com useMemo)
  const menus = useMemo(() => MENUS, []);

  // Estado para controlar se o painel de filtros está aberto
  const [showFilters, setShowFilters] = useState(() => true);

  // Estado local dos filtros, inicializado a partir da URL
  const [filters, setFilters] = useState<Record<string, string>>(
    () => buildFiltersFromParams(spString)
  );

  // Definição dos limites de preço
  const precoLimits = filters["precoRange"].split(",");
  const [currency, precoMinimo, precoMaximo] = ["R$", Number(precoLimits[0]), Number(precoLimits[1])];
  // Estado do preço máximo selecionado
  const [precoMax, setPrecoMax] = useState(precoMaximo);

  // Atualiza os filtros sempre que o painel é aberto e a URL muda
  useEffect(() => {
    if (!showFilters) return;
    setFilters(buildFiltersFromParams(spString));
  }, [showFilters, spString]);

  // Aplica os filtros selecionados, atualizando a URL
  function applyFilters() {
    const sp = new URLSearchParams(spString);
    // Mantém a página 1 ao aplicar novos filtros
    sp.set("page", "1");

    // Atualiza cada filtro nos parâmetros da URL
    menus.forEach((m) => {
      const value = filters[m.id];
      if (!value || value === "all") sp.delete(m.id); // Remove se for default
      else sp.set(m.id, value); // Seta se diferente do default
    });

    // Inclui preço máximo apenas se diferente do padrão
    if (precoMax !== precoMaximo) sp.set("precoMax", String(precoMax));
    else sp.delete("precoMax");

    // Atualiza a URL sem recarregar a página
    const qs = sp.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
    setShowFilters(false); // Fecha o painel de filtros
  }

  // open or close filters
  function toggleFilters() {
    const params = new URLSearchParams();
    const qs = params.toString();
    setShowFilters((prev) => !prev);
    console.log(qs);
    // apenas em desktop, usar scroll: false. em mobile usar scroll true
    if (window.innerWidth >= 640) {
      router.replace(qs ? `?${qs}#form` : `#form`, { scroll: false });
    } else {
      router.replace(qs ? `?${qs}#form` : `#form`);
    }
  }

  // Reseta todos os filtros para o padrão
  function resetFilters() {
    router.replace("?", { scroll: false }); // Limpa a URL
    setFilters(buildFiltersFromParams("")); // Volta aos valores default
    setPrecoMax(precoMaximo); // Reseta preço máximo
  }

  // Renderização do componente
  return (
    <section className="relative isolate w-full text-white">
      <div className="mx-auto max-w-7xl pt-12 pb-0 sm:pt-16 sm:pb-0 text-center">
        {/* Headline principal */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          Escolha o seu alerta favorito
        </h1>

        {/* Subheadline explicativa */}
        <p className="mt-4 text-base sm:text-lg opacity-90 font-bold">
          A Fly rastreia milhares de voos diariamente enquanto você descansa
        </p>
        <p style={{ backgroundColor: 'rgb(59, 130, 246)' }} className="relative z-10 mt-4 text-base sm:text-lg font-bold
        border border-slate-200 p-4 max-w-2xl text-center mx-auto rounded-2xl
        text-white shadow-md">
          ATENÇÃO! <br />
          Os preços mostrados podem mudar rapidamente<br />
        </p>

        <section id="form" className="relative w-full text-white">
          <div className="mx-auto max-w-7xl px-4 pt-8 sm:pt-12 pb-5 text-center">
            {/* Botão para abrir/fechar painel de filtros */}
            <button
              onClick={toggleFilters}
              className="rounded-2xl px-6 py-3 font-semibold text-white 
                bg-gradient-to-r from-blue-700 via-blue-700 to-blue-700
                shadow-lg hover:shadow-xl 
                hover:from-blue-600 hover:via-blue-600 hover:to-blue-600
                transition-all duration-300"
            >
              {showFilters ? "Fechar filtros" : "Filtrar alertas"}
            </button>

            {/* Painel de filtros (formulário) */}
            {showFilters && (
              <form
                className="mt-8 w-full max-w-2xl mx-auto bg-white border border-blue-600 rounded-2xl shadow p-4 sm:p-6 text-gray-800"
                onSubmit={(e) => e.preventDefault()} // Evita submit padrão
              >
                {/* Campos de seleção dos filtros */}
                <div className="items-center justify-center grid grid-cols-1 sm:flex lg:grid-cols-4 gap-4">
                  {menus.map((m) => {
                    if (m.id === "precoRange") return null; // Pula o filtro de faixa de preço
                    return (
                      <SelectField
                        key={m.id}
                        id={m.id}
                        label={m.label}
                        options={m.options}
                      // Campo controlado: value e onChange
                      value={filters[m.id]}
                        onChange={(v) => setFilters((f) => ({ ...f, [m.id]: v }))}
                      />
                    );
                  })}
                </div>

                {/* Campo de seleção do preço máximo */}
                <div className="mt-6 items-center justify-center mx-auto">
                  <RangeField
                    id="precoMax"
                    label="Preço máx."
                    min={precoMinimo}
                    max={precoMaximo}
                    step={10}
                    value={precoMax}
                    onChange={setPrecoMax}
                    prefix={currency + " "}
                  />
                </div>

                {/* Botões de aplicar e limpar filtros */}
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    type="button" // Reseta manualmente
                    onClick={resetFilters}
                    className="rounded-2xl px-5 py-2 font-medium border hover:bg-gray-100 transition"
                  >
                    Limpar
                  </button>
                  <button
                    type="button" // Evita submit implícito
                    onClick={applyFilters}
                    className="rounded-2xl px-5 py-2 font-medium bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    Aplicar filtros
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
