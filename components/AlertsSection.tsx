import AlertCard from "./AlertCard";
import Pagination from "./Pagination";
import deals from "@/data/deals.json";

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
    searchParams?: { [key: string]: string | string[] | undefined };
    }) {
    const total = alertList.length;
    
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const currentPage = Math.min(Math.max(page, 1), totalPages);

    const start = (currentPage - 1) * PAGE_SIZE;
    const alertsVisible = alertList.slice(start, start + PAGE_SIZE);

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