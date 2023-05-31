"use client";

import React from 'react'

export default function Form() {
  return (
    <form
      action="POST"
      onSubmit={async (e) => {
        e.preventDefault();
        await fetch(domain(`/images/upload`), { method: 'POST',  });
      }}
    >
      <input type="file" name="" id="" />
    </form>
  );
}
