"use state";
import { MinusIcon, PlusIcon } from '@/app/components/Icons';
import { useState } from 'react';
import style from './accordion.module.css';
import Link from 'next/link';

const Item = ({ title, content, link, id, setIsOpen, isOpen }) => {
  
  return (
    <>
      <div className="separator"></div>
      <div className={style.item}>
        <div
          className={style.item_head}
          onClick={() => setIsOpen((prevState) => (prevState == id ? -1 : id))}
        >
          <p>{title}</p>
          {isOpen == id ? (
            <MinusIcon bg="#000" heigth={14} width={14} />
          ) : (
            <PlusIcon bg="#000" heigth={14} width={14} />
          )}
        </div>
        <div
          className={`${style.item_body} ${isOpen == id ? style.on : style.off}`}
        >
          <div className={style.inner}>
            <p>
              {content} {link && link}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Accordion({ desc }) {
  const [isOpen, setIsOpen] = useState(-1)

  return (
    <div className={style.container}>
      <Item
        id={1} 
        title="Descripción" 
        content={desc} 
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <Item
        id={2}
        title="Envíos"
        content="Envios a todo el pais a travez de Shipnow."
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <Item
        id={3}
        title="Cambios y Devoluciones"
        content="Si no estás satisfecho/a con nuestro producto, ofrecemos devoluciones o cambios dentro de los 15 días posteriores a la compra. Para solicitarlo, comunícate con nosotros para coordinar la logística. El producto debe estar en el mismo estado en el que fue entregado y con la etiqueta original en buen estado. Para mas infomacion clickea"
        link={<Link href={'/devoluciones-cambios'}>aqui.</Link>}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <div className="separator"></div>
    </div>
  );
}
