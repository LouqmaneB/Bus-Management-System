"use client";
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

export default function Vehicule() {
  const [formData, setFormData] = useState({
    plateNumber: "",
    capacity: "",
    driver: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {};

  return (
    <div className="container py-8 m-auto">
      <h1 className="text-3xl mb-7 font-bold tracking-tighter md:text-4xl">
        Buses management
      </h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <Card>
          <CardContent className="h-full">
            <form
              onSubmit={handleSubmit}
              className="h-full space-y-4 flex flex-col justify-around"
            >
              <div className="flex flex-col gap-9">
                <div className="space-y-2">
                  <label htmlFor="plateNumber">Plate Number</label>
                  <Input
                    className="h-10"
                    id="plateNumber"
                    name="plateNumber"
                    placeholder="Enter plate number"
                    value={formData.plateNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="capacity">Capacity</label>
                  <Input
                    className="h-10"
                    id="capacity"
                    name="capacity"
                    type="number"
                    min={1}
                    step={1}
                    placeholder="Enter bus capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="driver">Driver</label>
                  <Input
                    className="h-10"
                    id="driver"
                    name="driver"
                    list="driverList"
                    placeholder="Select driver"
                    value={formData.driver}
                    onChange={handleChange}
                  />
                  <datalist id="driverList">
                    <option value="John Doe" />
                    <option value="Jane Smith" />
                  </datalist>
                </div>
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  variant="default"
                  className="h-10"
                >
                  Add Bus
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Buses</CardTitle>
            <CardDescription>All existing buses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full overflow-hidden rounded-md border bg-muted">
              {/* availabe bussss here */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
