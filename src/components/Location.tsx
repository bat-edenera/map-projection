import L from "leaflet";
import { useEffect, useState } from "react";
import app from "@/store/app";

export default function Location() {
  const [location, setLocation] = useState<L.LatLng>(L.latLng(39.9, 116));
  useEffect(() => {
    app.map.on("mousemove", handleMousemove);
    return () => {
      app.map.off("mousemove", handleMousemove);
    };
  }, []);
  const handleMousemove = ({ latlng }: L.LeafletMouseEvent) => {
    setLocation(latlng);
  };
  return location ? (
    <div className="absolute right-3 bottom-2 text-white px-2 ">
      {location.lng.toFixed(3)}，{location.lat.toFixed(3)}
    </div>
  ) : null;
}
