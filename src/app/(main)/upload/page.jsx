"use client";
import domain from '@/app/config';
import React, { useState } from 'react'

export default function page() {
  const [image, setImage] = useState();
  const [resImage, setResImage] = useState();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("productImage", image);
        await fetch(domain("/images/upload"), {
          method: "POST",
          body: formData,
        });
      }}
    >
      <input
        type="file"
        name="productImage"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <input type="submit" value="SUBMIT" />
      <img src={resImage} />
    </form>
  );
}
