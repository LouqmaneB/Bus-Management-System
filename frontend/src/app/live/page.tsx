import MapsComponent, { type LngLat } from "@/components/map/MapsComponent";
export default function Live() {
  // coordinates to be fetched; data for testing
  const coordinates: LngLat[] = [
          [33.855943027629266, -5.507723093032837],
          [33.85595639212483, -5.514203310012817],
          [33.86248692540617, -5.520232915878297],
          [33.86844682613062, -5.525822639465333],
          [33.878860063498124, -5.532732009887696]
      ]
  return (
    <div className="w-full h-screen rounded-lg">
      <MapsComponent coordinates={coordinates} />
    </div>
  );
}
