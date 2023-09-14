import ProductsList from '@/app/(main)/components/product/ProductsList';
import style from './migthlike.module.css';

export default function MigthLike({ id, collectionName }) {
  return (
    <div className={style.section}>
      <h1>Quizas te interese</h1>
      <ProductsList type="collection" param={collectionName} productId={id}/>
    </div>
  )
}
