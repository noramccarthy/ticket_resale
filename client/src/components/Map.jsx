import React, { useState } from 'react';
import '../css/TicketDetail.css';
import { GoogleMap } from '@react-google-maps/api';

const Map = ({ longitude, latitude, location }) => {
    const [map, setMap] = useState(null);

    const containerStyle = {
        height: '300px',
    };

    const handleMapLoad = (mapInstance) => {
        setMap(mapInstance);
    };

    const hasValidCoords = (
        typeof latitude === 'number' &&
        typeof longitude === 'number' &&
        !isNaN(latitude) &&
        !isNaN(longitude)
    );

    if (!hasValidCoords) {
        return null; // Or a loading indicator
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: latitude, lng: longitude }}
            zoom={15}
            onLoad={handleMapLoad}
        >
        </GoogleMap>
    )
};

export default Map;
