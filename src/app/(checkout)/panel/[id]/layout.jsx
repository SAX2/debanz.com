import Navbar from './components/navbar/Navbar';
import style from './layout.module.css';

export default async function layout({ children, params }) {
  const { id } = params;

  return (
    <div className={style.container}>
      <Navbar id={id}/>
      {children}
    </div>
  )
}
