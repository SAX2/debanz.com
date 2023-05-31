import style from './loader.module.css';

export default function Loader() {
  return (
    <div class={style.lds_ripple}>
      <div></div>
      <div></div>
    </div>
  );
}
