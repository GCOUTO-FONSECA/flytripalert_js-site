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
  rating: "bom negócio" | "excelente" | "imperdível"; 
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
    searchParams?: { [key: string]: string | undefined };
    }) {
    // ler filtros do URL
    const origem = searchParams?.origem;
    const periodo = searchParams?.periodo;
    const classe = searchParams?.classe;
    const avaliacao = searchParams?.avaliacao;

    // aplicar filtros
    let filteredAlerts: Alert[] = alertList;

    if (origem && origem !== "all") {
        console.log("origem: " + origem);
        filteredAlerts = filteredAlerts.filter((alert) => toSlug(alert.from) === toSlug(origem));
    }
    if (periodo && periodo !== "all") {
        console.log("periodo: " + periodo);
        filteredAlerts = filteredAlerts.filter((alert) => toSlug(alert.found_at) === toSlug(periodo));
    }
    if (classe && classe !== "all") {
        console.log("classe: " + classe);
        filteredAlerts = filteredAlerts.filter((alert) => toSlug(alert.class) === toSlug(classe));
    }
    if (avaliacao && avaliacao !== "all") {
        console.log("avaliacao: " + avaliacao);
        filteredAlerts = filteredAlerts.filter((alert) => toSlug(alert.rating) === toSlug(avaliacao));
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
    <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {alertsVisible.map((a, i) => (
        <AlertCard key={start + i} {...a} />
        ))}
    </div>

    {/* paginação */}
    <Pagination
        totalItems={total}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
        searchParams={searchParams}
    />
    </div>
  );
}