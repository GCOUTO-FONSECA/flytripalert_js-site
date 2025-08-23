import AlertCard from "./AlertCard";

const mock = [
    {from: "São Paulo", to: "Rio de Janeiro", price: 2290, depart: "11 jul 2026", return: "31 jul 2026", days: 20, rating: "imperdível", found_at: "1 Agosto 2025", link: "flytripalert.com"},
    {from: "Rio de Janeiro", to: "São Paulo", price: 2000, depart: "12 jul 2026", return: "30 jul 2026", days: 18, rating: "bom negócio", found_at: "2 Agosto 2025", link: "flytripalert.com"},
    {from: "São Paulo", to: "Belo Horizonte", price: 1500, depart: "13 jul 2026", return: "29 jul 2026", days: 16, rating: "excelente", found_at: "3 Agosto 2025", link: "flytripalert.com"},
    {from: "Belo Horizonte", to: "São Paulo", price: 1600, depart: "14 jul 2026", return: "28 jul 2026", days: 14, rating: "excelente", found_at: "4 Agosto 2025", link: "flytripalert.com"},
    {from: "Rio de Janeiro", to: "Belo Horizonte", price: 1700, depart: "15 jul 2026", return: "27 jul 2026", days: 12, rating: "excelente", found_at: "5 Agosto 2025", link: "flytripalert.com"},
];

export default function AlertsSection() {
    return (
        <div className="grid cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-4 sm:gap-6">
            {mock.map((a,i) => <AlertCard key={i} {...a} />)}
        </div>
    )

}