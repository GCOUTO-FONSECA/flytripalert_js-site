// components/Hero.tsx

import SelectField from "./SelectField";
import RangeField from "./RangeField";
import { useState } from "react";

export default function Hero() {
  // Dummy menus só pra exemplo
  const menus = [
    {
      id: "origem",
      label: "Origem",
      placeholder: "Selecione a origem",
      options: [
        { value: "par", label: "Paris" },
        { value: "sao", label: "São Paulo" },
        { value: "poa", label: "Porto Alegre" },
      ],
    },
    {
      id: "destino",
      label: "Destino",
      placeholder: "Selecione o destino",
      options: [
        { value: "lis", label: "Lisboa" },
        { value: "mia", label: "Miami" },
        { value: "jmk", label: "Mykonos" },
      ],
    },
    {
      id: "periodo",
      label: "Período",
      placeholder: "Escolha o período",
      options: [
        { value: "24h", label: "Últimas 24h" },
        { value: "3d", label: "Até 3 dias" },
        { value: "7d", label: "Última semana" },
        { value: "30d", label: "Último mês" },
        { value: "all", label: "Todos" },
      ],
    },
    {
      id: "avaliacao",
      label: "Avaliação",
      placeholder: "Selecione",
      options: [
        { value: "bom", label: "Bom negócio" },
        { value: "excelente", label: "Excelente" },
        { value: "imperdivel", label: "Imperdível" },
      ],
    },
  ];

  const [precoMax, setPrecoMax] = useState(10000);

  return (
    
    <section className="relative w-full bg-blue-500 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20 text-center">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          Escolha o seu alerta favorito
        </h1>

        {/* Subheadline */}
        <p className="mt-4 text-base sm:text-lg opacity-90 font-bold">
          A Fly rastreia milhares de voos diariamente enquanto você descansa
        </p>
        
        <div className="h-2"> </div>
        
        {/* Mensagem temporária */}
        <p className="mt-2 text-sm sm:text-base opacity-90">
          Novidades em breve! Registre-se para ser avisado.
          Membros que registrarem-se manterão alertas premium gratuitos por 1 ano.
        </p>

        {/* Form de filtros */}
        <form
          className="mt-8 w-full max-w-4xl mx-auto bg-white rounded-2xl shadow p-4 sm:p-6 text-gray-800"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {menus.map((m) => (
              <SelectField
                key={m.id}
                id={m.id}
                label={m.label}
                placeholder={m.placeholder}
                options={m.options}
              />
            ))}

          </div>
          {/* Dummy input para Preço */}
          <div className="mt-6 items-center justify-center mx-auto ">
          <RangeField
            id="precoMax"
            label="Preço máx."
            min={50}
            max={10000}
            step={10}
            value={precoMax}
            onChange={setPrecoMax}
            prefix="R$ "
          />
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="submit"
              className="rounded-2xl px-5 py-2 font-medium bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Aplicar filtros
            </button>
            <button
              type="reset"
              className="rounded-2xl px-5 py-2 font-medium border hover:bg-gray-100 transition"
            >
              Limpar
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}
