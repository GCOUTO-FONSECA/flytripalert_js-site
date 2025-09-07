import Link from "next/link";

type Props = {
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
};

const ratingColor = (found_at: string): string => {
  const diffdays: number = elapsedDays(found_at);
  if (diffdays < 1) return "bg-green-500 text-white"; // verde se até 1 dia
  if (diffdays >= 1 && diffdays < 3) return "bg-orange-400 text-white"; // laranja se até 3 dias
  if (diffdays >= 3 && diffdays < 7) return "bg-yellow-400 text-gray-800"; // amarelo se até 7 dias
  if (diffdays >= 7) return "bg-gray-300 text-gray-800"; // cinza se mais de 7 dias
  else return "bg-gray-300 text-gray-800"; // padrão cinza
};

const elapsedDays = (alertFoundAt: string): number => {
  const foundAtDate = new Date(alertFoundAt);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - foundAtDate.getTime());
  return Math.trunc(diffTime / (1000 * 60 * 60 * 24));
};

const openLinkColor = (found_at: string): string => {
  const color = ratingColor(found_at);
  return color.split("-")[1];
};

const gradientByColor: Record<string, string> = {
  blue: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-500",
  yellow: "bg-gradient-to-r from-yellow-400 to-yellow-400 hover:from-yellow-500 hover:to-yellow-300",
  orange: "bg-gradient-to-r from-orange-400 to-orange-400 hover:from-orange-500 hover:to-orange-300",
  green:"bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-500",
  gray: "bg-gradient-to-r from-gray-400 to-gray-400 hover:from-gray-500 hover:to-gray-300",
};

function translateDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function AlertCard(p: Props) {
  const elapsedTime = elapsedDays(p.found_at);
  const color = ratingColor(p.found_at);
  const buttonColor = openLinkColor(p.found_at);
  const gradient = gradientByColor[buttonColor] ?? gradientByColor.blue;
  return (
    <article className="rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 flex items-center gap-4 bg-white">
      <div className={`h-3 w-3 rounded-full ${ratingColor(p.found_at)}`} aria-label={p.found_at} />
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
      <span className={`sm:hidden inline-flex w-fit px-2 py-0.5 mt-2 rounded-full text-white font-medium ${color}`}>
        {elapsedTime >= 1 ? elapsedTime === 1 ? "Há 1 dia" : "Há " + elapsedTime.toString() + " dias" : "Hoje"}
      </span>

      {/* CONFIGURE CARD FOR DESKTOP (sm+) */}
      <p className="hidden sm:block text-sm text-slate-600 mt-1
                    [&>span]:inline sm:[&>span]:whitespace-nowrap
                      sm:[&>span:not(:last-child)]:after:content-['•']
                      sm:[&>span:not(:last-child)]:after:mx-1">
          <span>Ida: {p.depart}</span>
          <span>Volta: {p.return}</span>
          <span className={`px-2 py-0.5 rounded-full text-white font-medium ${color} inline-flex w-fit`}>
            {elapsedTime >= 1 ? elapsedTime === 1 ? "Há 1 dia" : "Há " + elapsedTime.toString() + " dias" : "Hoje"}
          </span>
        </p>
      </div>
    <div className="self-center flex flex-col items-center justify-center text-center">
    <div className="text-xl sm:text-2xl font-bold leading-tight">
        {p.currency} {p.price}
        <p className="text-slate-600 font-light text-[0.5rem] sm:text-xs md:text-sm lg:text-[0.7rem]">Preço em {translateDate(p.found_at)}</p>
    </div>

    <Link
      href={`${p.link}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`mt-2 inline-flex items-center justify-center gap-1
      ${gradient}
      px-3 py-1.5 text-sm font-semibold text-white shadow-sm
      transition hover:shadow-md
      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
      active:translate-y-px`}
      aria-label="Abrir este achado"
    >
      Google Flights
      <span aria-hidden="true">→</span>
    </Link>
    </div>
    </article>
  );
}