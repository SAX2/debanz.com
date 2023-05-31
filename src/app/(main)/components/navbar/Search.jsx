"use client";
import { CloseIcon, SearchIcon } from '@/app/components/Icons';
import style from './navbar.module.css';
import Loader from '@/app/components/loader/Loader';
import { useState, useEffect } from 'react';
import domain from '@/app/config';
import Product from '../product/Product';

export default function Search({ setOpenSearch }) {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (search.length == 0) {
      setIsEmpty(false)
      setProducts([]);
    }
    
    const fetchData = async () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(async () => {
        if (search) {
          try {
            const response = await fetch(domain(`/products/search/${search}`));
            const data = await response.json();
            if (data.length == 0) setIsEmpty(true);
            else {
              setIsEmpty(false)
              setProducts([...data]);
            }
          } catch (error) {
            console.error(
              "Error al realizar la solicitud fetch después de 3 segundos:",
              error
            );
          }
        }
      }, 1500);
    };

    fetchData();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);


  return (
    <div className={style.s_container}>
      <div className={style.s_head_container}>
        <div>
          <p>BUSCAR</p>
          <button
            className={style.m_close_button}
            onClick={() => setOpenSearch((s) => !s)}
          >
            <CloseIcon bg="#000" width={20} heigth={20} />
          </button>
        </div>
        <div>
          <input
            type="text"
            className={style.input}
            placeholder="Buscar..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <Loader />
        </div>
      </div>
      <div className={style.s_body_container}>
        {products.length > 0 && search.length > 0 ? (
          <div className={style.s_product_list}>
            {products.map((p) => (
              <div key={p.id} onClick={() => setOpenSearch(false)} style={{ width: "100%" }}>
                <Product data={p} />
              </div>
            ))}
          </div>
        ) : (
          <p>
            {isEmpty && search.length > 1
              ? "No se han encontrado productos"
              : null}
          </p>
        )}
      </div>
    </div>
  );
}