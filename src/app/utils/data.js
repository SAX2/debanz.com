const Products = [
  {
    id: "debanz-f40",
    title: "Debanz F40",
    description: "Ferrari F40 Inspiration",
    tags: [],
    priceRange: {
      minVariantPrice: {
        amount: 6500,
      },
    },
    images: {
      edges: [
        {
          node: {
            url: "https://debanz.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0842%2F1081%2F1185%2Ffiles%2FF40-500x500.png%3Fv%3D1697745480&w=640&q=75",
            altText: "Debanz F40",
          },
        },
        {
          node: {
            url: "https://debanz.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0842%2F1081%2F1185%2Ffiles%2FF40-500x500.png%3Fv%3D1697745480&w=640&q=75",
            altText: "Debanz F40",
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: "1",
            title: "S",
            currentlyNotInStock: false,
          },
        },
        {
          node: {
            id: "2",
            title: "M",
            currentlyNotInStock: false,
          },
        },
        {
          node: {
            id: "3",
            title: "L",
            currentlyNotInStock: true,
          },
        },
      ],
    },
  },
];

export default Products;
