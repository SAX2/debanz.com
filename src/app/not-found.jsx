import Link from "next/link";

const style = {
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
  textAlign: "center",
}

const styleButton = {
  maxWidth: "200px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  height: "40px",
  background: "#000",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "1rem",
  textDecoration: "none",
}

export default function NotFound() {
  return (
    <div style={style}>
      <h1 style={{ fontSize: 200, lineHeight: 1 }}>404</h1>
      <h3>La pagina que estas buscando no existe</h3>
      <Link href={'/'} style={styleButton}>Seguir comprando</Link>
    </div>
  )
}
