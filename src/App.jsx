import { useEffect, useState } from "react"
import { api } from "./services/api"

import EstadoCard from "./components/EstadoCard"
import ResumoGeral from "./components/ResumoGeral"
import GraficoRegioes from "./components/GraficoRegioes"

function App() {
  const [estados, setEstados] = useState([])
  const [regiaoSelecionada, setRegiaoSelecionada] = useState("Todas")
  const [busca, setBusca] = useState("")
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

  const estadosFiltrados = estados.filter(estado => {
    const filtroRegiao =
      regiaoSelecionada === "Todas" ||
      estado.regiao === regiaoSelecionada

    const filtroBusca =
      estado.estado
        .toLowerCase()
        .includes(busca.toLowerCase())

    return filtroRegiao && filtroBusca
  })

  if (loading) {
    return <p style={{ padding: 24 }}>Carregando dados do IBGE...</p>
  }

  return (
    <>
      {/* HEADER */}
      <header
        style={{
          padding: "20px",
          borderBottom: "1px solid #eee",
          marginBottom: "25px"
        }}
      >
        <h1>🇧🇷 IBGE Dashboard</h1>
      </header>

      <div className="container">
        {/* RESUMO */}
        <ResumoGeral
          estados={estadosFiltrados}
          regiaoSelecionada={regiaoSelecionada}
        />

        {/* GRÁFICO */}
        <div style={{ marginBottom: "40px" }}>
          <GraficoRegioes
            estados={estados}
            regiaoSelecionada={regiaoSelecionada}
            onSelecionarRegiao={setRegiaoSelecionada}
          />
        </div>

        {/* FILTROS */}
        <div
          style={{
            backgroundColor: "#f8f9fb",
            padding: "16px",
            borderRadius: "14px",
            marginBottom: "30px"
          }}
        >
          <h3 style={{ marginBottom: "12px" }}>🔎 Filtros</h3>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              alignItems: "flex-end"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", color: "#475569" }}>
                Região
              </label>

              <select
                value={regiaoSelecionada}
                onChange={(e) => setRegiaoSelecionada(e.target.value)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  fontSize: "15px",
                  outlineColor: "#2563eb"
                }}
              >
                <option value="Todas">Todas as regiões</option>
                <option value="Norte">Norte</option>
                <option value="Nordeste">Nordeste</option>
                <option value="Centro-Oeste">Centro-Oeste</option>
                <option value="Sudeste">Sudeste</option>
                <option value="Sul">Sul</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", color: "#475569" }}>
                Buscar estado
              </label>

              <input
                type="text"
                placeholder="Ex: São Paulo"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  minWidth: "220px",
                  fontSize: "15px",
                  outlineColor: "#2563eb"
                }}
              />
            </div>
          </div>
        </div>

        {/* LISTA DE ESTADOS */}
        {estadosFiltrados.length === 0 ? (
          <div
            style={{
              backgroundColor: "#f8f9fb",
              padding: "24px",
              borderRadius: "14px",
              textAlign: "center"
            }}
          >
            <p style={{ marginBottom: "12px", fontSize: "16px" }}>
              😕 Nenhum estado encontrado
            </p>

            <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "16px" }}>
              Tente ajustar os filtros ou limpar a busca.
            </p>

            <button
              onClick={() => {
                setBusca("")
                setRegiaoSelecionada("Todas")
              }}
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              Limpar filtros
            </button>
          </div>
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
    </>
  )
}

export default App
