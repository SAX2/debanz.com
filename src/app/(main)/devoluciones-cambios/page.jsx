import Link from 'next/link';
import React from 'react'

const containerStyle = {
  display: "flex",
  gap: "1rem",
  padding: "1rem",
  width: "100%",
  height: "80vh",
  justifyContent: "center",
  alignItems: "center",
};

const div = {
  maxWidth: 500,
  width: "100%",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  fontSize: "1rem",
}

const link = {
  textDecoration: "none",
  padding: 10,
  borderRadius: 2.5,
  background: "#eee",
  width: "fit-content",
  color: "#000",
  fontWeigth: 500
}

export default function page() {
  return (
    <div style={containerStyle}>
      <div style={div}>
        <h1 style={{ fontSize: "1.2rem" }}>POLÍTICA DE DEVOLUCIONES</h1>
        <p>
          Si no estás satisfecho/a con nuestro producto, ofrecemos devoluciones
          o cambios dentro de los 15 días posteriores a la compra. Para
          solicitarlo, comunícate con nosotros para coordinar la logística.
        </p>
        <div style={{ marginTop: 16 }}>
          <Link style={link} href={"/contacto"}>
            Contactanos
          </Link>
        </div>
      </div>
    </div>
  );
}
