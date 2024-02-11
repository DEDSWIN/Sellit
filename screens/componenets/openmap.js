import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions } from 'react-native';
import React, { useState } from 'react';


const scrwidth = Dimensions.get('window').width;

function Openmap({ setaddress }) {
    const [markerPosition, setMarkerPosition] = useState(null);
    // const [hasLocationPermission, setHasLocationPermission] = useState(null);

    // useEffect(() => {
    //     const requestPermission = async () => {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //             // ... your permission request options
    //         );
    //         setHasLocationPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
    //     };

    //     requestPermission();
    // }, []);

    // const getLocation = async () => {
    //     if (hasLocationPermission) {
    //         const position = await Geolocation.getCurrentPosition(
    //             // ... your geolocation options
    //         );

    //         const initialRegion = {
    //             latitude: position.coords.latitude,
    //             longitude: position.coords.longitude,
    //             latitudeDelta: 0.0922,
    //             longitudeDelta: 0.0421,
    //         };
    //         geolo

    //         setMarkerPosition(initialRegion);
    //     }
    // };

    // useEffect(() => {
    //     getLocation();
    // }, [hasLocationPermission]); // Run getLocation only when permission changes

    return (
        <MapView
            style={{ flex: 1, borderRadius: 20 }}
            initialRegion={{
                latitude: 20.5937,
                longitude: 78.9629,
                latitudeDelta: 25.0,
                longitudeDelta: 25.0,
            }
            }
            onPress={(event) => {
                const { latitude, longitude } = event.nativeEvent.coordinate;
                setMarkerPosition({ latitude, longitude });
                setaddress({ latitude, longitude });
            }}
        >
            {markerPosition && <Marker coordinate={markerPosition} />}
        </MapView >
    );
}

export default Openmap;