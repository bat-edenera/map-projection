// import Location from "./_location";

import Location from "@/components/Location";
import { map, tileLayer } from "leaflet";
import L from "leaflet";

import { useEffect, useState } from "react";
import app from "./store/app";
export default function Map() {
  const [mapReady, setMapReady] = useState(false);
  useEffect(() => {
    const lmap = map("map", {
      zoomControl: false,
      attributionControl: false,
      minZoom: 7,
      maxBounds: L.latLngBounds(L.latLng(28, 116), L.latLng(42, 128)),
      inertia: false,
    }).setView([36, 122], 6);
    tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    ).addTo(lmap);
    L.control.scale({ position: "bottomright", imperial: false }).addTo(lmap);
    L.control.zoom({ position: "bottomright" }).addTo(lmap);
    setMapReady(true);
    app.map = lmap;
    return () => {
      lmap.remove();
    };
  }, []);
  return (
    <div className="h-screen">
      <div className="absolute inset-0 z-10 pointer-events-none">
        {mapReady && <Location></Location>}
      </div>
      {/* <div className="pointer-events-auto">
          {mapReady && <DynamicLayer layer={app.mapLayer}></DynamicLayer>}
        </div> */}
      <div id="map" className="h-full z-0 relative"></div>
    </div>
  );
}
