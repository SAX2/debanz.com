"use client"

import useFormatText from "@/app/hooks/useFormatText";
import Accordion from "../accordion/Accordion";

export function Price({ price }) {
  const { formatPrice } = useFormatText();

  return (
    <p>
      ${" "}
      <bdi className="price">
        {formatPrice(parseInt(price))}
      </bdi>
    </p>
  );
}

export const AccordionComponent = ({ desc }) => {
  return <Accordion desc={desc}/>
}