import { ErrorIcon } from '@/app/components/Icons'
import Link from 'next/link'

const style = {
  width: "100%",
  height: "85vh",
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
  textDecoration: "none"
}

export default function page() {
  return (
    <div style={style}>
      <ErrorIcon bg="#FF2323" width={150} heigth={150} />
      <h1>Ha habido un error al procesar el pago</h1>
      <Link href={"/"} style={styleButton}>
        Volver al inicio
      </Link>
    </div>
  );
}