import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

function TooltipCustomizado({ active, payload }) {
  if (!active || !payload || payload.length === 0) return null

  const { regiao, municipios } = payload[0].payload

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "10px 14px",
        borderRadius: "8px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
        fontSize: "14px",
        transition: "all 0.2s ease"
      }}
    >
      <strong>{regiao}</strong>
      <div>{municipios} municípios</div>
    </div>
  )
}

function GraficoRegioes({
  estados = [],
  regiaoSelecionada,
  onSelecionarRegiao
}) {
  if (!Array.isArray(estados) || estados.length === 0) {
    return (
      <div style={{ width: "100%", height: 320 }}>
        <h3>📊 Municípios por região</h3>
        <p>Carregando gráfico...</p>
      </div>
    )
  }

  const dadosPorRegiao = Object.values(
    estados.reduce((acc, estado) => {
      if (!acc[estado.regiao]) {
        acc[estado.regiao] = {
          regiao: estado.regiao,
          municipios: 0
        }
      }

      acc[estado.regiao].municipios += estado.totalMunicipios
      return acc
    }, {})
  )

  return (
    <div style={{ width: "100%", height: 320 }}>
      <h3 style={{ marginBottom: 12 }}>
        📊 Municípios por região (clique para filtrar)
      </h3>

      <ResponsiveContainer>
        <BarChart data={dadosPorRegiao}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="regiao" />
          <YAxis />
          <Tooltip
            content={<TooltipCustomizado />}
            cursor={{ fill: "rgba(37, 99, 235, 0.08)" }}
          />

          <Bar
            dataKey="municipios"
            radius={[6, 6, 0, 0]}
            isAnimationActive
            animationDuration={700}
            style={{ cursor: "pointer" }}
            onClick={(data) => {
              if (!data?.regiao || !onSelecionarRegiao) return

              if (data.regiao === regiaoSelecionada) {
                onSelecionarRegiao("Todas")
              } else {
                onSelecionarRegiao(data.regiao)
              }
            }}
          >
            {dadosPorRegiao.map((entry) => {
              const ativo =
                regiaoSelecionada === "Todas" ||
                regiaoSelecionada === entry.regiao

              return (
                <cell
                  key={entry.regiao}
                  fill={ativo ? "#2563eb" : "#cbd5e1"}
                  opacity={ativo ? 1 : 0.35}
                  style={{
                    transition: "all 0.3s ease"
                  }}
                />
              )
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficoRegioes
