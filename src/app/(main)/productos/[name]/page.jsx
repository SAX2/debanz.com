import domain from "../../../config";
import ProductInfo from "./ProductInfo";
import style from './productById.module.css'
import imageOne from '../../../../../public/001.png';
import imageTwo from '../../../../../public/001front.png';
import Image from "next/image";

async function fetchProduct({ name }) {
  function reemplazarEspacios(string) {
    // Verificar si el string contiene espacios
    if (string.includes(' ')) {
      // Reemplazar los espacios por guiones (-)
      string = string.replace(/ /g, '-');
    }
    return string;
  }

  const res = await fetch(domain(`/products/name/${reemplazarEspacios(name)}`), { next: { revalidate: 60 } });
  const data = await res.json();
  return data;
}

export default async function page({ params }) {
  const { name } = params;
  const product = await fetchProduct({ name });
  const productRes = product[0];

  return (
    <main className={style.container}>
      <div className={style.subcontainer}>
        <section className={style.section}>
          {productRes.images.map((i, index) => {
            return (
              <div className={style.image} key={index}>
                <Image src={domain(`/${i}`)} width={1000} height={1000} quality={100} placeholder="empty"/>
              </div>
            );
          })}
        </section>
        <section className={style.ProductInfo}>
          <ProductInfo data={productRes} />
        </section>
      </div>
    </main>
  );
}
