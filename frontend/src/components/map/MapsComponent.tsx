"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export type LngLat = [number, number];
type LatLng = [number, number];

type MapComponentProps = {
  coordinates?: LngLat[];
};

const MAP_STYLE = "/api/route/style";

// Flip coordinates from [lng, lat] to [lat, lng]
/**
 * - Data is set in Flask app like [lng, lat] cause of leaflet and how its work,
 * - differntly in maplibre that use [lat, lng]
 * @returns [lat, lng]
 */
function flipCoordinates(coords?: LatLng[]): LngLat[] {
  if (!coords) return [];
  return coords.map(([lng, lat]) => [lat, lng]);
}

export default function MapComponent({ coordinates }: MapComponentProps) {
  coordinates = flipCoordinates(coordinates);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLE,
      center: [-5.561056, 33.859044],
      zoom: 12,
      scrollZoom: false,
      maxBounds: [
        [-5.62397, 33.74689],
        [-5.34759, 33.94706],
      ],
    });

    mapRef.current.addControl(new maplibregl.NavigationControl());
    mapRef.current.addControl(new maplibregl.ScaleControl());

    mapRef.current.on("load", () => {
      console.log("map loaded");
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || coordinates.length === 0) return;

    const map = mapRef.current;

    const loadRoute = async () => {
      const response = await fetch("/api/route/ors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coordinates }),
      });

      if (!response.ok) return;

      const geojson = await response.json();

      if (map.getLayer("busRouteLine")) map.removeLayer("busRouteLine");
      if (map.getSource("busRoute")) map.removeSource("busRoute");

      map.addSource("busRoute", {
        type: "geojson",
        data: geojson,
      });

      map.addLayer({
        id: "busRouteLine",
        type: "line",
        source: "busRoute",
        paint: {
          "line-color": "#00bfff",
          "line-width": 5,
          "line-opacity": 0.8,
        },
      });

      coordinates.forEach((coord, index) => {
        const marker = document.createElement("div");
        marker.className = "bus-marker";
        marker.style.width = "18px";
        marker.style.height = "18px";
        marker.style.background = "#00bfff";
        marker.style.borderRadius = "50%";
        marker.style.border = "2px solid #fff";
        marker.style.boxShadow = "0 0 4px #333";

        new maplibregl.Marker({
          element: marker,
        })
          .setLngLat(coord)
          .setPopup(
            new maplibregl.Popup().setHTML(`
        <h3>Stop ${index + 1}</h3>
        <p>Next bus: ${Math.floor(Math.random() * 10) + 1} mins</p>
          `)
          )
          .addTo(map);
      });

      map.on("click", "busRouteLine", () => {
        console.log("route clicked");
      });

      const routeCoords = geojson.features[0].geometry.coordinates;

      const bounds = routeCoords.reduce(
        (b: maplibregl.LngLatBounds, c: maplibregl.LngLatLike) => b.extend(c),
        new maplibregl.LngLatBounds(routeCoords[0], routeCoords[0])
      );

      map.fitBounds(bounds, { padding: 50 });
      const start = routeCoords[0];
      const end = routeCoords[routeCoords.length - 1];

      new maplibregl.Marker({ color: "blue" }).setLngLat(start).addTo(map);
      new maplibregl.Marker({ color: "red" }).setLngLat(end).addTo(map);
    };

    if (!map.isStyleLoaded()) {
      map.once("load", loadRoute);
    } else {
      loadRoute();
    }
  }, [coordinates]);

  return <div ref={mapContainerRef} className="w-full h-full rounded-lg" />;
}
