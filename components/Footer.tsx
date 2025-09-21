// components/Footer.tsx
import Link from "next/link";
import { Mail, ArrowUp } from "lucide-react";
import { SiInstagram } from "react-icons/si";

type Region = "eu" | "br";

export default function Footer({ region }: { region: Region }) {
  const year = new Date().getFullYear();
  // Traduções de textos fixos
  const dict = {
    br: {
      slogan: "Feito para viajantes inteligentes",
      contact: "Contato",
      backToTop: "Voltar ao topo",
      explore: "Explorar",
      allAlerts: "Todos os Alertas",
      alertsToday: "Alertas de hoje",
      stayUpdated: "Fique por dentro",
      pricesChange: "Preços mudam rápido, salve o site e acompanhe os achados.",
      seeAlerts: "Ver alertas",
      copyright: "FlyTripAlert. Todos os direitos reservados."
    },
    eu: {
      slogan: "Made for smart travelers",
      contact: "Contact",
      backToTop: "Back to top",
      explore: "Explore",
      allAlerts: "All Alerts",
      alertsToday: "Today's Alerts",
      stayUpdated: "Stay Updated",
      pricesChange: "Prices change quickly, save the site and keep track of the finds.",
      seeAlerts: "See Alerts",
      copyright: "FlyTripAlert. All rights reserved."
    },
  } as const;

  const t = dict[region];
  return (
    <footer className="mt-16 bg-slate-50 text-slate-700">
      {/* faixa superior em gradiente */}
      <div className="-mt-16 h-[3px] bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400" />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-16 lg:gap-24">
          {/* brand + tagline */}
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight text-blue-600">
              FlyTripAlert
            </Link>
            <p className="mt-2 text-sm text-slate-600">
              {t.slogan}
            </p>
            <div className="mt-4 flex items-center gap-3 text-center">
              <Link
                href="https://instagram.com/flytripalert"
                className="inline-flex items-center gap-2 text-sm hover:text-blue-600"
                aria-label="Instagram do FlyTripAlert"
              >
                <SiInstagram className="h-4 w-4" />
                Instagram
              </Link>
              <Link
                href="mailto:contact@flytripalert.com"
                className="inline-flex items-center gap-2 text-sm hover:text-blue-600"
                aria-label="Enviar email para contato"
              >
                <Mail className="h-4 w-4" />
                {t.contact}
              </Link>
            </div>
          </div>

          {/* navegação principal */}
          <nav aria-label="Navegação" className="text-sm">
            <h4 className="mb-3 font-semibold text-slate-900">{t.explore}</h4>
            <ul className="space-y-2">
              <li><Link href="/#alerts" className="hover:text-blue-600">{t.allAlerts}</Link></li>
              <li><Link href="/?page=1&periodo=24h" className="hover:text-blue-600">{t.alertsToday}</Link></li>
            </ul>
          </nav>

          {/* chamada rápida */}
          <div className="text-sm">
            <h4 className="mb-3 font-semibold text-slate-900">{t.stayUpdated}</h4>
            <p className="text-slate-600">
              {t.pricesChange}
            </p>
            <Link
              href="/#alerts"
              className="mt-3 inline-flex items-center justify-center rounded-full
                         bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2
                         font-semibold text-white shadow-sm hover:from-blue-600 hover:to-indigo-500
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {t.seeAlerts}
            </Link>
          </div>
        </div>

        {/* barra final */}
        <div className="mt-8 border-t border-slate-200 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {year} FlyTripAlert. {t.copyright}
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-blue-600"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="h-4 w-4" />
            {t.backToTop}
          </Link>
        </div>
      </div>
    </footer>
  );
}
