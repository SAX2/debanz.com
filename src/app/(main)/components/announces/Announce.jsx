import style from './announce.module.css'

export default function Announce({ desc }) {
  return (
    <div className={style.container}>
      <p>{desc}</p>
    </div>
  )
}
