"use client";
import domain from '@/app/config';
import style from '../../success.module.css';
import { useState } from 'react';
import { toast } from 'sonner';
import { LoaderButton } from '../../../../components/loader/Loader';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/app/context/UserContext';

export default function Form({ info }) {
  
  
  const [password, setPassword] = useState({ password: "", confirm: false });
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { setUser } = useUserContext();

  const handleClick = async () => {
    setIsLoading(true);
    if (password.confirm) {
      if (password.password.length < 7) {
        setIsLoading(false);
        return toast.error("La contraseña debe ser al menos de 7 digitos");
      }
      // setIsLoading(false)

      const res = await fetch(domain("/users/password"), {
        method: "PUT",
        body: JSON.stringify({ password: password.password, id: info.id }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status == 200) {
        setIsLoading(false);
        setUser(data.body)
        return router.push(`/panel/${data.body.userId}`);
      }
      if (data.status >= 400) {
        setIsLoading(false);
        return toast.error(data.message);
      }
    } else {
      setIsLoading(false)
      toast.error("Confirma tu contraseña");
    }
  }

  return (
    <div className={style.form}>
      <div className={style.email}>
        <p>{info.email}</p>
      </div>
      <p className={style.desc}>
        Crea una contraseña para acceder a tu panel de cliente, ahi podras ver
        el estado de tus compras
      </p>
      <div className={style.input_container}>
        <input
          type="password"
          onChange={(e) =>
            setPassword({ ...password, password: e.target.value })
          }
          className={style.input}
          placeholder="Crea una contraseña"
        />
        <input
          type="password"
          onChange={(e) =>
            setPassword(
              password.password == e.target.value
                ? { ...password, confirm: true }
                : { ...password, confirm: false }
            )
          }
          className={style.input}
          placeholder="Confirma tu contraseña"
        />
      </div>
      <button className={style.btn} onClick={() => handleClick()}>
        {isLoading ? <LoaderButton /> : "Continuar al panel"}
      </button>
    </div>
  );
}
