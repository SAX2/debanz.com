import Link from "next/link";
import style from './footer.module.css';
import { InstagramIcon } from "@/app/components/Icons";
import {
  AMEX,
  DinersClub,
  Maestro,
  MasterdCard,
  MercadoPago,
  Paypal,
  Visa,
} from "@/app/components/CardsIcons";

export default function Footer() {
  const links = [
    {
      title: "INFO",
      elements: [
        {
          title: "CONTACTO",
          path: "/contacto",
        },
        {
          title: "ENVIOS Y DEVOLUCIONES",
          path: "/envios-y-devoluciones",
        },
        {
          title: "POLITICA DE REEMBOLSO",
          path: "/politica-de-reembolso",
        },
        ,
        {
          title: "TERMINOS DEL SERVICIO",
          path: "/terminos-del-servicio",
        },
      ],
    },
    {
      title: "LEGAL",
      elements: [
        {
          title: "TERMINOS Y CONDICIONES",
          path: "/terminos-y-condiciones",
        },
        {
          title: "POLITICA DE PRIVACIDAD",
          path: "/politica-de-privacidad",
        },
      ],
    },
    {
      type: "no-link",
      title: "clientes@debanz.com",
      elements: [
        {
          content: "Horario de Atencion al Cliente:",
        },
        {
          content: "Lunes a Domingo: 9:00 - 18:00 ",
        },
      ],
      social: [
        {
          icon: <InstagramIcon width={15} height={15} bg={"var(--grey)"}/>,
          src: "https://www.instagram.com/debanzba/"
        }
      ]
    },
  ];

  const cards = [
    {
      name: "DinersClub",
      icon: <DinersClub />
    },
    {
      name: "AMEX",
      icon: <AMEX />
    },
    {
      name: "MasterdCard",
      icon: <MasterdCard />
    },
    {
      name: "Visa",
      icon: <Visa />
    },
    {
      name: "Paypal",
      icon: <Paypal />
    },
    {
      name: "MercadoPago",
      icon: <MercadoPago />
    },
    {
      name: "Maestro",
      icon: <Maestro />
    },
  ]

  return (
    <footer className={style.footer}>
      <div className={style.links}>
        {links.map(section => {
          return (
            <div className={style.section}>
              <div className={style.section_title}>{section.title}</div>
              <div className={style.section_items}>
                {section.type != "no-link" ? (
                  <>
                    {section.elements.map((element) => {
                      return (
                        <Link
                          key={element.title}
                          className={style.section_link}
                          href={element.path}
                        >
                          {element.title}
                        </Link>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {section.elements.map((element) => {
                      return (
                        <div
                          className={`${style.section_link} ${style.noLink}`}
                        >
                          {element.content}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
              {section.social && (
                <div className={style.social}>
                  {section.social.map((social) => {
                    return (
                      <a
                        href={social.src}
                        key={social.src}
                        className={style.section_link}
                        target="_blank"
                      >
                        {social.icon}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className={style.foot}>
        <h1>Debanz™</h1>
        <div className={`${style.divider} divider_black`}></div>
        <div className={style.cards}>
          {cards.map(card => {
            return <div>{card.icon}</div>
          })}
        </div>
      </div>
    </footer>
  );
}