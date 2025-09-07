import AlertCard from "./AlertCard";
import Pagination from "./Pagination";
import deals from "@/data/deals.json";
import toSlug from "@/lib/menu-from-deals";

type Alert = {
  id: string; 
  from: string; 
  to: string; 
  price: number; 
  currency: string; 
  depart: string; 
  return: string;
  days: number; 
  found_at: string; 
  link: string;
  class: string;
};

// definir tamanho das paginas
const PAGE_SIZE = 10;
// ler alertas em data/deals.json
const alertList: Alert[] = deals as Alert[];

export default function AlertsSection({
    page,
    searchParams,
    }: {
    page: number;
    searchParams?: { [key: string]: string | string[] |undefined };
    }) {
    // ler filtros do URL
    const origemRaw = searchParams?.origem;
    const periodo = searchParams?.periodo;
    const classeRaw = searchParams?.classe;
    const precoMax = searchParams?.precoMax;

    // Garantir que origem e classe sejam sempre string
    const origem = Array.isArray(origemRaw) ? origemRaw[0] : origemRaw;
    const classe = Array.isArray(classeRaw) ? classeRaw[0] : classeRaw;

    // aplicar filtros
    let filteredAlerts: Alert[] = alertList;

    if (origem && origem !== "all") {
        filteredAlerts = filteredAlerts.filter((alert) => toSlug(alert.from) === toSlug(origem));
    }
    if (periodo && periodo !== "all") {
        const currentDate = new Date();
        filteredAlerts = filteredAlerts.filter((alert) => {
            const alertDate = new Date(alert.found_at);
            switch (periodo) {
                case "24h":
                    return alertDate >= new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
                case "3d":
                    return alertDate >= new Date(currentDate.getTime() - 3 * 24 * 60 * 60 * 1000);
                case "7d":
                    return alertDate >= new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
                default:
                    return true;
            }
        });
    }
    if (classe && classe !== "all") {
        filteredAlerts = filteredAlerts.filter((alert) => toSlug(alert.class) === toSlug(classe));
    }
    if (precoMax) {
        filteredAlerts = filteredAlerts.filter((alert) => alert.price <= Number(precoMax));
    }

    const total = filteredAlerts.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const currentPage = Math.min(Math.max(page, 1), totalPages);

    const start = (currentPage - 1) * PAGE_SIZE;
    const alertsVisible = filteredAlerts.slice(start, start + PAGE_SIZE);

    return (
    <div>
    {/* paginação */}
    <div className="mb-6">
        <Pagination
            totalItems={total}
            currentPage={currentPage}
            pageSize={PAGE_SIZE}
            searchParams={searchParams}
        />
    </div>
    {/* lista de cards */}
    <div>
      {total === 0 ? (
        <div className="py-8 text-center text-slate-500">
          Nenhum alerta encontrado para os filtros selecionados.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {alertsVisible.map((a, i) => (
            <AlertCard key={start + i} {...a} />
          ))}
        </div>
      )}
      {/* paginação */}
      <Pagination
        totalItems={total}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
        searchParams={searchParams}
      />
    </div>
    </div>
  );
}