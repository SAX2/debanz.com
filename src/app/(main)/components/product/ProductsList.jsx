import Product from "./Product";
import style from './product.module.css';
import domain from '../../../config';
import imageOne from '../../../../../public/001.png';
import imageTwo from '../../../../../public/001front.png';

// const innerLimit = ({limit, query}) => {
//   if (limit != undefined) {
//     return query + `/${limit}`
//   } else return query;
// }

const typesOfProductsRequests = ({ type, param }) => {
  switch (type) {
    case "collection":
      return domain(`/products/collections/${param}`);
    case "collection": 
      return domain(`/products/collections`);
    case "all":
      return domain(`/products/${!param ? "" : param}`);
    case "best":
      return domain("/best");
    case "type": 
      return domain(`/products/type/${param}`)
    case "category": 
      return domain(`/products/category/${param}`);
    default:
      return "select a type of request for products";
  } 
} 

async function fetchProducts ({ type, param }) {
  const path = typesOfProductsRequests({ type, param });
  const res = await fetch(path, { method: "GET", next: { revalidate: 120 } });
  const data = await res.json();
  return data;
}

export default async function ProductsList({ type, param }) {
  const products = await fetchProducts({ type, param });

  return (
    <>
      {products.length > 0 ? (
        <div className={style.product_list}>
          {products.map((product) => {
            return <Product data={product} key={product.name} />;
          })}
        </div>
      ) : (
        <div className={style.notFound}>
          <p>No se han encontrado productos</p>
        </div>
      )}
    </>
  );
}
