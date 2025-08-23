"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  totalItems: number;
  currentPage: number;
  pageSize?: number;     // default: 20
  siblingCount?: number; // how many numbers around current page
};

export default function Pagination({
  totalItems,
  currentPage,
  pageSize = 20,
  siblingCount = 1,
}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  if (totalPages <= 1) return null;

  // keep other query params
  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams as any);
    if (page <= 1) params.delete("page");
    else params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

  // Build page list: 1 … (left..right) … last
  const pages: (number | "...")[] = [];
  const first = 1;
  const last = totalPages;
  const left = clamp(currentPage - siblingCount, first, last);
  const right = clamp(currentPage + siblingCount, first, last);

  pages.push(first);
  if (left > first + 1) pages.push("...");
  for (let p = left; p <= right; p++) {
    if (p !== first && p !== last) pages.push(p);
  }
  if (right < last - 1) pages.push("...");
  if (last !== first) pages.push(last);

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav className="mt-6 flex items-center justify-center gap-1 text-sm" aria-label="Paginação">
      {/* Prev */}
      <Link
        href={createPageURL(clamp(currentPage - 1, 1, totalPages))}
        aria-disabled={isFirst}
        className={`px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-50 ${
          isFirst ? "opacity-40 pointer-events-none" : ""
        }`}
      >
        Anterior
      </Link>

      {/* Numbers */}
      <ul className="flex items-center gap-1">
        {pages.map((p, i) =>
          p === "..." ? (
            <li key={`dots-${i}`} className="px-2 text-slate-400 select-none">…</li>
          ) : (
            <li key={p}>
              <Link
                href={createPageURL(p)}
                aria-current={p === currentPage ? "page" : undefined}
                className={`min-w-8 px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-50 text-center ${
                  p === currentPage ? "bg-blue-600 text-white border-blue-600" : ""
                }`}
              >
                {p}
              </Link>
            </li>
          )
        )}
      </ul>

      {/* Next */}
      <Link
        href={createPageURL(clamp(currentPage + 1, 1, totalPages))}
        aria-disabled={isLast}
        className={`px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-50 ${
          isLast ? "opacity-40 pointer-events-none" : ""
        }`}
      >
        Próximo
      </Link>
    </nav>
  );
}
