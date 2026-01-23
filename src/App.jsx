import { useEffect, useState } from "react"
import { api } from "./services/api"

import EstadoCard from "./components/EstadoCard.jsx"
import ResumoGeral from "./components/ResumoGeral.jsx"

function App() {
  const [estados, setEstados] = useState([])
  const [regiaoSelecionada, setRegiaoSelecionada] = useState("Todas")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get("/ibge/summary")
      .then(response => {
        setEstados(response.data)
      })
      .catch(error => {
        console.error("Erro ao buscar dados:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const estadosFiltrados =
    regiaoSelecionada === "Todas"
      ? estados
      : estados.filter(
          estado => estado.regiao === regiaoSelecionada
        )

  if (loading) {
    return <p>Carregando dados do IBGE...</p>
  }

  return (
    <div style={{ padding: "24px" }}>
      <h1>IBGE Dashboard</h1>

      {/* 🔹 RESUMO GERAL */}
      <ResumoGeral
        estados={estadosFiltrados}
        regiaoSelecionada={regiaoSelecionada}
      />

      {/* 🔹 FILTRO POR REGIÃO */}
      <select
        value={regiaoSelecionada}
        onChange={(e) => setRegiaoSelecionada(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          marginBottom: "20px"
        }}
      >
        <option value="Todas">Todas as regiões</option>
        <option value="Norte">Norte</option>
        <option value="Nordeste">Nordeste</option>
        <option value="Centro-Oeste">Centro-Oeste</option>
        <option value="Sudeste">Sudeste</option>
        <option value="Sul">Sul</option>
      </select>

      {/* 🔹 LISTAGEM DE ESTADOS */}
      {estadosFiltrados.length === 0 ? (
        <p>Nenhum estado encontrado para essa região.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "16px"
          }}
        >
          {estadosFiltrados.map(estado => (
            <EstadoCard
              key={estado.sigla}
              nome={estado.estado}
              sigla={estado.sigla}
              regiao={estado.regiao}
              totalMunicipios={estado.totalMunicipios}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
