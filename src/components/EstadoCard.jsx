import { useState } from "react"


const coresPorRegiao = {
  Norte: "#2563eb",
  Nordeste: "#f97316",
  "Centro-Oeste": "#16a34a",
  Sudeste: "#7c3aed",
  Sul: "#dc2626"
}


function EstadoCard({ nome, sigla, regiao, totalMunicipios }) {

  const [hover, setHover] = useState(false)
  const cor = coresPorRegiao[regiao] || "#64748b"

  return (

   <div
  style={{
    ...styles.card,
    borderLeft: `6px solid ${cor}`,
    transform: hover ? "translateY(-6px)" : "translateY(0)",
    boxShadow: hover
      ? "0 12px 25px rgba(0,0,0,0.15)"
      : "0 4px 10px rgba(0,0,0,0.08)"
  }}
  onMouseEnter={() => setHover(true)}
  onMouseLeave={() => setHover(false)}
>
      <h2 style={styles.title}>
        {nome} ({sigla})
      </h2>

      <p>
        <strong>Região:</strong> {regiao}
      </p>

      <p>
        <strong>Municípios:</strong> {totalMunicipios}
      </p>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    transition: "all 0.25s ease",
    cursor: "pointer",
  },

}


export default EstadoCard
