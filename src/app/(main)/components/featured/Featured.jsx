import Image from 'next/image';
import style from './featured.module.css';
import collapse from '../../../../../public/imagedebanz2.png';
import collapseLogo from '../../../../../public/SVG.svg';
import { DebanzLogo } from '@/app/components/Icons';

export default function Featured() {
  return (
    <section className={style.container}>
      <Image
        src={collapse}
        width={1000}
        height={1000}
        style={{objectFit: "cover"}}
        alt="Collapse"
        title="Collapse Collection"
        priority={true}
      />
      <div className={style.subcontainer}>
        <Image
          src={collapseLogo}
          width={300}
          alt="Collapse"
          title="Collapse Logo"
          priority={true}
        />
        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
          <p style={{ color: "#fff", fontWeight: 300, fontSize: "18px" }}>by</p>
          <DebanzLogo width={90} heigth={22} bg="#fff" />
        </div>
      </div>
    </section>
  );
}