// components/Hero.tsx
export default function Hero() {
  return (
    <section className="relative w-full bg-blue-500 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20 text-center">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          Escolha o seu alerta favorito
        </h1>

        {/* Subheadline */}
        <p className="mt-4 text-base sm:text-lg opacity-90">
          A Fly rastreia milhares de voos diariamente enquanto você descansa
        </p>

        {/* Mensagem temporária */}
        <p className="mt-2 text-sm sm:text-base opacity-90">
          Novidades em breve! Registre-se para ser avisado.
          Membros que registrarem-se manterão alertas premium gratuitos por 1 ano.
        </p>

        {/* menus para filtrar os alertas */}
        <div className="h-8" />
        <form
          className="w-full max-w-4xl mx-auto rounded-xl border p-4 sm:p-6 bg-blue-500/70 backdrop-blur"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Origem */}
            <div className="flex flex-col">
              <label htmlFor="origem" className="text-sm font-medium">Origem</label>
              <select
          id="origem"
          name="origem"
          className="mt-1 rounded-xl border px-3 py-2"
          defaultValue=""
              >
          <option className="bg-blue-800" value="" disabled>Selecione a origem</option>
          {/* Preencha com suas cidades */}
          <option className="bg-blue-800">Paris (França)</option>
          <option className="bg-blue-800">São Paulo (Brasil)</option>
          <option className="bg-blue-800">Porto Alegre (Brasil)</option>
              </select>
            </div>

            {/* Destino */}
            <div className="flex flex-col">
              <label htmlFor="destino" className="text-sm font-medium">Destino</label>
              <select
          id="destino"
          name="destino"
          className="mt-1 rounded-xl border px-3 py-2"
          defaultValue=""
              >
          <option value="" disabled>Selecione o destino</option>
          {/* Preencha com seus destinos */}
          <option>Lisboa (Portugal)</option>
          <option>Miami (EUA)</option>
          <option>Mykonos (Grécia)</option>
              </select>
            </div>

            {/* Preço máx. */}
            <div className="flex flex-col">
              <label htmlFor="preco" className="text-sm font-medium">Preço máx.</label>
              <input
          id="preco"
          name="preco"
          type="number"
          inputMode="numeric"
          min={0}
          step="1"
          placeholder="Digite o valor"
          className="mt-1 rounded-xl border px-3 py-2"
          autoComplete="off"
              />
            </div>

            {/* Período */}
            <div className="flex flex-col">
              <label htmlFor="periodo" className="text-sm font-medium">Período</label>
              <select
          id="periodo"
          name="periodo"
          className="mt-1 rounded-xl border px-3 py-2"
          defaultValue=""
              >
          <option value="" disabled>Escolha o período</option>
          <option value="24h">Últimas 24h</option>
          <option value="3d">Até 3 dias</option>
          <option value="7d">Última semana</option>
          <option value="30d">Último mês</option>
          <option value="all">Todos</option>
              </select>
            </div>

            {/* Avaliação do achado */}
            <div className="flex flex-col">
              <label htmlFor="avaliacao" className="text-sm font-medium">Avaliação</label>
              <select
          id="avaliacao"
          name="avaliacao"
          className="mt-1 rounded-xl border px-3 py-2"
          defaultValue=""
              >
          <option value="" disabled>Selecione</option>
          <option value="bom">Bom negócio</option>
          <option value="excelente">Excelente</option>
          <option value="imperdivel">Imperdível</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="submit"
              className="rounded-2xl px-4 py-2 font-medium shadow-sm border hover:shadow transition"
            >
              Aplicar filtros
            </button>
            <button
              type="reset"
              className="text-sm opacity-80 hover:opacity-100 transition"
            >
              Limpar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
