import { storefront } from "@/app/utils";
import domain from "../../../config";
import ProductInfo from "./ProductInfo";
import Images from "./components/images/Images";
import MigthLike from "./components/migthlike/MigthLike";
import style from './productById.module.css'
import Products from "@/app/utils/data";

function reemplazarEspacios(string) {
  if (string.includes(' ')) {
    string = string.replace(/ /g, '-');
  }
  return string;
}

export async function generateMetadata({ params }) {
  const data = Products.filter(product => product.id === params.name)[0]

  return {
    title: data.title,
    description: data.description,
    keywords: "Debanz, ropa, marca, Argentina, remeras, Collpase, moda, envíos",
    author: "Debanz",
    viewport: "width=device-width, initial-scale=1.0",
    robots: "index, follow"
  }
}

export default async function page({ params, cartId }) {
  const data = Products.filter(product => product.id === params.name)[0]

  return (
    <main className={style.container}>
      <div className={style.subcontainer}>
        <section className={`${style.section} ${style.images}`}>
          <Images data={data.images} style={style}/>
        </section>
        <section className={style.ProductInfo}>
          <ProductInfo data={data} />
        </section>
      </div>
      
      {/* <MigthLike collectionName={"collapse"} id={productRes.id}/> */}
    </main>
  );
}
