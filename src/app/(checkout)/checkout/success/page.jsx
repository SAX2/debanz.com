"use client"
import { useUserContext } from '@/app/context/UserContext';
import { SuccessIcon } from '@/app/components/Icons';
import style from './success.module.css';
import domain from '@/app/config';
import Form from './components/form/Form';
import { Loader } from "../../components/loader/Loader";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCartContext } from '@/app/context/CartContext';
import Link from 'next/link';

export default function page({ searchParams }) {
  const { checkoutInfo, user } = useUserContext();
  const { cart } = useCartContext();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchInfo, setFetchInfo] = useState({});
  const router = useRouter();

  const info = {
    paymentId: searchParams.payment_id,
    user: {
      email: checkoutInfo.email,
      first_name: checkoutInfo.name,
      last_name: checkoutInfo.surname,
      phone: checkoutInfo.phone,
      emailNotifications: checkoutInfo.emailNotifications,
      address: {
        address_line_1: checkoutInfo.direction,
        address_number: checkoutInfo.direction_number,
        department: checkoutInfo.department,
        zip_code: checkoutInfo.zip_code,
        city: checkoutInfo.city,
        province: checkoutInfo.province,
      },
    },
  };

  useEffect(() => {
    setIsLoading(true);
    
    const RegisterPayment = async (info) => {
      if (info.paymentId) {
        const res = await fetch(domain("/payment/accepted"), {
          method: "POST",
          body: JSON.stringify(info),
          headers: { "Content-Type": "application/json" },
          next: {
            revalidate: 360
          }
        });
        const data = await res.json();
        console.log(data)
        if (data.status == 200) {
          setFetchInfo(data);
          return setIsLoading(false);
        }
        if (data.status == 409) {
          setFetchInfo(data);
          return setIsLoading(false);
        };
        if (data.status == 400 || data.status == 404) {
          setIsLoading(false);
          console.log(data);
          // return router.push("/checkout/error");
        }
      } else return router.back();
    }

    RegisterPayment(info);
  }, []);

  return (
    <div className={style.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={style.success}>
            <SuccessIcon width={20} height={20} bg="#42BA96" />
            <p>El pago ha sido realizado con exito.</p>
          </div>
          {fetchInfo.createPassword ? (
            <Form info={fetchInfo.body} />
          ) : (
            <div className={style.form}>
              <div className={style.email}>
                <p>{fetchInfo.body.email}</p>
              </div>
              <Link className={style.btn} href={`/panel/${user.id}`}>
                Ir a tu panel
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}