import Featured from "./components/featured/Featured";
import ProductsList from "./components/product/ProductsList";
import style from './page.module.css';

const ProductsSections = ({ limit, type, param, title }) => {
  return (
    <div className={style.section}>
      <h1>{title}</h1>
      <ProductsList limit={limit} type={type} param={param} />
    </div>
  );
}

const MainAnnounce = () => {
  return <section className={style.image}>
  </section>;
}

export default function page() {
  return (
    <div>
      {/* <MainAnnounce /> */}
      <section className={style.container}>
        <ProductsSections limit={10} type="all" title="TODOS LOS PRODUCTOS" />
        {/* <Form /> */}
      </section>
      <Featured />
    </div>
  );
}
