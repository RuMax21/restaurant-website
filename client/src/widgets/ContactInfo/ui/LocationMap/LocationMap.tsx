import { useRef, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import L from 'leaflet';
import styles from './LocationMap.module.scss';
import type { LocationMapProps } from './model';
import { DEFAULT_ZOOM, TILE_URL } from './constants';
import { MapTooltip, MapMarker } from './components';

const createMarkerIcon = () =>
  L.divIcon({
    className: 'custom-marker-icon',
    html: renderToString(<MapMarker />),
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

const createPopup = (title: string) =>
  L.popup({
    closeOnClick: true,
    maxWidth: 200,
  }).setContent(
    renderToString(
      <MapTooltip title={title} description="Our restaurant is located here" />,
    ),
  );

export default function LocationMap({
  latitude,
  longitude,
  zoom = DEFAULT_ZOOM,
  title,
}: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([latitude, longitude], zoom);

    L.tileLayer(TILE_URL, {
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker([latitude, longitude], {
      icon: createMarkerIcon(),
    }).addTo(map);

    marker.on('click', () => {
      marker.bindPopup(createPopup(title)).openPopup();
    });

    mapInstanceRef.current = map;

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, [latitude, longitude, title, zoom]);

  return <div ref={mapRef} className={styles.map} />;
}
