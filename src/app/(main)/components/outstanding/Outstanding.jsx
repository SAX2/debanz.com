import { CardIcon, GiftIcon, ShippingIcon } from '@/app/components/Icons';
import style from './outstanding.module.css';

export default function Outstanding() {
  const sections = [
    {
      icon: <ShippingIcon bg={"#000"} width={40} height={40}/>,
      title: "ENVIOS A TODO EL PAIS",
      desc: "Envío nacional sin restricciones",
    },
    {
      icon: <GiftIcon bg={"#000"} width={40} height={40}/>,
      title: "PACKAGING NOTABLE",
      desc: "Incluye stickers con descuento de debut",
    },
    {
      icon: <CardIcon bg={"#000"} width={40} height={40}/>,
      title: "PAGO SEGURO",
      desc: "Mercado Pago y todas las targetas de credito",
    },
  ]

  return (
    <section className={style.container}>
      {sections.map(s => {
        return <div className={style.section}>
          {s.icon}
          <h1>{s.title}</h1>
          <p>{s.desc}</p>
        </div>
      })}
    </section>
  )
}
