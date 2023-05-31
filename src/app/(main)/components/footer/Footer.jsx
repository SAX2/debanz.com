"use client";
import Link from "next/link";
import style from './footer.module.css';
import { DebanzLogo, FacebookIcon, InstagramIcon } from "@/app/components/Icons";
import { useState } from "react";

const LinkGroup = ({ data }) => {
  return (
    <div className={style.lg}>
      <h1 className={style.lg_title}>{data.title}</h1>
      {data.links.map((link) => {
        return (
          <Link className={style.lg_link} href={link.path} key={link.path}>
            {link.title}
          </Link>
        );
      })}
    </div>
  );
}

export default function Footer() {
  const links = [
    {
      title: "BRAND",
      links: [
        {
          title: "PRODUCTOS",
          path: "/productos"
        }
      ],
    },
    {
      title: "CONTACTO & SOPORTE",
      links: [
        {
          title: "CONTACTO",
          path: "/contacto"
        },
        {
          title: "ENVIOS",
          path: "/evios"
        },
        {
          title: "DELVOLUCIONES Y CAMBIOS",
          path: "/devoluciones-cambios"
        },
      ],
    },
  ];

  const socialMedia = [
    {
      url: "https://www.instagram.com/debanzba/",
      icon: <InstagramIcon bg="#CCC" width={26} height="auto" />,
    },
    {
      url: "https://www.facebook.com/profile.php?id=100086655642017",
      icon: <FacebookIcon bg="#CCC" width={26} height="auto" />,
    },
  ];

  const [emailValue, setEmailValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // fetch('', )
  }

  return (
    <footer className={style.footer}>
      <div className={style.left_c}>
        <div className={style.social_container}>
          <div>
            <DebanzLogo width={150} heigth="auto" bg="#000" />
            <a href="mailto:clientes@debanzba.com">clientes@debanzba.com</a>
          </div>
          <div>
            {socialMedia.map(s => {
              return <a href={s.url} target="_blank" key={s.url} >{s.icon}</a>;
            })}
          </div>
        </div>
        <div className={style.lg_container}>
          {links.map((group) => {
            return <LinkGroup data={group} key={group.title} />;
          })}
        </div>
      </div>
      <div className={style.rigth_c}>
        <p>ÚNETE CON TU CORREO ELECTRONICO PARA OBTENER UN 10% OFF EN TU PRIMER COMPRA</p>
        <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
          <input type="text" placeholder="Correo electronico"/>
          <button type="submit">ÚNETE</button>
        </form>
      </div>
    </footer>
  );
}
