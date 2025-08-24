// components/Pagination.tsx
import Link from "next/link";

type Props = {
  totalItems: number;
  currentPage: number;
  pageSize?: number;     // default: 20
  siblingCount?: number; // quantos números ao redor da página atual
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function Pagination({
  totalItems,
  currentPage,
  pageSize = 20,
  siblingCount = 1,
  searchParams = {},
}: Props) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  if (totalPages <= 1) return null;

  // Constrói o href preservando outros filtros da URL
  const makeHref = (page: number) => {
    const params = new URLSearchParams();

    for (const [k, v] of Object.entries(searchParams)) {
      if (k === "page") continue; // vamos sobrescrever
      if (Array.isArray(v)) v.forEach((vv) => params.append(k, vv));
      else if (typeof v === "string") params.set(k, v);
    }

    if (page >= 1) params.set("page", String(page)); // na página 1 omitimos
    const qs = params.toString();
    return qs ? `?${qs}#alerts` : `#alerts`;
  };

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

  // lista de páginas: 1 … (left..right) … last
  const first = 1;
  const last = totalPages;
  const left = clamp(currentPage - siblingCount, first, last);
  const right = clamp(currentPage + siblingCount, first, last);

  const items: (number | "...")[] = [];
  items.push(first);
  if (left > first + 1) items.push("...");
  for (let p = left; p <= right; p++) {
    if (p !== first && p !== last) items.push(p);
  }
  if (right < last - 1) items.push("...");
  if (last !== first) items.push(last);

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav className="mt-6 flex items-center justify-center gap-1 text-sm" aria-label="Paginação">
      <Link
        href={makeHref(clamp(currentPage - 1, 1, totalPages))}
        aria-disabled={isFirst}
        className={`px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-50 ${isFirst ? "opacity-40 pointer-events-none" : ""}`}
      >
        Anterior
      </Link>

      <ul className="flex items-center gap-1">
        {items.map((it, idx) =>
          it === "..." ? (
            <li key={`dots-${idx}`} className="px-2 text-slate-400 select-none">…</li>
          ) : (
            <li key={it}>
              <Link
                href={makeHref(it)}
                aria-current={it === currentPage ? "page" : undefined}
                className={`min-w-8 px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-50 hover:text-black text-center ${
                  it === currentPage ? "bg-blue-600 text-white border-blue-600" : ""
                }`}
              >
                {it}
              </Link>
            </li>
          )
        )}
      </ul>

      <Link
        href={makeHref(clamp(currentPage + 1, 1, totalPages))}
        aria-disabled={isLast}
        className={`px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-50 hover:text-black ${isLast ? "opacity-40 pointer-events-none" : ""}`}
      >
        Próximo
      </Link>
    </nav>
  );
}
