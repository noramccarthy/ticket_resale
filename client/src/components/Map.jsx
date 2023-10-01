import React from 'react';
import '../css/OneTicket.css';

// import { Loader } from '@googlemaps/js-api-loader';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const Map = ({latitude, longitude, location}) => {
    const [map, setMap] = React.useState(null)

    const containerStyle = {
        width: '800px',
        height: '400px'
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyA3e3qht-meGsln-PEY2RUhRdRzi0yk4UI"
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