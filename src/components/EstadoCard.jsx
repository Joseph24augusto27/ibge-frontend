function EstadoCard({ nome, sigla, regiao, totalMunicipios }) {
  return (
    <div style={styles.card}>
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
    transition: "0.2s",
  },

  title: {
    marginBottom: "12px",
    fontSize: "18px",
    color: "#222",
  }
}


export default EstadoCard
