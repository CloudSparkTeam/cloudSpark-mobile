import React, { useEffect, useState } from 'react';
import { View, Platform, PermissionsAndroid, Dimensions } from 'react-native';
import MapView, { Region, MapPressEvent } from 'react-native-maps';
import useGeolocation from '../../hooks/useGeolocation';
import styles from './GoogleMaps.styles';

const { width, height } = Dimensions.get('screen');

interface GoogleMapsProps {
  onPress?: (e: MapPressEvent) => void;  // Aceita o evento onPress como prop
  children?: React.ReactNode; // Para aceitar os componentes filhos como PolygonMap
}

const GoogleMaps: React.FC<GoogleMapsProps> = ({ onPress, children }) => {
  const location = useGeolocation();
  const [regiao, setRegiao] = useState<Region | null>(null);

  useEffect(() => {
    if (location) {
      setRegiao({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [location]);

  const handleRegionChangeComplete = (region: Region) => {
    setRegiao(region);
  };

  return (
    <View style={styles.container}>
      <MapView
        onMapReady={() => {
          if (Platform.OS === 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(() => {
              console.log('Permissão concedida');
            });
          }
        }}
        style={{ width, height }}
        initialRegion={regiao || {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 50.0,
          longitudeDelta: 50.0,
        }}
        onRegionChangeComplete={handleRegionChangeComplete}
        onPress={onPress}  // Passa o onPress para MapView
        zoomEnabled={true}
        minZoomLevel={1}
        showsUserLocation={true}
        loadingEnabled={true}
      >
        {children} 
      </MapView>
    </View>
  );
};

export default GoogleMaps;