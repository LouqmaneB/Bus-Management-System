import EditTripPlan from "@/components/scheduling/EditTripPlan";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ unwrap the promise

  const res = await fetch(`http://localhost:3001/api/trip/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch trip");
  }

  const { data } = await res.json();
  console.log(data)

  return <EditTripPlan trip={data.tripPlan} />;
}
