import React, { useEffect, useState, useCallback, useRef } from 'react';
import '../css/TicketDetail.css';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { googleMapsLoaderOptions } from '../utils/googleMapsConfig';

const libraries = ['marker']; // Define the libraries array outside the component

const Map = ({ latitude, longitude, location }) => {
    const [map, setMap] = useState(null);
    const mapRef = useRef(null); // Reference for the map container

    const containerStyle = {
        width: '800px',
        height: '400px',
    };

    // const { isLoaded } = useJsApiLoader(googleMapsLoaderOptions);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Use your own API key
        version: 'weekly', // Always use the latest stable version
        libraries, // Use the static libraries array
    });

    // Set bounds when map is loaded
    const onLoad = useCallback((mapInstance) => {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend({ lat: latitude, lng: longitude });
        mapInstance.fitBounds(bounds);
        setMap(mapInstance);
    }, [latitude, longitude]);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    useEffect(() => {
        if (isLoaded && !map && mapRef.current) {
            // Create the map instance manually if needed
            const mapInstance = new window.google.maps.Map(mapRef.current, {
                center: { lat: latitude, lng: longitude },
                zoom: 14,
                mapId: 'DEMO_MAP_ID'
            });

            setMap(mapInstance);

            // Load the AdvancedMarkerElement when map is loaded
            window.google.maps.importLibrary('marker').then(() => {
                const { AdvancedMarkerElement } = window.google.maps.marker;

                // Create the Advanced Marker
                new AdvancedMarkerElement({
                    map: mapInstance,
                    position: { lat: latitude, lng: longitude },
                    title: location, // Optional: you can add a title to the marker
                });
            });
        }
    }, [isLoaded, latitude, longitude, map, location]);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: latitude, lng: longitude }}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
        />
    ) : (
        <div>Loading map...</div>
    );
};

export default Map;
