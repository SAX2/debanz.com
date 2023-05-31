import domain from "@/app/config";

const getPurchases = async (id) => {
  const res = await fetch(domain(`/users/purchases/${id}`));
  const data = await res.json();
  return data;
}

export default async function page({ params }) {
  const { id } = params;
  const purchases = getPurchases(id);
  console.log(purchases)

  return (
    <div></div>
  )
}
