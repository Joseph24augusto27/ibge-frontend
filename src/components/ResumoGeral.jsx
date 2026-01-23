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
          <strong>Estados</strong>
          <span>{totalEstados}</span>
        </div>

        <div style={styles.box}>
          <strong>Municípios</strong>
          <span>{totalMunicipios}</span>
        </div>

        <div style={styles.box}>
          <strong>Regiões</strong>
          <span>{regioesUnicas.length}</span>
        </div>

        <div style={styles.box}>
          <strong>Filtro</strong>
          <span>{regiaoSelecionada}</span>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: "#f8f9fb",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "25px",
  },

  title: {
    marginBottom: "16px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "16px",
  },

  box: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "16px",
    textAlign: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
    fontSize: "16px",
  }
}


export default ResumoGeral
