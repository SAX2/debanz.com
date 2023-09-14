import Product from "./Product";
import style from './product.module.css';
// import domain from '../../../config';
import { storefront } from "@/app/utils";

// const typesOfProductsRequests = ({ type, param }) => {
//   switch (type) {
//     case "collection":
//       return domain(`/products/collections/${param}`);
//     case "collections": 
//       return domain(`/products/collections`);
//     case "all":
//       return domain(`/products/${!param ? "" : param}`);
//     case "best":
//       return domain("/best");
//     case "type": 
//       return domain(`/products/type/${param}`)
//     case "category": 
//       return domain(`/products/category/${param}`);
//     default:
//       return "select a type of request for products";
//   } 
// } 

// async function fetchProducts ({ type, param }) {
//   const path = typesOfProductsRequests({ type, param });
//   const res = await fetch(path, { method: "GET", next: { revalidate: 120 } });
//   const data = await res.json();
//   return data;
// }

export default async function ProductsList({ productsQuery }) {
  // const products = await fetchProducts({ type, param });
  // const productIdItems = [];
  // if (productId) {
  //   const items = products.filter(p => p.id !== productId);
  //   productIdItems.push(...items)
  // }

  const { data } = await storefront(productsQuery);
  const products = data.products.edges;

  return (
    <>
      {data.products.edges.length > 0 ? (
        <div className={style.product_list}>
          {products.map((product) => {
            return <Product data={product.node} key={product.name} />;
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