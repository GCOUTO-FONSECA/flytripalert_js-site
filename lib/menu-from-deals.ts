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
  rating?: string;       // "bom" | "excelente" | "imperdivel"
  found_at?: string;     // "30 Aug 2025"
  link?: string;
  class: string;      // "economica" | "executiva" | "primeira"
};

export type Option = { value: string; label: string };
export type Menu = {
  id: 'origem' | 'destino' | 'periodo' | 'classe' | 'avaliacao';
  label: string;
  options: Option[];
  defaultValue: string;
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

function toOptions(values: string[]) {
  return [
    { value: 'all', label: 'Todos' },
    ...values.map((v) => ({ value: toSlug(v), label: v })),
  ];
}

export function buildMenusFromDeals(deals: Deal[]): Menu[] {
  const origins      = uniqSorted(deals.map((d) => d.from));
  const destinations = uniqSorted(deals.map((d) => d.to));
  const ratings      = uniqSorted(deals.map((d) => d.rating));
  const classes      = uniqSorted(deals.map((d) => d.class));

  const menus: Menu[] = [
    {
      id: 'origem',
      label: 'Origem',
      options: toOptions(origins),
      defaultValue: 'all',
    },
    {
      id: 'periodo',
      label: 'Período',
      options: [
        { value: 'all', label: 'Todos' },
        { value: '24h', label: 'Últimas 24h' },
        { value: '3d',  label: 'Até 3 dias' },
        { value: '7d',  label: 'Última semana' },
        { value: '30d', label: 'Último mês' },
      ],
      defaultValue: 'all',
    },
    {
      id: 'classe',
      label: 'Classe',
      options: [
        { value: 'all', label: 'Todas' },
        { value: 'economica', label: 'Econômica' },
        { value: 'executiva', label: 'Executiva' },
        { value: 'primeira',  label: 'Primeira Classe' },

      ],
      defaultValue: 'all',
    },
    {
      id: 'avaliacao',
      label: 'Avaliação',
      options: [
        { value: 'all', label: 'Todas' },
        { value: 'bom', label: 'Bom negócio' },
        { value: 'excelente', label: 'Excelente' },
        { value: 'imperdivel',  label: 'Imperdível' },

      ],
      defaultValue: 'all',
    },
  ];

  return menus;
}
