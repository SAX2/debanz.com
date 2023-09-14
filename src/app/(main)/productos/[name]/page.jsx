import { storefront } from "@/app/utils";
import domain from "../../../config";
import ProductInfo from "./ProductInfo";
import Images from "./components/images/Images";
import MigthLike from "./components/migthlike/MigthLike";
import style from './productById.module.css'

function reemplazarEspacios(string) {
  if (string.includes(' ')) {
    string = string.replace(/ /g, '-');
  }
  return string;
}

export async function generateMetadata({ params }) {
  const { name } = params;
 
  // const product = await fetch(
  //   domain(`/products/name/${reemplazarEspacios(name)}`),
  //   { next: { revalidate: 60 } }
  // ).then((res) => res.json());
  const { data } = await storefront(singleProductQuery, { handle: params.name });
 
  return {
    title: data.product.title,
    description: data.product.description,
    keywords: "Debanz, ropa, marca, Argentina, remeras, Collpase, moda, envíos",
    author: "Debanz",
    viewport: "width=device-width, initial-scale=1.0",
    robots: "index, follow"
  }
}

// async function fetchProduct({ name }) {
//   const res = await fetch(domain(`/products/name/${reemplazarEspacios(name)}`), { next: { revalidate: 60 } });
//   const data = await res.json();
//   return data;
// }
const gql = String.raw

const singleProductQuery = gql`
  query SingleProduct($handle: String!) {
    product(handle: $handle) {
      title
      description
      updatedAt
      tags
      priceRange {
        minVariantPrice {
          amount
        }
      }
      images(first: 2) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 3) {
        edges {
          node {
            id
            title
            currentlyNotInStock
          }
        }
      }
    }
  }
`;


export default async function page({ params, cartId }) {
  const { data } = await storefront(singleProductQuery, { handle: params.name });
  console.log(cartId)

  return (
    <main className={style.container}>
      <div className={style.subcontainer}>
        <section className={`${style.section} ${style.images}`}>
          <Images data={data.product.images} style={style}/>
        </section>
        <section className={style.ProductInfo}>
          <ProductInfo data={data.product} />
        </section>
      </div>
      
      {/* <MigthLike collectionName={"collapse"} id={productRes.id}/> */}
    </main>
  );
}
