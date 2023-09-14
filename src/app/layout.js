import { CartContextProvider } from './context/CartContext';
import BagContextProvider from './context/BagContext';
import UserContextProvider from './context/UserContext';
import './globals.css';
import { storefront } from './utils';
import { shopifyApi } from '@shopify/shopify-api';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Debanz | Explora la moda sin límites.',
  description: "Debanz - Marca de ropa en Argentina. Envíos a todo el país. Descubre nuestras exclusivas remeras del drop 'Collpase'. Estilo y calidad unidos en cada prenda.",
  keywords: "Debanz, ropa, marca, Argentina, remeras, Collpase, moda, envíos",
  author: "Debanz",
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow"
}

export const getStaticProps = async () => {
  const gql = String.raw;
  const { data } = await storefront(gql`
    mutation CreateCart {
      cartCreate {
        cart {
          id
          createdAt
          updatedAt
          lines(first: 10) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
              }
            }
          }
          # The estimated total cost of all merchandise that the customer will pay at checkout.
          cost {
            totalAmount {
              amount
              currencyCode
            }
            # The estimated amount, before taxes and discounts, for the customer to pay at checkout.
            subtotalAmount {
              amount
              currencyCode
            }
            # The estimated tax amount for the customer to pay at checkout.
            totalTaxAmount {
              amount
              currencyCode
            }
            # The estimated duty amount for the customer to pay at checkout.
            totalDutyAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `);
  return { props: { cartId: data.cart.id } }
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
