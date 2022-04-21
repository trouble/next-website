// import { Housing as HousingType, Location as LocationType } from '';
import { generateHousingMarker } from './HousingMarker/generateHousingMarker';
import { generateLocationMarker } from './LocationMarker/generateLocationMarker';

export const generateMarkerContent = (
  markerType: 'location' | 'housing',
  props: Omit<HousingType, 'layout'> | LocationType,
  asPath: string
): string => {

  if (markerType === 'housing') {
    return generateHousingMarker(props as HousingType, asPath);
  }

  if (markerType === 'location') {
    return generateLocationMarker(props as LocationType);
  }

  return ''
}
