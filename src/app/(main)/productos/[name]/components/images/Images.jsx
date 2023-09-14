"use client";
import domain from "@/app/config";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";

export default function Images({ data, style }) {
  const [width, setWidth] = useState()

  useEffect(() => {
    if (window != "undefined") {
      const pageWidth = window.innerWidth;
      setWidth(pageWidth)
    }
  }, [])

  const settings = {
    infinite: true,
    speed: 250,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false
  };

  return (
    <>
      {width < 768 ? (
        <Slider {...settings}>
          {data.edges.map((i, index) => {
            return (
              <div className={style.image} key={index}>
                <Image
                  src={i.node.url}
                  width={1000}
                  height={1000}
                  quality={100}
                  placeholder="empty"
                  alt={i.node.altText}
                />
              </div>
            );
          })}
        </Slider>
      ) : (
        <>
          {data.edges.map((i, index) => {
            return (
              <div className={style.image} key={index}>
                <Image
                  src={i.node.url}
                  width={1000}
                  height={1000}
                  quality={100}
                  placeholder="empty"
                  alt={i.node.altText}
                />
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
