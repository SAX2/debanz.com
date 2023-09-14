"use client";
import Image from 'next/image';
import style from './product.module.css';
import Link from 'next/link';
import domain from '@/app/config';
import useFormatText from '@/app/hooks/useFormatText';

export default function Product({ data }) {
  const { formatPrice } = useFormatText();
  const nameLower = data.title.toLowerCase();

  function reemplazarEspacios(string) {
    if (string.includes(' ')) {
      string = string.replace(/ /g, '-');
    }
    return string;
  }

  const ImageProduct = ({ i }) =>  {
    return <Image
      alt={data.title}
      title={data.title}
      src={i?.node?.url}
      width={1080}
      height={1080}
      key={i?.id}
    />
  };

  return (
    <Link
      href={`/productos/${reemplazarEspacios(nameLower)}`}
      className={style.container}
    >
      <div className={style.image}>
        {data.images.edges.map((i) => {
          return (
            <Image
              alt={data.title}
              title={data.title}
              src={i.node.url}
              width={1080}
              height={1080}
              key={i.node.id}
            />
          );
        })}
      </div>
      <div className={style.product_info}>
        <p className={style.name}>{data.title}</p>
        <p className={style.price}>
          ${" "}
          <bdi className="price">
            {formatPrice(parseInt(data.priceRange.maxVariantPrice.amount))}
          </bdi>
        </p>
      </div>
    </Link>
  );
}