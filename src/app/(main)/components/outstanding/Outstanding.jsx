import { Lock, GiftIcon, ShippingIcon } from '@/app/components/Icons';
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
      title: "TODAS LAS TARJETAS",
      desc: "Tarjetas de credito o debito",
    },
    {
      icon: <Lock bg={"#000"} width={40} height={40}/>,
      title: "COMPRA SEGURA",
      desc: "Tus datos siempre protegidos",
    },
  ]

  return (
    <section className={style.container}>
      {sections.map((s, index) => {
        return (
          <div className={style.section}>
            <div className={style.section_main}>
              {s.icon}
              <div>
                <h1>{s.title}</h1>
                <p>{s.desc}</p>
              </div>
            </div>
            {index + 1 >= sections.length ? null : (
              <div className={style.separator}></div>
            )}
          </div>
        );
      })}
    </section>
  )
}
