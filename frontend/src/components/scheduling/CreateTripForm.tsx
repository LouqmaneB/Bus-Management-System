import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { useState, useEffect } from "react";
import MapComponent from "../map/MapsComponent";
import { Bus, Route } from "@/types";

export default function CreateTripForm() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await fetch("/api/buses");
        if (res.ok) {
          const { data } = await res.json();
          setBuses(data);
        }
      } catch (error) {
        console.error("Failed to fetch buses:", error);
      }
    };
    const fetchRoutes = async () => {
      try {
        const res = await fetch("/api/routes");
        if (res.ok) {
          const { data } = await res.json();
          setRoutes(data);
        }
      } catch (error) {
        console.error("Failed to fetch buses:", error);
      }
    };
    fetchBuses();
    fetchRoutes();
  }, []);

  const handleBusChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedName = e.target.value;

    const selectedBus = buses.find(
      (bus: Bus) => bus.plateNumber === selectedName,
    );

    setFormData({
      ...formData,
      bus: selectedBus ? selectedBus._id : "",
    });
  };
  const handleRouteChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedName = e.target.value;

    const selectedRoute = routes.find(
      (route: Route) => route.routeName === selectedName,
    );

    setFormData({
      ...formData,
      route: selectedRoute ? selectedRoute._id : "",
    });
  };

  const [formData, setFormData] = useState({
    route: "",
    bus: "",
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .slice(0, 10),
    daysOfTheWeek: [1],
    serviceStartTime: "08:00",
    serviceEndTime: "23:59",
    tripDurationMinutes: 75,
    breakMinutes: 15,
    status: "planned",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setFormData((prev) => ({
      ...prev,
      daysOfTheWeek: prev.daysOfTheWeek.includes(value)
        ? prev.daysOfTheWeek.filter((d) => d !== value)
        : [...prev.daysOfTheWeek, value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/trips/tripPlans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create schedule");
      }

      const data = await res.json();
      console.log("Schedule created:", data);

      //reset form / show toast(coming)
      setFormData({
        route: "",
        bus: "",
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
          .toISOString()
          .slice(0, 10),
        daysOfTheWeek: [1],
        serviceStartTime: "08:00",
        serviceEndTime: "23:59",
        tripDurationMinutes: 75,
        breakMinutes: 15,
        status: "planned",
      });
    } catch (error) {
      console.error("Create schedule error:", error);
    }
  };
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Create Schedule</CardTitle>
          <CardDescription>
            This will generate multiple trips automatically
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label>Bus</label>
              <Input
                name="bus"
                list="buses"
                placeholder="Select bus"
                autoComplete="off"
                onChange={handleBusChange}
              />

              <datalist id="buses">
                {buses.map((bus) => (
                  <option key={bus._id} value={bus.plateNumber} />
                ))}
              </datalist>
            </div>

            <div className="space-y-2">
              <label>Route</label>
              <Input
                name="route"
                list="routes"
                placeholder="Select route"
                autoComplete="off"
                onChange={handleRouteChange}
              />
              <datalist id="routes">
                {routes.map((route) => (
                  <option key={route._id} value={route.routeName} />
                ))}
              </datalist>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2 border rounded-md p-3">
              <label>Days of Operation</label>
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.daysOfTheWeek.length === 7}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      daysOfTheWeek: e.target.checked
                        ? [0, 1, 2, 3, 4, 5, 6]
                        : [],
                    }))
                  }
                  className="accent-indigo-600"
                />
                Select all days
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Mon", value: 1 },
                  { label: "Tue", value: 2 },
                  { label: "Wed", value: 3 },
                  { label: "Thu", value: 4 },
                  { label: "Fri", value: 5 },
                  { label: "Sat", value: 6 },
                  { label: "Sun", value: 0 },
                ].map((day) => (
                  <label
                    key={day.value}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      name="days"
                      value={day.value}
                      checked={formData.daysOfTheWeek.includes(day.value)}
                      onChange={handleDayToggle}
                      className="accent-indigo-600"
                    />
                    {day.label}
                  </label>
                ))}
              </div>
            </div>

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
              Create Schedule
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
            <MapComponent />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
