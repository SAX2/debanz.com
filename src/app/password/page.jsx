"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { ArrowIcon, DebanzLogo } from '../components/Icons'
import style from './password.module.css';

export default function page() {
  const [password, setPassword] = useState("");
  const [onLoad, setOnLoad] = useState(false);
  const router = useRouter()
  const supabase = createClientComponentClient()

  const onPasswordSubmit = async (e) => {
    e.preventDefault();

    await supabase.auth.signInWithPassword({
      email: "santinodegra73@gmail.com",
      password,
    });
    router.refresh();
    return setOnLoad(false);
  }

  return (
    <main className={style.container}>
      <div className={style.subcontainer}>
        <a href="https://www.instagram.com/debanzba/" target="_blank">
          <DebanzLogo bg={"#000"} width={400} heigth={96.3} />
        </a>
        <form
          className={style.input}
          onSubmit={(e) => {
            setOnLoad(true);
            onPasswordSubmit(e);
          }}
        >
          <div>
            <input
              type="text"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">
              {onLoad ? "..." : <ArrowIcon bg={"#999"} />}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
