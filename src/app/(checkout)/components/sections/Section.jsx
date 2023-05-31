"use client";
import { useEffect, useState } from 'react';
import { useUserContext } from '@/app/context/UserContext';
import { toast } from 'sonner';  
import style from './sections.module.css';
import One from './One';
import Two from './Two';

export default function Section() {
  const { user, setCheckoutInfo, checkoutInfo } = useUserContext();
  const [section, setSection] = useState(0)
  const [info, setInfo] = useState({
    email: "",
    emailNotifications: false,
    name: "",
    surname: "",
    phone: "",
    direction: "",
    direction_number: "",
    department: "",
    city: "",
    province: "",
    zip_code: "",
    completed: false,
  })
  
  const sections = ['ENTREGA', 'PAGO']
  const renderSections = [
    <One setInfo={setInfo} info={info} />,
    <Two setInfo={setInfo} info={info} setSection={setSection}/>,
  ];

  useEffect(() => {
    if (user) {
      setInfo({
        ...info,
        email: user.email,
        surname: user.last_name,
        name: user.first_name,
      });
      if (checkoutInfo) {
        setInfo({ ...info, ...checkoutInfo });
      }
    }
  }, []);

  useEffect(() => {
    setCheckoutInfo(info)
  }, [info])

  return (
    <div className={style.container}>
      {/* <div className={style.nav}>
        {sections.map((i, index) => {
          if (index == sections.length - 1)
            return (
              <button
                className={section === index ? style.active : style.disabled}
                key={i}
                onClick={() => setSection(info.completed == true ? index : section)}
              >
                {i}
              </button>
            );
          return (
            <>
              <button
                className={section === index ? style.active : style.disabled}
                key={i}
                onClick={() => setSection(info.completed == true ? index : section)}
              >
                {i}
              </button>
              <span key={index}>-</span>
            </>
          );
        })}
      </div> */}
      {renderSections[section]}
      <div className={style.footer}>
        <button
          onClick={() =>{
            const max = sections.length - 1;

            if (section == 0) {
              if (info.email.length == 0) {
                setInfo({ ...info, completed: false });
                toast.error("Completa todos los campos");
              } 
              else if (info.name.length == 0) toast.error('Completa todos los campos')
              else if (info.surname.length == 0) toast.error('Completa todos los campos')
              else if (info.phone.length == 0) toast.error('Completa todos los campos')
              else if (info.direction.length == 0) toast.error('Completa todos los campos')
              else if (info.direction_number.length == 0) toast.error('Completa todos los campos')
              else if (info.city.length == 0) toast.error('Completa todos los campos')
              else if (info.province.length == 0) toast.error('Completa todos los campos')
              else if (info.zip_code.length == 0) toast.error('Completa todos los campos')
              else setInfo({...info, completed: true});
              setCheckoutInfo(info);
            }
            
            if (info.completed == true) {
              if (max > section)
                return setSection((prevStatus) => prevStatus + 1);
              else return console.log("paying");
            }
          }}
          className={style.continue_btn}
        >
          CONTINUAR
        </button>
      </div>
    </div>
  );
}
