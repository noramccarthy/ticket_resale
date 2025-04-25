import React from 'react';
import '../css/TicketDetail.css';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const Map = ({latitude, longitude, location}) => {
    const [map, setMap] = React.useState(null)

    const containerStyle = {
        width: '800px',
        height: '400px'
    };

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })
    
    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds((latitude, longitude));
        map.fitBounds(bounds);
        setMap(map)
    }, [])
    
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center = {
                {
                lat: latitude,
                lng: longitude
                }
            }
            zoom={100}
            onLoad={onLoad}
            onUnmount={onUnmount}
    >
        <Marker
            position = {
                {
                lat: latitude,
                lng: longitude
                }
            }
        />
            <></>
        </GoogleMap>
    ) : <></>

}

export default Map;