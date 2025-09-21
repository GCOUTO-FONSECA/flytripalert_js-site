// lib/menu-from-deals.ts

export type Deal = {
  id: string;
  from?: string;         // origem
  to?: string;           // destino
  price?: number;
  currency?: string;     // "R$"
  depart?: string;       // "30 Aug 2025"
  return?: string;       // "30 Aug 2025"
  days?: number;         // 10
  found_at?: string;     // "30 Aug 2025"
  link?: string;
  class: string;      // "economica" | "executiva" | "primeira"
};

export type Option = { value: string; label: string };
export type Menu = {
  id: 'origem' | 'destino' | 'periodo' | 'classe' | 'precoRange';
  label: string;
  options: Option[];
  defaultValue: string | string[];
};

const PT = 'pt-BR';

export default function toSlug(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-z0-9]+/g, '-')                     // troca espaços e pontuação por '-'
    .replace(/(^-|-$)/g, '');                        // remove '-' nas pontas
}

function clean(v?: string) {
return (v ?? '').trim().replace(/\s+/g, ' '); // Remove undefined, trim spaces, and collapse multiple spaces into one
}

function uniqSorted(list: (string | undefined)[]) {
  const cleaned = list.map(clean).filter(Boolean) as string[];
  return [...new Set(cleaned)].sort((a, b) => a.localeCompare(b, PT));
}

function toOptions(values: string[], region: "br" | "eu" = "br"): Option[] {
  return [
    { value: 'all', label: region === "br" ? 'Todos' : 'All' },
    ...values.map((v) => ({ value: toSlug(v), label: v })),
  ];
}

export function buildMenusFromDeals(deals: Deal[], region: "br" | "eu"): Menu[] {
  // Traduções de textos fixos
  const dict = {
    br: {
      origin: "Origem",
      destination: "Destino",
      period: "Período",
      periodOptions: [
        { value: 'all', label: 'Todos' },
        { value: '24h', label: 'Últimas 24h' },
        { value: '3d',  label: 'Até 3 dias' },
        { value: '7d',  label: 'Última semana' }
      ],
      class: "Classe",
      priceRange: "Faixa de preço",
    },
    eu: {
      origin: "Origin",
      destination: "Destination",
      period: "Period",
      periodOptions: [
        { value: 'all', label: 'All' },
        { value: '24h', label: 'Last 24h' },
        { value: '3d',  label: 'Up to 3 days' },
        { value: '7d',  label: 'Last week' }
      ],
      class: "Class",
      priceRange: "Price Range",
    },
  } as const;

  const t = dict[region];
  const origins      = uniqSorted(deals.map((d) => d.from));
  const maxPrice     = Math.max(0, ...deals.map((d) => d.price ?? 0));
  const minPrice     = 0;
  const seatClass    = uniqSorted(deals.map((d) => d.class));

  const menus: Menu[] = [
    {
      id: 'origem',
      label: t.origin,
      options: toOptions(origins, region),
      defaultValue: 'all',
    },
    {
      id: 'periodo',
      label: t.period,
      options: [...t.periodOptions],
      defaultValue: 'all',
    },
    {
      id: 'classe',
      label: t.class,
      options: toOptions(seatClass, region),
      defaultValue: 'all',
    },
    {
      id: "precoRange",
      label: t.priceRange,
      options: [],
      defaultValue: [String(minPrice), String(maxPrice)]
    }
  ];

  return menus;
}
