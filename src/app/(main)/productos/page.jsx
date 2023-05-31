import style from './products.module.css';
import ProductsList from '../components/product/ProductsList'

export const metadata = {
  title: 'Debanz - Productos',
  description: 'Todos los productos',
}

export default function page() {
  return (
    <div className={style.container}>
      <div className={style.section}>
        <h1>TODOS LOS PRODUCTOS</h1>
        <ProductsList type="all" limit={16}/>
      </div>
    </div>
  );
}
