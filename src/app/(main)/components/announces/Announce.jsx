import Marquee from 'react-fast-marquee';
import style from './announce.module.css'

export default function Announce({ desc }) {
  return (
    <Marquee className={style.container} autoFill={true} speed={35}>
      <p>{desc}</p>
    </Marquee>
  );
}
