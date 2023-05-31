"use client";
import Link from "next/link";
import style from './navbar.module.css';
import { usePathname } from "next/navigation";
import { CardIcon } from "@/app/components/Icons";
import { CartIcon } from "@/app/components/Icons";

export default function Navbar({ id }) {
  const pathname = usePathname();
  
  const routes = [
    {
      path: "/compras",
      title: "Mis compras",
      icon: <CartIcon bg={"#000"} width={18} heigth={18}/>
    },
    {
      path: "/pagos",
      title: "Pagos",
      icon: <CardIcon bg={"#000"} width={18} height={18}/>
    }
  ]
  
  return (
    <div className={style.container}>
      {routes.map((r) => {
        return (
          <Link className={style.item} href={`/panel/${id}/${r.path}`} key={r.path}>
            <div className={pathname == `/panel/${id}${r.path}` ? style.active : style.item_sub}>
              {r.icon}
              <span>{r.title}</span>
            </div>
          </Link>
        );
      })}
      <div className="separator"></div>
      <Link href={"/soporte"} className={style.item}>
        <span>Soporte</span>
      </Link>
    </div>
  );
}