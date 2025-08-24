// components/Footer.tsx
import Link from "next/link";
import { Mail, ArrowUp } from "lucide-react";
import { SiInstagram } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-slate-50 text-slate-700">
      {/* faixa superior em gradiente */}
      <div className="-mt-16 h-[3px] bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400" />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* brand + tagline */}
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight text-blue-600">
              FlyTripAlert
            </Link>
            <p className="mt-2 text-sm text-slate-600">
              Feito para viajantes inteligentes
            </p>
            <div className="mt-4 flex items-center gap-3">
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
                Contato
              </Link>
            </div>
          </div>

          {/* navegação principal */}
          <nav aria-label="Navegação" className="text-sm">
            <h4 className="mb-3 font-semibold text-slate-900">Explorar</h4>
            <ul className="space-y-2">
              <li><Link href="/#alerts" className="hover:text-blue-600">Todos os alertas</Link></li>
              <li><Link href="/top" className="hover:text-blue-600">Achado do dia</Link></li>
              <li><Link href="/como-funciona" className="hover:text-blue-600">Como funciona</Link></li>
            </ul>
          </nav>

          {/* suporte / legal */}
          <nav aria-label="Suporte" className="text-sm">
            <h4 className="mb-3 font-semibold text-slate-900">Suporte</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="hover:text-blue-600">FAQ</Link></li>
              <li><Link href="/contato" className="hover:text-blue-600">Fale conosco</Link></li>
              <li><Link href="/politica-de-privacidade" className="hover:text-blue-600">Política de privacidade</Link></li>
              <li><Link href="/termos" className="hover:text-blue-600">Termos de uso</Link></li>
            </ul>
          </nav>

          {/* chamada rápida */}
          <div className="text-sm">
            <h4 className="mb-3 font-semibold text-slate-900">Fique por dentro</h4>
            <p className="text-slate-600">
              Preços mudam rápido, salve o site e acompanhe os achados.
            </p>
            <Link
              href="/#alerts"
              className="mt-3 inline-flex items-center justify-center rounded-full
                         bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2
                         font-semibold text-white shadow-sm hover:from-blue-600 hover:to-indigo-500
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Ver alertas
            </Link>
          </div>
        </div>

        {/* barra final */}
        <div className="mt-8 border-t border-slate-200 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {year} FlyTripAlert. Todos os direitos reservados.
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-blue-600"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="h-4 w-4" />
            Topo
          </Link>
        </div>
      </div>
    </footer>
  );
}
