"use client";
import MapsComponent, { type LngLat } from "@/components/map/MapsComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapWithFullscreen } from "@/components/ui/MapWithFullscreen";

type routeProps = {
  color: string;
  route: LngLat[];
}[];

export default function Live() {
  // coordinates to be fetched; data for testing
  const coordinates: routeProps = [
    {
      color: "#ff5300",
      route: [
        [33.855943027629266, -5.507723093032837],
        [33.85595639212483, -5.514203310012817],
        [33.86248692540617, -5.520232915878297],
        [33.86844682613062, -5.525822639465333],
        [33.878860063498124, -5.532732009887696],
      ],
    },
  ];
  return (
    <div className="container w-full h-full rounded-lg">
      <Card className="order-2 lg:order-1">
        <CardHeader>
          <CardTitle>Route Map</CardTitle>
          <CardDescription>Live tracking of buses</CardDescription>
        </CardHeader>
        <CardContent>
          <MapWithFullscreen>
            <div className="aspect-video w-full h-full">
              <MapsComponent routes={coordinates} />
            </div>
          </MapWithFullscreen>
        </CardContent>
      </Card>
    </div>
  );
}
