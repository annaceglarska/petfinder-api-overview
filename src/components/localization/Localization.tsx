import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React from "react";

const center = {
  lat: -3.745,
  lng: -38.523,
};

const containerStyle = {
  width: "400px",
  height: "400px",
};

const Localization = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY!,
  });

  return (
    <>
      {isLoaded && (
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerStyle={containerStyle}
        />
      )}
    </>
  );
};

export default Localization;
