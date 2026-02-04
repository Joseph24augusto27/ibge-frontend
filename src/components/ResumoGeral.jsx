function ResumoGeral({ estados, regiaoSelecionada }) {
  const totalEstados = estados.length

  const totalMunicipios = estados.reduce(
    (soma, estado) => soma + estado.totalMunicipios,
    0
  )

  const regioesUnicas = [
    ...new Set(estados.map(estado => estado.regiao))
  ]

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Resumo Geral</h2>

      <div style={styles.grid}>
        <div style={styles.box}>
          <span style={styles.label}>Estados</span>
          <strong style={styles.value}>{totalEstados}</strong>
        </div>

        <div style={styles.box}>
          <span style={styles.label}>Municípios</span>
          <strong style={styles.value}>{totalMunicipios}</strong>
        </div>

        <div style={styles.box}>
          <span style={styles.label}>Regiões</span>
          <strong style={styles.value}>{regioesUnicas.length}</strong>
        </div>

        <div style={styles.box}>
          <span style={styles.label}>Filtro ativo</span>
          <strong style={styles.value}>{regiaoSelecionada}</strong>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: "#f8f9fb",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "25px",
  },

  title: {
    marginBottom: "16px",
    fontSize: "18px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "16px",
  },

  box: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "18px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
  },

  label: {
    display: "block",
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "6px",
  },

  value: {
    fontSize: "22px",
    color: "#0f172a",
  }
}

export default ResumoGeral
