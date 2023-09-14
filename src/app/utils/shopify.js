import { storefront } from ".";

const gql = String.raw;

export async function getSingleProduct({ productName }) {
  const getSingleProductQuery = gql`
    query SingleProduct($handle: String!) {
      product(handle: $handle) {
        title
        description
        updatedAt
        tags
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 2) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 3) {
          edges {
            node {
              id
              title
              currentlyNotInStock
            }
          }
        }
        totalInventory
      }
    }
  `;

  const variables = {
    handle: productName,
  };

  try {
    return await storefront(getSingleProductQuery, variables);
  } catch (error) {
    throw new Error(error);
  }
}

export async function addToCart(itemId, quantity) {
  const createCartMutation = gql`
  mutation createCart($cartInput: CartInput) {
    cartCreate(input: $cartInput) {
      cart {
        id
      }
    }
  }
`;

  const variables = {
    cartInput: {
      lines: [
        {
          quantity: parseInt(quantity),
          merchandiseId: itemId,
        },
      ],
    },
  };
  try {
    return await storefront(createCartMutation, variables);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateCart(cartId, itemId, quantity) {
  const updateCartMutation = gql`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
        }
      }
    }
  `;

  const variables = {
    cartId: cartId,
    lines: [
      {
        quantity: parseInt(quantity),
        merchandiseId: itemId,
      },
    ],
  };
  try {
   return await storefront(updateCartMutation, variables);
  } catch (error) {
    throw new Error(error);
  }
}

export async function retrieveCart(cartId) {
  const cartQuery = gql`
    query cartQuery($cartId: ID!) {
      cart(id: $cartId) {
        id
        createdAt
        updatedAt

        lines(first: 10) {
          edges {
            node {
              id
              quantity
              cost {
                totalAmount {
                  amount
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  image {
                    url
                  }
                  title
                  price {
                    amount
                  }
                  product {
                    title
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
        checkoutUrl
      }
    }
  `;

  const variables = {
    cartId,
  };
  try {
    const { data } = await storefront(cartQuery, variables);
    return data.cart;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateItemQuantityCart({ cartId, itemId, quantity }) {
  const cartQuery = gql`
    mutation UpdateQuantity($cartId: ID!, $itemId: ID!, $quantity: Int) {
      cartLinesUpdate(
        cartId: $cartId
        lines: { id: $itemId, quantity: $quantity }
      ) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount {
                    amount
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    image {
                      url
                    }
                    title
                    price {
                      amount
                    }
                    product {
                      title
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  const variables = {
    cartId,
    itemId,
    quantity
  };
  try {
    const { data } = await storefront(cartQuery, variables);
    return data.cartLinesUpdate.cart;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getTotalQuantityCart(cartId) {
  const getTotalQuantityCartQuery = gql`
    query cartTotalQuantityQuery($cartId: ID!) {
      cart(id: $cartId) {
        totalQuantity
      }
    }
  `;

  const variables = {
    cartId,
  };
  try {
    return await storefront(getTotalQuantityCartQuery, variables);
  } catch (error) {
    throw new Error(error);
  }
}

export const getCheckoutUrl = async (cartId) => {
  const getCheckoutUrlQuery = gql`
    query checkoutURL($cartId: ID!) {
      cart(id: $cartId) {
        checkoutUrl
      }
    }
  `;
  const variables = {
    cartId: cartId,
  };
  try {
    return await storefront(getCheckoutUrlQuery, variables);
  } catch (error) {
    throw new Error(error);
  }
};