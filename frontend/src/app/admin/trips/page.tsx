"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateTripForm, TripPlansList, TripRunsList } from "@/components/scheduling";

export default function SchedulingManagement() {
  const [selectedTab, setSelectedTab] = useState<"add" | "show" | "tripRun">(
    "show",
  );
  return (
    <div className="container py-8 mx-auto">
      <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
        Scheduling Management
      </h1>
      <p className="mt-2 text-muted-foreground">
        Create a service schedule that generates daily trips
      </p>

      <Tabs value={selectedTab}>
        <TabsList className="w-full">
          <TabsTrigger
            value="add"
            className="flex-1"
            onClick={() => setSelectedTab("add")}
          >
            Add trip
          </TabsTrigger>
          <TabsTrigger
            value="show"
            className="flex-1"
            onClick={() => setSelectedTab("show")}
          >
            Trips plan
          </TabsTrigger>
          <TabsTrigger
            value="tripRun"
            className="flex-1"
            onClick={() => setSelectedTab("tripRun")}
          >
            Daily trips
          </TabsTrigger>
        </TabsList>
        <TabsContent value="add" className="mt-4">
          <CreateTripForm />
        </TabsContent>
        <TabsContent value="show" className="mt-4">
          <TripPlansList />
        </TabsContent>
        <TabsContent value="tripRun" className="mt-4">
          <TripRunsList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
