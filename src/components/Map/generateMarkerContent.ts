import { DefaultMarkerProps, generateDefaultMarker } from './DefaultMarker/generateDefaultMarker';

export const generateMarkerContent = (
  markerType: 'default',
  props: DefaultMarkerProps,
  asPath: string
): string => {
  if (markerType === 'default') {
    return generateDefaultMarker(props, asPath);
  }
  return ''
}
