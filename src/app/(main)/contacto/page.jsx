import { FacebookIcon, InstagramIcon } from '@/app/components/Icons';
import style from './contacto.module.css';

export default function page() {
  const socialMedia = [
    {
      url: "https://www.instagram.com/debanzba/",
      title: "Instagram",
      icon: <InstagramIcon bg="#000" width={30} height={30}/>
    },
    {
      url: "https://www.facebook.com/profile.php?id=100086655642017",
      title: "Facebook",
      icon: <FacebookIcon bg="#000" width={30} height={30}/>
    }
  ]

  return (
    <div className={style.container}>
      <Form />
      <OtherContacts mailto={'clientes@debanzba.com'} socialMedia={socialMedia}/>
    </div>
  )
}

const Form = () => {
  return (
    <form className={style.form}>
      <div className={style.row}>
        <input type="text" placeholder='Tu nombre'/>
        <input type="email" placeholder='Tu email'/>
      </div>
      <input type="tel" placeholder='Tu telefono (opcional)'/>
      <textarea name="" id="" cols="30" rows="10" placeholder='Tu mensaje'></textarea>
      <button type="submit" className={style.btn}>ENVIAR MENSAJE</button>
    </form>
  );
}

const OtherContacts = ({ mailto, socialMedia }) => {
  return (
    <div className={style.social}>
      <a className={style.mailto} href={`mailto:${mailto}`}>
        {mailto}
      </a>
      <div>
        {socialMedia.map(sMedia => {
          return (
            <a href={sMedia.url} target="_blank" className={style.social_items}>
              {sMedia.icon}
              <span>{sMedia.title}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}