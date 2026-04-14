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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const itemsPerPage = 5; // Adjust this value as needed

  useEffect(() => {
    const fetchTripRuns = async () => {
      const api_url = process.env.NEXT_PUBLIC_API_URL;
      setLoading(true);
      try {
        const res = await fetch(
          `${api_url}/api/trips/tripRuns?page=${currentPage}&limit=${itemsPerPage}`
        );
        const { data } = await res.json();
        
        setTripRuns(data.trips);
        setTotalPages(data.totalPages || Math.ceil(data.total / itemsPerPage));
        setTotalItems(data.total || data.trips.length);
      } catch (err) {
        console.error("Error fetching trip runs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTripRuns();
  }, [currentPage]); // Re-fetch when page changes

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) return <p>Loading daily trips...</p>;
  if (tripRuns.length === 0) return <p>No trips found for today.</p>;

  return (
    <div className="space-y-4">
      {/* Items info */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <p>Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} trips</p>
      </div>

      {/* Trip cards */}
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

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        
        <div className="flex items-center gap-2">
          {/* Page numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}