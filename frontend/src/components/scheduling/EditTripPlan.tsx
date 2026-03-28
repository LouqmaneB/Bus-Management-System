"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import MapComponent from "@/components/map/MapsComponent";
import { useMemo, useState } from "react";
import { Trip } from "@/types";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function EditTripPlan({ trip }: { trip: Trip }) {
  const routeCoordinates = useMemo(
    // To avoid rerender of map (reaching minute's rate limit)
    () => ({
      route: trip.route.stops.map((stop) => stop.stopId.location.coordinates),
      color: trip.route.routeColor,
    }),
    [trip],
  );

  const [formData, setFormData] = useState({
    busId: trip.bus?._id || "",
    plateNumber: trip.bus?.plateNumber || "",
    routeId: trip.route?._id || "",
    routeName: trip.route?.routeName || "",
    startDate: trip.serviceDate
      ? new Date(trip.serviceDate).toISOString().slice(0, 10)
      : "",
    serviceStartTime: trip.startTime || "08:00",
    serviceEndTime: trip.endTime || "23:59",
    tripDurationMinutes: trip.tripDurationMinutes || 75,
    breakMinutes: trip.breakMinutes || 15,
    status: trip.status || "planned",
  });

  const buildPayload = () => ({
    bus: formData.busId,
    route: formData.routeId,
    serviceDate: formData.startDate,
    startTime: formData.serviceStartTime,
    endTime: formData.serviceEndTime,
    tripDurationMinutes: formData.tripDurationMinutes,
    breakMinutes: formData.breakMinutes,
    status: formData.status,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "tripDurationMinutes" || name === "breakMinutes"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = buildPayload();
    try {
      const res = await fetch(`/api/trip/${trip._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update trip");
      alert("Trip updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating trip");
    }
  };

  return (
    <div className="p-2">
      <Link href={`/admin/trips`}>
      <Button variant={"outline"}><MoveLeft/> Back to Trips</Button>
      </Link>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Edit Trip Plan</CardTitle>
            <CardDescription>Update your trip schedule</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Bus */}
              <div className="space-y-2">
                <label>Bus</label>
                <Input
                  list="bus"
                  name="plateNumber"
                  placeholder="Bus number"
                  value={formData.plateNumber}
                  onChange={handleChange}
                />
                <datalist id="bus">
                  <option value="hi"></option>
                </datalist>
              </div>

              {/* Route */}
              <div className="space-y-2">
                <label>Route</label>
                <Input
                  name="routeName"
                  placeholder="Route name"
                  value={formData.routeName}
                  readOnly
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Service Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    readOnly
                  />
                </div>
              </div>

              {/* Service Times */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Service Start</label>
                  <Input
                    type="time"
                    name="serviceStartTime"
                    value={formData.serviceStartTime}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Service End</label>
                  <Input
                    type="time"
                    name="serviceEndTime"
                    value={formData.serviceEndTime}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Trip Duration / Break */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Trip Duration (min)</label>
                  <Input
                    type="number"
                    name="tripDurationMinutes"
                    value={formData.tripDurationMinutes}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Break Between Trips (min)</label>
                  <Input
                    type="number"
                    name="breakMinutes"
                    value={formData.breakMinutes}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-md border px-3 py-2"
                >
                  <option value="planned">Planned</option>
                  <option value="active">Active</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <Button type="submit" className="w-full">
                Update Trip
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Route Preview</CardTitle>
            <CardDescription>Verify route before scheduling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-md border overflow-hidden">
              <MapComponent routes={[routeCoordinates]} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
