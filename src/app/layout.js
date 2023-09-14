import { CartContextProvider } from './context/CartContext';
import BagContextProvider from './context/BagContext';
import UserContextProvider from './context/UserContext';
import { Inter } from 'next/font/google'
import './globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Debanz | Explora la moda sin límites.',
  description: "Debanz - Marca de ropa en Argentina. Envíos a todo el país. Descubre nuestras exclusivas remeras del drop 'Collpase'. Estilo y calidad unidos en cada prenda.",
  keywords: "Debanz, ropa, marca, Argentina, remeras, Collpase, moda, envíos",
  author: "Debanz",
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow"
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </head>
      <body className={inter.className}>
        <CartContextProvider>
          <UserContextProvider>
            <BagContextProvider>{children}</BagContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      </body>
    </html>
  );
}
