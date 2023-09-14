import Featured from "./components/featured/Featured";
import MainProductCard from "./components/main-product-card/MainProductCard";
import ProductsList from "./components/product/ProductsList";
import style from './page.module.css';

const ProductsSections = ({ query, title }) => {

  
  return (
    <div className={style.section}>
      <h1>{title}</h1>
      <ProductsList productsQuery={query}/>
    </div>
  );
}

const MainAnnounce = () => {
  return <section className={style.image}>
  </section>;
}

export default function page() {
  const gql = String.raw

  const productsQuery = gql`
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
    <div>
      {/* <MainAnnounce /> */}
      <Featured />
      <section className={style.container}>
        {/* <div className={style.phone}>
          <ProductsSections query={productsQuery} title="COLLAPSE DROP 001" />
        </div> */}
        {/* <Form /> */}
        <div className={style.section}>
          <h1 className={style.title}>COLLAPSE DROP 001</h1>
          <MainProductCard productId={"debanz-f40"} />
        </div>
      </section>
    </div>
  );
}
