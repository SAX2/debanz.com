import { CartContextProvider } from './context/CartContext';
import UserContextProvider from './context/UserContext';
import './globals.css';

export const metadata = {
  title: 'Debanz',
  description: 'debanzba.com',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
      </head>
      <body>
        <CartContextProvider>
          <UserContextProvider>{children}</UserContextProvider>
        </CartContextProvider>
      </body>
    </html>
  );
}
