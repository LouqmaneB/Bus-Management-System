"use client";
import MapsComponent, {
  LngLat /*{ type LngLat }*/,
} from "@/components/map/MapsComponent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Route } from "@/types";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

type routeProps = {
  color: string;
  route: LngLat[];
};

export default function Live() {
  const [selectedTab, setSelectedTab] = useState<"search" | "routes">("search");
  const [coordinates, setCoordinates] = useState<routeProps[]>([]);
  useEffect(() => {
    const fetchRoutes = async () => {
      const api_url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${api_url}/api/routes`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const routes: Route[] = data.data;
      const coordinatesByRoute = [];

      for (let routeIndex = 0; routeIndex < routes.length; routeIndex++) {
        const currentRoute = routes[routeIndex];
        const routeCoordinates = [];

        for (
          let stopIndex = 0;
          stopIndex < currentRoute.stops.length;
          stopIndex++
        ) {
          const stop = currentRoute.stops[stopIndex];
          routeCoordinates.push(stop.stopId.location.coordinates);
        }

        coordinatesByRoute.push({
          color: currentRoute.routeColor,
          route: routeCoordinates,
        });
      }

      setCoordinates(coordinatesByRoute);
    };
    fetchRoutes().catch((error) =>
      console.error("Error fetching routes:", error)
    );
  }, []);
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
        Route Search
      </h1>
      <p className="mt-2 text-muted-foreground">
        Find the best route for your journey
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_350px]">
        {/* Map Section */}
        <Card className="order-2 lg:order-1">
          <CardHeader>
            <CardTitle>Route Map</CardTitle>
            <CardDescription>
              Select a route or search for a journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
              <MapsComponent routes={coordinates} />
            </div>
          </CardContent>
        </Card>

        {/* Search and Route Info */}
        <div className="order-1 lg:order-2">
          <Tabs value={selectedTab}>
            <TabsList className="w-full">
              <TabsTrigger
                value="search"
                className="flex-1"
                onClick={() => setSelectedTab("search")}
              >
                Search
              </TabsTrigger>
              <TabsTrigger
                value="routes"
                className="flex-1"
                onClick={() => setSelectedTab("routes")}
              >
                Routes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="search" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Plan Your Journey</CardTitle>
                  <CardDescription>
                    Enter your departure and destination
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="from">From</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="from"
                        placeholder="Departure"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="to">To</label>
                    <div className="relative">
                      <Input
                        id="to"
                        placeholder="Destination (optional)"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button className="w-full">Find Routes</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="routes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Available Routes</CardTitle>
                  <CardDescription>
                    Select a route to view details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">available routes</div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
