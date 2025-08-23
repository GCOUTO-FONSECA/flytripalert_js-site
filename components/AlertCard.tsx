import Link from "next/link";

type Props = {
    from: string;
    to: string;
    price: number;
    depart: string;
    return: string;
    days: number;
    rating: string;
    found_at: string;
    link: string;
}

const ratingColor: Record<Props["rating"], string> = {
    "bom negócio": "bg-green-500 text-green-800",
    "excelente": "bg-blue-500 text-blue-800",
    "imperdível": "bg-purple-600 text-purple-800",
};

export default function AlertCard(p: Props) {
  return (
    <article className="rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 flex items-center gap-4 bg-white">
      <div className={`h-3 w-3 rounded-full ${ratingColor[p.rating]}`} aria-label={p.rating} />
      <div className="flex-1">
        <h3 className="text-base sm:text-lg font-semibold leading-tight">
          {/* DESKTOP (sm+): from → to */}
          <span className="hidden sm:inline">
            <span>{p.from}</span>
            <span className="mx-1" aria-hidden>→</span>
            <span>{p.to}</span>
          </span>
        </h3>

      {/* CONFIGURE CARD FOR MOBILE */}
      <div className="sm:hidden grid grid-cols-[max-content_1fr] gap-x-2 gap-y-0.5 items-baseline">
        {/* origem (linha inteira) */}
        <h3 className="col-span-2 text-base font-semibold leading-tight">{p.from}</h3>

        {/* para: (same line, grey, lower)) */}
        <span className="text-xs text-slate-500 font-normal">para:</span>
        <h3 className="text-base font-semibold leading-tight">{p.to}</h3>

        {/* Ida / Volta in the same grid*/}
        <span className="text-xs text-slate-500 font-normal">Ida:</span>
        <span className="text-sm text-slate-600">{p.depart}</span>

        <span className="text-xs text-slate-500 font-normal">Volta:</span>
        <span className="text-sm text-slate-600">{p.return}</span>
      </div>
      {/* Score */}
      <span className={`sm:hidden inline-flex w-fit px-2 py-0.5 mt-2 rounded-full text-white font-medium ${ratingColor[p.rating]}`}>
        {p.rating}
      </span>

      {/* CONFIGURE CARD FOR DESKTOP (sm+) */}
      <p className="hidden sm:block text-sm text-slate-600 mt-1
                    [&>span]:inline sm:[&>span]:whitespace-nowrap
                      sm:[&>span:not(:last-child)]:after:content-['•']
                      sm:[&>span:not(:last-child)]:after:mx-1">
          <span>Ida: {p.depart}</span>
          <span>Volta: {p.return}</span>
          <span className={`px-2 py-0.5 rounded-full text-white font-medium ${ratingColor[p.rating]} inline-flex w-fit`}>
            {p.rating}
          </span>
        </p>
      </div>
    <div className="self-center flex flex-col items-center justify-center text-center">
    <div className="text-xl sm:text-2xl font-bold leading-tight">
        R$ {p.price}
        <p className="text-slate-600 font-light text-[0.5rem] sm:text-xs md:text-sm lg:text-[0.7rem]">Preço em {p.found_at}</p>
    </div>

    <Link
        href={`https://${p.link}`}
        className="mt-2 inline-flex items-center justify-center gap-1
                bg-gradient-to-r from-blue-600 to-blue-500
                px-3 py-1.5 text-sm font-semibold text-white shadow-sm
                transition hover:from-blue-600 hover:to-indigo-500 hover:shadow-md
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
                active:translate-y-px"
        aria-label="Abrir este achado em flytripalert.com"
    >
        Abrir oferta
        <span aria-hidden="true">→</span>
    </Link>
    </div>
    </article>
  );
}