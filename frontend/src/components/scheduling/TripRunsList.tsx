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
import { Trip } from "@/types";

type DriverShift = {
  driver: { name: string };
  startTime: string;
  endTime: string;
};

type TripRun = {
  _id: string;
  tripPlan: Trip;
  startTime: string;
  endTime: string;
  driverShifts: DriverShift[];
  status: "planned" | "active" | "completed" | "cancelled";
  delayMinutes: number;
};

export default function TripRunsList() {
  const [tripRuns, setTripRuns] = useState<TripRun[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTripRuns = async () => {
      const api_url = process.env.NEXT_PUBLIC_API_URL;
      try {
        const res = await fetch(`${api_url}/api/trips/tripRuns`);
        const {data} = await res.json();
        setTripRuns(data.trips);
      } catch (err) {
        console.error("Error fetching trip runs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTripRuns();
  }, []);

  if (loading) return <p>Loading daily trips...</p>;
  if (tripRuns.length === 0) return <p>No trips found for today.</p>;

  return (
    <div className="space-y-4">
      {tripRuns.map((trip) => (
        <Card key={trip._id}>
          <CardHeader>
            <CardTitle>
              {trip.tripPlan.route.routeName} - {trip.tripPlan.bus.plateNumber}
            </CardTitle>
            <CardDescription>
              {trip.startTime} - {trip.endTime} | {new Date(trip.tripPlan.serviceDate).toDateString()} | Status: {trip.status}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row md:justify-between gap-4">
            <div className="space-y-1">
              <p>Delay: {trip.delayMinutes} min</p>
              <p>Drivers:</p>
              <ul className="pl-4 list-disc">
                {trip.driverShifts.map((shift, i) => (
                  <li key={i}>
                    {shift.driver.name} ({shift.startTime} - {shift.endTime})
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                View Map
              </Button>
              <Button variant="destructive" size="sm">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
