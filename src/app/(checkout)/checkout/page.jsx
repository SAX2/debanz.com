import React from 'react'
import Bag from '../components/bag/Bag'
import Section from '../components/sections/Section'
import style from './checkout.module.css';

export const metadata = {
  title: 'Debanz - Checkout',
  description: 'Checkout',
}

export default function page({ params }) {
  return (
    <main className={style.container}>
      <section className={style.section}>
        <Section />
      </section>
      <section className={style.section}>
        <Bag />
      </section>
    </main>
  );
}
