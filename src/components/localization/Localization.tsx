import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { getAddressLabel } from "../table-animal-details/helpers/TableAnimalDetails.helpers";
import { OutputFormat, fromAddress, setDefaults } from "react-geocode";
import { Organization } from "../../services/api/petfinder/organizations/organizations.type";

const containerStyle = {
  width: "400px",
  height: "400px",
};

export interface LocalizationProps {
  data: Organization | undefined;
}

const Localization: React.FC<LocalizationProps> = ({ data: organization }) => {
  const address: string = useMemo(
    () => getAddressLabel(organization?.address),
    [organization]
  );

  const [coordinates, setCoordinates] = useState<
    { lat: number; lng: number } | undefined
  >();

  useEffect(() => {
    setDefaults({
      key: process.env.REACT_APP_GOOGLE_MAP_API_KEY!,
      language: "en",
      region: "es",
      outputFormat: OutputFormat.JSON,
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (!address) {
        return;
      }
      try {
        const data = await fromAddress(address);
        const coordinatesData = data.results[0].geometry.location;
        setCoordinates(coordinatesData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [address]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY!,
  });

  return (
    <>
      {isLoaded && coordinates && (
        <GoogleMap
          zoom={10}
          center={coordinates}
          mapContainerStyle={containerStyle}
        >
          <Marker position={coordinates} />
        </GoogleMap>
      )}
    </>
  );
};

export default Localization;
