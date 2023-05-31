"use client";
import { BackIcon, DebanzLogo } from '@/app/components/Icons';
import style from './navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className={style.container}>
      <DebanzLogo width={90} bg="#000" heigth={22} />
      <Link href={"/"} className={style.go_back}>
        <BackIcon bg={`#aaa`} width={18} height={18} />
        Volver a la tienda
      </Link>
    </nav>
  );
}
