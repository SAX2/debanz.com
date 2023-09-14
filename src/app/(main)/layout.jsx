import Toast from './Toast';
import Footer from './components/footer/Footer';
import Outstanding from './components/outstanding/Outstanding';
import Announce from './components/announces/Announce';
import CookiesCard from './components/cookies/CookiesCard';
import Divider from '../components/Divider';
import NavbarServer from './components/navbar/NavbarServer';

export default function layout({ children }) {
  return (
    <>
      <NavbarServer />
      <main>{children}</main>
      <Divider dark={false}/>
      <Footer />
      <CookiesCard />
      <Toast />
    </>
  );
}
