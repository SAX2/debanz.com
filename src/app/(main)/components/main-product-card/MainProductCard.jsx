import { getSingleProduct } from "@/app/utils/shopify";
import { AccordionComponent, Price } from "./ClientComponents";
import { CollapseLogo } from "@/app/components/Icons";
import Link from "next/link";
import style from "./product.module.css";
import Image from "next/image";
import Products from '@/app/utils/data.js';

export default async function MainProductCard({ productId, title, bubble }) {
  const product = Products.filter(product => product.id === productId)[0];
  const image = product.images.edges[0];

  return (
    <div className={style.container}>
      <Link className={style.mobile_link} href={`/productos/${productId}`}></Link>
      <div className={style.background}>
        <CollapseLogo width={"100%"} height={"auto"} />
      </div>
      <div className={style.image_container}>
        <Image src={image.node.url} width={400} height={400} />
      </div>
      <div className={style.info}>
        <div className={style.title}>
          <div>
            <h1>{product.title}</h1>
            {/* Uncomment this */}
            {/* {allVariantsNotInStock && (
              <div className={style.bubble}>
                <p>Sin Stock</p>
              </div>
            )} */} 
          </div>
          <Price price={product.priceRange.minVariantPrice.amount} />
        </div>
        <Link href={`/productos/${productId}`} className={style.button}>
          COMPRAR AHORA
        </Link>
      </div>
    </div>
  );
}