import { Coords } from "@components/Map";

export const validateCoords = (coords: Coords) => {
  const { lat, lng } = coords;
  let latIsValid = false;
  let lngIsValid = false;

  if (typeof lat === 'number' && typeof lng === 'number') {
    if (lat >= -90 && lat <= 90) latIsValid = true;
    if (lng >= -180 && lng <= 180) lngIsValid = true;
  }

  return (latIsValid && lngIsValid);
}
