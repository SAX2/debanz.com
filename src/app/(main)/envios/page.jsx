import React from 'react'

const containerStyle = {
  display: "flex",
  gap: "1rem",
  padding: "2rem",
  width: "100%",
  height: "80vh",
  justifyContent: "center",
  alignItems: "center",
}

export default function page() {
  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '1rem' }}>
        ENVIOS A TODO EL PAIS
      </h1>
    </div>
  );
}
