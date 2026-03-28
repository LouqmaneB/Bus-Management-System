"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Trip } from "@/types";

export default function TripPlansList() {
  const [tripPlans, setTripPlans] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const fetchTripPlans = async () => {
      try {
        const res = await fetch(`${api_url}/api/trips/tripPlans`);
        const { data } = await res.json();
        setTripPlans(data.tripPlans);
      } catch (err) {
        console.error("Error fetching trip plans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTripPlans();
  }, []);

  const deleteTrip = async (id: string) => {
    try {
      await fetch(`/api/trip/${id}`, {
        method: "DELETE",
      });
      setTripPlans(tripPlans.filter((plan) => plan._id !== id));
    } catch (err) {
      console.error("Error deleting trip:", err);
    }
  };

  if (loading) return <p>Loading trip plans...</p>;
  if (tripPlans.length === 0) return <p>No trip plans found.</p>;

  return (
    <div className="space-y-4">
      {tripPlans.map((plan) => (
        <Card key={plan._id}>
          <CardHeader>
            <CardTitle>
              {plan.route.routeName} - {plan.bus.plateNumber}
            </CardTitle>
            <CardDescription>
              {new Date(plan.serviceDate).toLocaleDateString()} |{" "}
              {plan.startTime} - {plan.endTime}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="space-y-1">
              <p>Trip Duration: {plan.tripDurationMinutes} min</p>
              <p>Break Between Trips: {plan.breakMinutes} min</p>
              <p>Status: {plan.status}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/trips/${plan._id}`}>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteTrip(plan._id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
