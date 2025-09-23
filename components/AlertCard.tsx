"use client";
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
  if (diffdays <= 1) return "bg-green-500 text-white"; // verde se até 1 dia
  if (diffdays > 1 && diffdays < 3) return "bg-orange-400 text-white"; // laranja se até 3 dias
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

function translateDate(dateStr: string, region: "br" | "eu"): string {
  const date = new Date(dateStr);
  const translateTo = region === "br" ? 'pt-BR' : 'en-GB';
  let newDate = date.toLocaleDateString(translateTo, { day: '2-digit', month: 'short', year: 'numeric' }).replace(".", "").replace(" de ", " ");
  // Capitalize first letter of month
  newDate = newDate.replace(/(\d{2}) (\w)(\w+)/, (match, d, m1, mRest) => `${d} ${m1.toUpperCase()}${mRest}`);
  return newDate;
}

export default function AlertCard(p: Props & { region: "br" | "eu" }) {
  const { region } = p;
  const LOCALE_BY_REGION = { br: "pt-BR", eu: "en" } as const;

  function rtAgo(n: number, unit: Intl.RelativeTimeFormatUnit, region: "br"|"eu") {
    const rtf = new Intl.RelativeTimeFormat(LOCALE_BY_REGION[region], { numeric: "always" });
    if (n === 0) {
      return region === "br" ? "hoje" : "today";
    } else {
      return rtf.format(-n, unit);
    }
  }
  // Traduções de textos fixos
  const dict = {
    br: {
      from: "Ida",
      to: "Volta",
      priceOn: "Preço em",
      OpenDeal: "Abrir achado"
    },
    eu: {
     from: "From",
     to: "To",
     priceOn: "Price on",
     OpenDeal: "Open deal"
    },
  } as const;
  const t = dict[region];
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
            <span>{p.to.split("(")[0]}</span><span className="text-sm text-slate-700 font-normal"> ({p.to.split("(")[1].replace(")", "") ?? ""})</span>
          </span>
        </h3>

      {/* CONFIGURE CARD FOR MOBILE */}
      <div className="sm:hidden grid grid-cols-[max-content_1fr] gap-x-2 gap-y-0.5 items-baseline">
        {/* origem (linha inteira) */}
        <h3 className="col-span-2 text-base font-semibold leading-tight">{p.from}</h3>

        {/* para: (same line, grey, lower)) */}
        <span className="text-xs text-slate-500 font-normal">para:</span>
        <div className="flex flex-col col-start-2">
          <h3 className="text-base font-semibold leading-tight">{p.to.split("(")[0]}</h3>
          <span className="text-sm text-slate-700 font-normal">
            ({p.to.split("(")[1]?.replace(")", "") ?? ""})
          </span>
        </div>

        {/* Ida / Volta in the same grid*/}
        <span className="text-xs text-slate-500 font-normal">Ida:</span>
        <span className="text-sm text-slate-600">{translateDate(p.depart, region)}</span>

        <span className="text-xs text-slate-500 font-normal">Volta:</span>
        <span className="text-sm text-slate-600">{translateDate(p.return, region)}</span>
      </div>
      {/* Score */}
      <span className={`sm:hidden inline-flex w-fit px-2 py-0.5 mt-2 rounded-full text-white font-medium ${color}`}>
        {rtAgo(elapsedTime, "day", region)}
      </span>

      {/* CONFIGURE CARD FOR DESKTOP (sm+) */}
      <p className="hidden sm:block text-sm text-slate-600 mt-1
                    [&>span]:inline sm:[&>span]:whitespace-nowrap
                      sm:[&>span:not(:last-child)]:after:content-['•']
                      sm:[&>span:not(:last-child)]:after:mx-1">
          <span>{t.from}: {translateDate(p.depart, region)}</span>
          <span>{t.to}: {translateDate(p.return, region)}</span>
          <span className={`px-2 py-0.5 rounded-full text-white font-medium ${color} inline-flex w-fit`}>
            {rtAgo(elapsedTime, "day", region)}
          </span>
        </p>
      </div>
    <div className="self-center flex flex-col items-center justify-center text-center">
    <div className="text-xl sm:text-2xl font-bold leading-tight">
        {p.currency} {p.price}
        <p className="text-slate-600 font-light text-[0.5rem] sm:text-xs md:text-sm lg:text-[0.7rem]">{t.priceOn} {translateDate(p.found_at, region)}</p>
    </div>

    <Link
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`mt-2 inline-flex items-center justify-center gap-1
      ${gradient}
      px-3 py-1.5 text-sm font-semibold text-white shadow-sm
      transition hover:shadow-md
      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
      active:translate-y-px`}
      aria-label="Abrir este achado"
      onClick={e => {
      if (new Date(p.depart) < new Date()) {
        e.preventDefault();
        alert("Este alerta possui data de ida no passado");
      }
      }}
    >
      {t.OpenDeal}
      <span aria-hidden="true">→</span>
    </Link>
    </div>
    </article>
  );
}