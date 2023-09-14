export default function domain(path) {
  return `https://api.debanz.com${path}`;
}

export const shipmentApiUrl = (path) => `https://api.shipnow.com.ar${path}`;

export const getShipmentPrice = async ({ zip_code, weight }) => {
  const response = await fetch(
    shipmentApiUrl(
      `/shipping_options?weight=${weight}&to_zip_code=${zip_code}&types=ship_pap`
    ),
    {
      headers: {
        Authorization: `Bearer ${process.env.SHIPNOWTOKEN}`,
      },
    }
  );
  const data = await response.json();
  return data.results[0];
};

export const getShippingData = async ({ id }) => {
  const response = await fetch(shipmentApiUrl(`/orders/${id}`), {
    headers: {
      Authorization: `Bearer ${process.env.SHIPNOWTOKEN}`,
    },
  });
  const data = await response.json();
  return data;
};
