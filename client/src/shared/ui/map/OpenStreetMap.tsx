import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CustomMarker from './CustomMarker.tsx';
import { renderToString } from 'react-dom/server';
import MapTooltip from './MapTooltip.tsx';

interface OpenStreetMapProps {
    latitude: number;
    longitude: number;
    title: string;
    zoom?: number;
}

const streetTile: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

export const OpenStreetMap: React.FC<OpenStreetMapProps> = ({
    latitude,
    longitude,
    title,
    zoom = 18,
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        const map = L.map(mapRef.current).setView([latitude, longitude], zoom);

        L.tileLayer(streetTile, {
            maxZoom: 19,
        }).addTo(map);

        const markerIcon = L.divIcon({
            className: 'custom-marker-icon',
            html: renderToString(<CustomMarker />),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
        });

        const marker = L.marker([latitude, longitude], {
            icon: markerIcon,
        }).addTo(map);

        const infoWindow = L.popup({
            closeOnClick: true,
            maxWidth: 200,
        }).setContent(
            renderToString(
                <MapTooltip
                    title={title}
                    description="Our restaurant is located here"
                />,
            ),
        );

        marker.on('click', () => {
            marker.bindPopup(infoWindow).openPopup();
        });

        mapInstanceRef.current = map;
        markerRef.current = marker;

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
            }
        };
    }, [latitude, longitude, title, zoom]);

    return <div ref={mapRef} className="w-full h-96 overflow-hidden" />;
};
