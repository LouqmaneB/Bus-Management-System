"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Navigation, Route, Network } from "lucide-react";
import { Route as typeRoute } from "@/types";

export default function Home() {
  const [popularRoutes, setPopularRoutes] = useState<typeRoute[]>([]);
  useEffect(() => {
    const fetchPopularRoutes = async () => {
      const api_url = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${api_url}/api/routes/popular`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const routes: typeRoute[] = data.data;
      setPopularRoutes(routes);
      console.log(routes)
    };
    fetchPopularRoutes().catch((error) =>
      console.error("Error fetching routes:", error)
    );
  }, []);

  return (
    <>
      <section className="relative h-150 w-full overflow-hidden justify-center flex">
        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/50 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-bottom"
          style={{ backgroundImage: "url('/bus.webp')" }}
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center text-white">
          {" "}
          {/** */}
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Navigate Your City with Ease
          </h1>
          <p className="mt-4 max-w-175 text-lg text-white/90">
            Real-time updates, route planning, and comprehensive network
            information for your daily commute.
          </p>
          <div className="mt-8 w-full max-w-md">
            <div className="mt-4 flex gap-4 justify-center">
              <Button size="lg" variant={"default"} className="gap-2">
                <Link href="/search">Search</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 text-white border-white/40 hover:bg-white/30 hover:text-white"
              >
                <Link href="/routes">View All Routes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="container py-12 md:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="relative flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 ">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Navigation className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Real-time Tracking</h3>
            <p className="mt-2 text-muted-foreground">
              Know exactly where your bus is and when it will arrive at your
              stop.
            </p>
          </div>

          <div className="relative flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 ">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Route className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Route Planning</h3>
            <p className="mt-2 text-muted-foreground">
              Find the fastest route to your destination with our advanced
              planning tools.
            </p>
          </div>

          <div className="relative flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 ">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Network className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Network Information</h3>
            <p className="mt-2 text-muted-foreground">
              Access comprehensive information about our entire transport
              network.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-muted py-12 md:py-24 px-5 mb-5">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-8 text-center">
            Popular Routes
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularRoutes.map((route) => (
              <div
                key={route._id}
                className={`group rounded-lg border bg-background p-4 transition-all hover:shadow-md`}
              >
                <div className="flex items-center justify-between w-65">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white font-bold">
                      n/a
                    </div>
                    <h3 className="font-semibold">{route.routeName}</h3>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Every 10 min
                  </span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>
                    {route.stops[0]?.stopId.stop_name || "-"} →{" "}
                    {route.stops[route.stops.length - 1]?.stopId.stop_name || "-"}
                  </p>
                </div>
                <div className="mt-4  flex justify-between">
                  <span className=" text-sm">
                    First: {route?.operatingHours?.start || "n/a"}
                  </span>
                  <span className="text-sm">
                    Last: {route?.operatingHours?.end || "n/a"}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant={"outline"}>
              <Link href="/routes">View All Routes</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
