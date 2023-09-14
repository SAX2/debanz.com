import style from './products.module.css';
import ProductsList from '../components/product/ProductsList'

export const metadata = {
  title: 'Debanz - Productos',
  description: 'Todos los productos',
}

export default function page() {
  const gql = String.raw;
  const query = gql`
    query Products {
      products(first: 8) {
        edges {
          node {
            title
            priceRange {
              maxVariantPrice {
                amount
              }
            }
            images(first: 2) {
              edges {
                node {
                  url
                  altText
                  id
                }
              }
            }
          }
        }
      }
    }
  `;

  return (
    <div className={style.container}>
      <div className={style.section}>
        <h1>TODOS LOS PRODUCTOS</h1>
        <ProductsList productsQuery={query}/>
      </div>
    </div>
  );
}
