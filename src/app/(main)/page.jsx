import Featured from "./components/featured/Featured";
import MainProductCard from "./components/main-product-card/MainProductCard";
import style from './page.module.css';

export default function page() {
  return (
    <div>
      <Featured />
      <section className={style.container}>
        <div className={style.section}>
          <h1 className={style.title}>COLLAPSE DROP 001</h1>
          <MainProductCard productId={"debanz-f40"} />
        </div>
      </section>
    </div>
  );
}
