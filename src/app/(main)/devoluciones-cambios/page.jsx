import React from 'react';
import style from './page.module.css';
import Link from 'next/link';

export const metadata = {
  title: 'Devoluciones y Cambios | Debanz',
  description: "Obtén información sobre cómo realizar cambios y devoluciones de productos.",
}

export default function page() {
  return (
    <main className={style.main}>
      <div className={style.container}>
        <h1>Política de Cambios y Devoluciones</h1>

        <p>
          En Debanz, nos esforzamos por brindar a nuestros clientes la mejor
          experiencia de compra posible. Creemos en la calidad de nuestros
          productos y deseamos garantizar la satisfacción total de nuestros
          clientes. A continuación, se presenta nuestra política de cambios y
          devoluciones detallada:
        </p>

        <div className={style.group}>
          <h3>Cambios de productos:</h3>
          <ul>
            <li>
              Aceptamos cambios de productos dentro de los 15 días posteriores a
              la fecha de compra.
            </li>
            <li>
              El producto debe estar en su estado original, sin usar y sin
              daños. Debe tener todas las etiquetas y empaques originales.
            </li>
            <li>
              Los cambios están sujetos a la disponibilidad de stock. Si el
              producto deseado no está disponible, ofreceremos un reembolso o un
              crédito para futuras compras, según la preferencia del cliente.
            </li>
            <li>
              Los gastos de envío asociados con el cambio del producto correrán
              por cuenta del cliente, a menos que el cambio sea debido a un
              error parte nuestra.
            </li>
          </ul>
        </div>

        <div className={style.group}>
          <h3>Devoluciones de productos:</h3>
          <ul>
            <li>
              Aceptamos devoluciones de productos dentro de los 15 días
              posteriores a la fecha de compra.
            </li>
            <li>
              El producto debe estar en su estado original, sin usar y sin
              daños. Debe tener todas las etiquetas y empaques originales.
            </li>
            <li>
              Los reembolsos se realizarán utilizando el mismo método de pago
              utilizado en la compra original, a menos que se acuerde lo
              contrario.
            </li>
            <li>
              Los gastos de envío asociados con la devolución del producto
              correrán por cuenta del cliente, a menos que la devolución sea
              debido a un error por parte nuestra.
            </li>
          </ul>
        </div>

        <div className={style.group}>
          <h3>Productos no elegibles para cambios o devoluciones:</h3>
          <p>
            Los productos en oferta o liquidación no son elegibles para cambios
            ni devoluciones, a menos que estén defectuosos o dañados.
          </p>
        </div>

        <div className={style.group}>
          <h3>Proceso de cambios y devoluciones:</h3>
          <ul>
            <li>
              Para iniciar un cambio o devolución, el cliente debe comunicarse
              con nuestro servicio de{" "}
              <Link href={"/contacto"} className={style.link}>
                atención al cliente
              </Link>{" "}
              dentro del plazo establecido.
            </li>
            <li>
              El servicio de atención al cliente proporcionará instrucciones
              detalladas sobre cómo proceder con el cambio o la devolución.
            </li>
            <li>
              Es posible que se solicite al cliente que proporcione información
              adicional, como el número de pedido y fotografías del producto,
              para procesar la solicitud de cambio o devolución de manera más
              eficiente.
            </li>
          </ul>
        </div>

        <div className={style.group}>
          <h3>Revisión y aprobación de cambios y devoluciones:</h3>
          <ul>
            <li>
              Una vez que recibamos el producto devuelto, nuestro equipo de
              control de calidad lo inspeccionará para verificar si cumple con
              los requisitos mencionados anteriormente.
            </li>
            <li>
              Si la devolución o cambio cumple con nuestras políticas,
              procederemos con el reembolso, cambio o crédito correspondiente.
            </li>
            <li>
              Nos comprometemos a procesar las solicitudes de cambios y
              devoluciones en un plazo de 7 dias.
            </li>
          </ul>
        </div>

        <p>
          Nos preocupamos por la satisfacción de nuestros clientes y haremos
          todo lo posible para resolver cualquier problema relacionado con
          cambios y devoluciones de manera justa y eficiente. Apreciamos la
          confianza que depositas en nosotros al elegir nuestros productos y
          estamos aquí para brindarte un excelente servicio.
        </p>
      </div>
    </main>
  );
}