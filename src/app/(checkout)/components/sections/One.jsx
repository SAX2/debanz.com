"use client";
import { InfoIcon } from '@/app/components/Icons';
import { useUserContext } from '@/app/context/UserContext';
import { useEffect, useState } from 'react';
import style from './sections.module.css';
import provinces from '../../../data/ProvinciasArgentina.json';

const ProvincesSelector = ({ info, setInfo }) => {
  const [value, setValue] = useState(info.province)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setInfo({ ...info, province: value })
  }, [value])

  useEffect(() => {
    setValue(info.province)
  }, [])

  return (
    <>
      <div
        className={style.select}
        onClick={() => setOpen((prevState) => !prevState)}
      >
        {value.length == 0 ? <span>Provincia</span> : value}
      </div>
      <div className={open ? style.main : style.hidden}>
        {provinces.data.map((p) => {
          return (
            <div
              onClick={() => {
                setValue(p.name);
                setOpen(false);
              }}
              key={p.code_2_digits}
              className={style.link}
            >
              <span>{p.name}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function One({ setInfo, info }) {
  const { user } = useUserContext();

  return (
    <div className={style.sections_container}>
      <div className={style.section}>
        <h1>DATOS DEL DESTINATARIO</h1>
        <div className={style.subsection_container}>
          <input
            type="email"
            placeholder="Correo Electronico"
            className={style.input_simple}
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
            value={user.email ? user.email : info.email}
            disabled={user.email ? true : false}
          />
          <label className={style.checkbox_container}>
            <input
              type="checkbox"
              name=""
              id=""
              className={style.checkbox}
              onChange={(e) =>
                setInfo({ ...info, emailNotifications: e.target.checked })
              }
              checked={info.emailNotifications}
            />
            Quiero recibir ofertas y novedades por email
          </label>
        </div>
        <div className={style.subsection_container}>
          <div className={style.subsection_row}>
            <input
              type="text"
              placeholder="Nombre"
              className={style.input_simple}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
              value={user.first_name ? user.first_name : info.name}
              disabled={user.first_name ? true : false}
            />
            <input
              type="text"
              placeholder="Apellido"
              className={style.input_simple}
              onChange={(e) => setInfo({ ...info, surname: e.target.value })}
              value={user.last_name ? user.last_name : info.surname}
              disabled={user.last_name ? true : false}
            />
          </div>
          <div className={style.subsection_row}>
            <div className={style.number_input}>
              <span>+54</span>
            </div>
            <input
              type="tel"
              placeholder="Telefono"
              className={style.input_simple}
              onChange={(e) => setInfo({ ...info, phone: e.target.value })}
              value={info.phone}
            />
          </div>
        </div>
      </div>
      <div className={style.section}>
        <h1>DOMICILIO DEL DESTINATARIO</h1>
        <div className={style.subsection_container}>
          <input
            type="text"
            placeholder="Calle"
            className={style.input_simple}
            onChange={(e) => setInfo({ ...info, direction: e.target.value })}
            value={info.direction}
          />
          <div className={style.subsection_row}>
            <input
              type="text"
              placeholder="Número"
              className={style.input_simple}
              onChange={(e) =>
                setInfo({ ...info, direction_number: e.target.value })
              }
              value={info.direction_number}
            />
            <input
              type="text"
              placeholder="Departamento (opc.)"
              className={style.input_simple}
              onChange={(e) => setInfo({ ...info, department: e.target.value })}
              value={info.department}
            />
          </div>
          <input
            type="text"
            placeholder="Ciudad"
            className={style.input_simple}
            onChange={(e) => setInfo({ ...info, city: e.target.value })}
            value={info.city}
          />
          <div className={style.subsection_row}>
            <ProvincesSelector setInfo={setInfo} info={info}/>
            <div style={{ width: "200px" }}>
              <input
                type="text"
                placeholder="Codigo Postal"
                className={style.input_simple}
                onChange={(e) => setInfo({ ...info, zip_code: e.target.value })}
                value={info.zip_code}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
