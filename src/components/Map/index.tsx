import React, { useCallback, useEffect, useRef, useState } from 'react';
import classes from './index.module.scss'
import { Loader } from '@googlemaps/js-api-loader';
import { validateCoords } from '@root/utilities/validateCoords';
import { generateMapStyles } from './generateMapStyles';
import getCSSVariable from '@root/utilities/getCSSVariable';
import { generateMarkerContent } from './generateMarkerContent';
import { useRouter } from 'next/router';
import { DefaultMarkerProps } from './DefaultMarker/generateDefaultMarker';

// NOTE: the map will auto zoom and position itself to contain all of its markers

const mapColor = '#ff3f3f';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const grandRapidsLatLng = {
  lat: 42.9634,
  lng: -85.6681
}

const defaultMapControls = {
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
}

export type Coords = {
  lat: number
  lng: number
}

export type MapCoords = {
  coords: Coords
}

export type LocationType = {
  title?: string
  name?: string
  address?: MapCoords
}

export const Map: React.FC<{
  locations?: LocationType[]
  mapControls?: {
    zoomControl?: boolean
    mapTypeControl?: boolean
    scaleControl?: boolean,
    streetViewControl?: boolean
    rotateControl?: boolean
    fullscreenControl?: boolean
  },
  markerType?: 'default'
  mapPadding?: number // the `fitBounds` method with prevent markers from rendering in the padding area (distance from the marker point to the container edge)
  maxZoom?: number
}> = (props) => {
  const {
    locations,
    mapControls,
    markerType = 'default',
    mapPadding = 100,
    maxZoom = 15
  } = props;

  const mapDomRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [mapHasInitialized, setMapHasInitialized] = useState(false);
  const markerRefs = useRef<google.maps.Marker[]>([]);

  const { asPath } = useRouter();

  const onBoundChange = useCallback(() => {
    if (mapRef && mapRef.current) {
      const currentZoom = mapRef.current.getZoom() || 1;
      // don't let the auto-zoom get too close-up that the map becomes unrecognizable
      if (currentZoom > maxZoom) {
        mapRef.current.setZoom(maxZoom);
      }
    }
  }, [maxZoom])

  const createMarkers = useCallback((markerColor: string) => {
    if (window?.google) {
      const { current: currentMarkers } = markerRefs;
      const hasCurrentMarkers = currentMarkers && Array.isArray(currentMarkers) && currentMarkers.length > 0;

      // first, clear all existing markers
      if (hasCurrentMarkers) {
        currentMarkers.forEach((marker, index) => {
          marker.setMap(null);
          delete markerRefs.current[index];
        });
      }

      const hasLocations = locations && Array.isArray(locations) && locations.length > 0;

      if (hasLocations) {
        let bounds = new google.maps.LatLngBounds(); // auto-zoom and position the map to fit all of its markers

        locations?.forEach((location) => {
          const {
            title,
            name,
            address: {
              coords
            } = {}
          } = location as LocationType;

          const markerProps: DefaultMarkerProps = {
            title,
          }

          if (coords) {
            const {
              lat,
              lng
            } = coords;
            const coordsAreValid = validateCoords(coords);

            if (coordsAreValid) {
              bounds.extend(coords as google.maps.LatLngLiteral);

              // two markers positioned overtop each other, one as a white background and the other as the actual marker
              // this is because the google maps marker api does not accept complex svgs
              const markerBG = new google.maps.Marker({
                position: {
                  lat,
                  lng
                } as google.maps.LatLngLiteral,
                icon: {
                  path: 'M14.1,0A14.1,14.1,0,0,0,0,14.1C0,23.27,14.1,37,14.1,37S28.2,23.27,28.2,14.1A14.1,14.1,0,0,0,14.1,0Z',
                  fillColor: '#ffffff',
                  fillOpacity: 1,
                  anchor: new google.maps.Point(
                    28.2, // width
                    37 // height
                  ),
                  strokeColor: '#ffffff',
                  strokeWeight: 0
                },
                map: mapRef.current,
                title: title || name,
                clickable: false
              });

              const marker = new google.maps.Marker({
                position: {
                  lat,
                  lng
                } as google.maps.LatLngLiteral,
                icon: {
                  path: 'M14.1,0A14.1,14.1,0,0,0,0,14.1C0,23.27,14.1,37,14.1,37S28.2,23.27,28.2,14.1A14.1,14.1,0,0,0,14.1,0ZM14,19.94a5.84,5.84,0,1,1,5.84-5.84A5.84,5.84,0,0,1,14,19.94Z', // center circle punched out
                  fillColor: getCSSVariable(`color-dark-${markerColor}`),
                  fillOpacity: 1,
                  anchor: new google.maps.Point(
                    28.2, // width
                    37 // height
                  ),
                  strokeColor: '#ffffff',
                  strokeWeight: 1
                },
                map: mapRef.current,
                title: title || name
              });

              if (markerRefs) {
                markerRefs.current.push(markerBG, marker);
              }

              marker.addListener("click", () => {
                if (infoWindowRef.current) {

                  infoWindowRef.current.setContent(
                    generateMarkerContent(markerType, markerProps, asPath)
                  );

                  infoWindowRef.current.open({
                    anchor: marker,
                    map: mapRef.current,
                    shouldFocus: false,
                  });
                }
              });
            }
          }
        })

        if (mapRef && mapRef.current) {
          // fit all markers to fit within the map, with additional padding in pixels (see https://developers.google.com/maps/documentation/javascript/reference/map#Map.fitBounds)
          mapRef.current.fitBounds(bounds, mapPadding);
        }
      }
    }
  }, [
    locations,
    markerType,
    asPath,
    mapPadding
  ])

  const initMap = useCallback(() => {
    if (window?.google) { // script loaded in 'AppHead'
      const {
        lng,
        lat
      } = grandRapidsLatLng; // this is the initial position, it will be overridden once the markers populate

      if (mapDomRef.current && lat && lng) {
        const newMap = new window.google.maps.Map(mapDomRef.current, {
          center: {
            lat,
            lng
          },
          zoom: 11, // this is the initial zoom, it will be overridden once the markers populate
          // gestureHandling: 'greedy', // disables the ctrl+zoom overlay but zooms on scroll (not good)
          ...defaultMapControls,
          ...mapControls,
        });

        infoWindowRef.current = new google.maps.InfoWindow({
          maxWidth: 600
        });

        newMap.addListener('bounds_changed', onBoundChange);
        mapRef.current = newMap;
        setMapHasInitialized(true);
      }
    }
  }, [
    onBoundChange,
    mapControls
  ])

  useEffect(() => {
    if (mapColor && mapHasInitialized && mapRef.current) {
      const styles = generateMapStyles(mapColor);
      mapRef.current.setOptions({
        styles
      });
      createMarkers(mapColor);
    }
  }, [
    createMarkers,
    mapHasInitialized,
  ])

  useEffect(() => {
    if (apiKey) {
      const loader = new Loader({
        apiKey,
        version: 'weekly',
      });
      loader.load().then(initMap);
    }
  }, [initMap]);

  return (
    <div className={classes.mapWrapper}>
      <div
        ref={mapDomRef}
        className={[
          classes.map,
          markerType && classes[`marker-type-${markerType}`]
        ].join(' ')}
      />
    </div>
  )
}
