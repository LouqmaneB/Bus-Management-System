"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { loadRTLPlugin } from "@/lib/maplibre-rtl";
import "maplibre-gl/dist/maplibre-gl.css";

export type LngLat = [number, number];
type LatLng = [number, number];
type routeProps = {
  color: string;
  route: LngLat[];
};
type MapComponentProps = {
  routes?: routeProps[];
  onRouteClick?: (route: LatLng[]) => void;
};

const MAP_STYLE = "/api/route/style";

function flipCoordinates(coords?: LngLat[]): LatLng[] {
  if (!coords) return [];
  return coords.map(([lng, lat]) => [lat, lng]);
}

export default function MapComponent({
  routes = [],
  onRouteClick,
}: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    loadRTLPlugin();

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLE,
      center: [-5.561056, 33.859044],
      zoom: 12,
      scrollZoom: true,
      maxBounds: [
        [-5.62397, 33.74689],
        [-5.34759, 33.94706],
      ],
    });

    mapRef.current.addControl(new maplibregl.NavigationControl());
    mapRef.current.addControl(new maplibregl.ScaleControl());

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !routes) return;

    const map = mapRef.current;

    const loadRoutes = async () => {
      for (let j = 0; j < routes.length; j++) {
        const flippedRoutes = flipCoordinates(routes[j].route);

        for (let i = 0; i < flippedRoutes.length; i++) {
          const coords = flippedRoutes;

          const response = await fetch("/api/route/ors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ coordinates: coords }),
          });

          if (!response.ok) continue;

          const geojson = await response.json();
          const sourceId = `busRoute${i}`;
          const layerId = `busRouteLine${i}`;

          if (map?.getLayer(layerId)) map.removeLayer(layerId);
          if (map?.getSource(sourceId)) map.removeSource(sourceId);

          map.addSource(sourceId, { type: "geojson", data: geojson });
          map.addLayer({
            id: layerId,
            type: "line",
            source: sourceId,
            paint: {
              "line-color": routes[j].color,
              "line-width": 5,
              "line-opacity": .6,
            },
          });

          coords.forEach((coord: LngLat, index: number) => {
            const marker = document.createElement("div");
            marker.className = "bus-marker";
            new maplibregl.Marker({ element: marker })
              .setLngLat(coord)
              .setPopup(
                new maplibregl.Popup().setHTML(`
                <h3>Stop ${index + 1}</h3>
                <p>Next bus: ${Math.floor(Math.random() * 10) + 1} mins</p>
              `) /////////////////!!!!!!!!!!!!!!\\\\\\\\\\\\\\\\
              )
              .addTo(map);
          });

          map.on("click", layerId, () => {
            if (onRouteClick) onRouteClick(coords);
          });

          const routeCoords = geojson.features[0].geometry.coordinates;
          const bounds = routeCoords.reduce(
            (b: maplibregl.LngLatBounds, c: maplibregl.LngLatLike) =>
              b.extend(c),
            new maplibregl.LngLatBounds(routeCoords[0], routeCoords[0])
          );

          map.fitBounds(bounds, { padding: 50 });

          new maplibregl.Marker({ color: "blue" })
            .setLngLat(routeCoords[0])
            .addTo(map);
          new maplibregl.Marker({ color: "red" })
            .setLngLat(routeCoords[routeCoords.length - 1])
            .addTo(map);
        }
      }
    };

    if (!map.isStyleLoaded()) {
      map.once("load", loadRoutes);
    } else {
      loadRoutes();
    }
  }, [routes, onRouteClick]);

  return <div ref={mapContainerRef} className="w-full h-full rounded-lg" />;
}
