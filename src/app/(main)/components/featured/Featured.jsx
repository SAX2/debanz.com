import Image from 'next/image';
import style from './featured.module.css';
import collapse from '../../../../../public/SVG.svg';
import { DebanzLogo } from '@/app/components/Icons';

export default function Featured() {
  return (
    <section className={style.container}>
      <Image src={collapse} width={300} sizes="(max-width: 768px) 150px" />
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <p style={{ color: "#fff", fontWeight: 300, fontSize: "18px" }}>by</p>
        <DebanzLogo width={90} heigth={22} bg="#fff" />
      </div>
    </section>
  );
}
