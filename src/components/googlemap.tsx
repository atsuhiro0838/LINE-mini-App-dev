import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: "100%",
  height: "400px",
};

const GoogleMapComponent = ({
  address,
  onMapUrlChange,
}: {
  address: string;
  onMapUrlChange: (url: string) => void;
}) => {
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [isLoaded, setIsLoaded] = useState(false);

  const handleScriptLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (isLoaded && address) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          const newLatLng = { lat: lat(), lng: lng() };
          setLatLng(newLatLng);

          const mapUrl = `https://www.google.com/maps?q=${newLatLng.lat},${newLatLng.lng}`;
          onMapUrlChange(mapUrl);
        } else {
          console.error("Geocoding failed: ", status);
          setLatLng(null);
        }
      });
    }
  }, [address, isLoaded, onMapUrlChange]);

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY!}
      onLoad={handleScriptLoad}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={latLng || { lat: 35.6762, lng: 139.6503 }}
        zoom={14}
      >
        {latLng && <Marker position={latLng} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
