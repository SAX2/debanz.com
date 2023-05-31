import dynamic from 'next/dynamic';
import Toast from './Toast';
import Footer from './components/footer/Footer';
import Outstanding from './components/outstanding/Outstanding';
import Announce from './components/announces/Announce';
const Navbar = dynamic(() => import('./components/navbar/Navbar'), { ssr: false });

export default function layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Outstanding />
      <Footer />
      <Announce desc="DEBANZ"/>
      <Toast />
    </>
  );
}
