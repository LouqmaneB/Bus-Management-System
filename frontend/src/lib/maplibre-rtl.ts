import maplibregl from "maplibre-gl";

let rtlPluginLoaded = false;

export function loadRTLPlugin() {
  if (!rtlPluginLoaded) {
    maplibregl.setRTLTextPlugin(
      "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.js",
      true
    );
    rtlPluginLoaded = true;
  }
}
