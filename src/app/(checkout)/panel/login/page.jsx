"use client";
import { useEffect, useState } from 'react';
import { Eye, EyeOff } from '@/app/components/Icons';
import { LoaderButton } from '../../components/loader/Loader';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import style from './login.module.css'
import domain from '@/app/config';
import { useUserContext } from '@/app/context/UserContext';

export default function page() {
  const [values, setValues] = useState({ email: "santinodegra73@gmail.com", password: "Santidegra2996" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const { setUser, user } = useUserContext();
  
  useEffect(() => {
    const checkUser = async () => {
      if (!user.id) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        if (!user.id) {
          router.push("/panel/login");
        }
      } else {
        try {
          const response = await fetch(domain("/users/"), {
            method: "POST",
            body: JSON.stringify({ token: user.token }),
            headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
            const data = await response.json();
            if (data) {
              router.push(`/panel/${data.id}/compras`);
            }
          } else {
            return router.push("/panel/login");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    checkUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const res = await fetch(domain("/users/login"), {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status == 200) {
      setIsLoading(false);
      setUser(data.data)
      return router.push(`/panel/${data.data.id}`);
    } 
    if (data.status >= 400) {
      setIsLoading(false);
      return toast.error(data.message);
    }
  }

  return (
    <form className={style.container} onSubmit={(e) => handleSubmit(e)}>
      <p>Bienvenido de nuevo!</p>
      <div className={style.subcontainer}>
        <div className={style.input_container}>
          <input
            type="email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
            placeholder="Email"
            value={values.email}
          />
        </div>
        <div className={style.input_container}>
          <input
            type={passwordVisible ? "text" : "password"}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
            placeholder="Contraseña"
            value={values.password}
          />
          <button
            type="button"
            className={style.show_pass_btn}
            onClick={() => setPasswordVisible((prevState) => !prevState)}
          >
            {passwordVisible ? (
              <EyeOff bg="#000" width={20} height={20} />
            ) : (
              <Eye bg="#000" width={20} height={20} />
            )}
          </button>
        </div>
        <button className={style.submit} type="submit">
          {isLoading ? <LoaderButton /> : "Iniciar Sesion"}
        </button>
      </div>
    </form>
  );
}
