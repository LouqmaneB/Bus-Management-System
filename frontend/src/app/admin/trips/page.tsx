"use client";
import MapComponent from "@/components/map/MapsComponent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Route() {
  const START_TIME = "08:00:00";
  const END_TIME = "23:59:59";
  const [formData, setFormData] = useState({
    bus: "",
    route: "",
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .slice(0, 10),
    daysOfTheWeek: [1],
    startTime: START_TIME,
    endTime: END_TIME,
    status: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    setFormData({
      bus: "",
      route: "",
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .slice(0, 10),
      daysOfTheWeek: [],
      startTime: START_TIME,
      endTime: END_TIME,
      status: "",
    });
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleDayToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    setFormData((prev) => {
      const days = prev.daysOfTheWeek.includes(value)
        ? prev.daysOfTheWeek.filter((d) => d !== value)
        : [...prev.daysOfTheWeek, value];

      return {
        ...prev,
        daysOfTheWeek: days,
      };
    });
  };

  return (
    <div className="container py-8 m-auto">
      <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
        Trips management
      </h1>
      <p className="mt-2 text-muted-foreground">Link a bus to a route</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Bus */}
              <div className="space-y-2">
                <label htmlFor="bus">Bus</label>
                <Input
                  id="bus"
                  name="bus"
                  list="busList"
                  placeholder="Select bus"
                  value={formData.bus}
                  onChange={handleChange}
                  required
                />
                <datalist id="busList">
                  {/* example */}
                  <option value="Bus 12" />
                  <option value="Bus 18" />
                </datalist>
              </div>

              {/* Route */}
              <div className="space-y-2">
                <label htmlFor="route">Route</label>
                <Input
                  id="route"
                  name="route"
                  list="routeList"
                  placeholder="Select route"
                  value={formData.route}
                  onChange={handleChange}
                  required
                />
                <datalist id="routeList">
                  {/* example */}
                  <option value="Route A" />
                  <option value="Route B" />
                </datalist>
              </div>

              {/* Service Date */}
              <div className="space-y-2">
                <label htmlFor="startDate">Start Date</label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="endDate">End Date</label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2 border px-3 py-2 rounded-md">
                <label>Days</label>
                {/* Select All */}
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

                {/* Individual Days */}
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
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm cursor-pointer"
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
              {/* <DateRangePicker
                value={value}
                onChange={(newValue) => setValue(newValue)}
              /> */}

              {/* Start Time */}
              <div className="space-y-2">
                <label htmlFor="startTime">Start Time</label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
                {/*<TimeField
                  label="Format without meridiem"
                  defaultValue={dayjs("2022-04-17T15:30")}
                  format="HH:mm"
                />*/}
              </div>

              {/* End Time */}
              <div className="space-y-2">
                <label htmlFor="endTime">End Time</label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <Button type="submit" className="w-full">
                Create Trip
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available routes</CardTitle>
            <CardDescription>Find route on the map</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full overflow-hidden rounded-md border bg-muted">
              <MapComponent />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
