import React, { useEffect, useState } from 'react';
import { View, Platform, PermissionsAndroid, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Region, MapPressEvent } from 'react-native-maps';
import useGeolocation from '../../hooks/useGeolocation';
import styles from './GoogleMaps.styles';

const { width, height } = Dimensions.get('screen');

interface GoogleMapsProps {
  onPress?: (e: MapPressEvent) => void; // Aceita o evento onPress como prop
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
        latitudeDelta: 1.2, 
        longitudeDelta: 1.2,
      });
    }
  }, [location]);

  const handleRegionChangeComplete = (region: Region) => {
    setRegiao(region);
  };

  if (!regiao) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
        initialRegion={regiao}
        onRegionChangeComplete={handleRegionChangeComplete}
        onPress={onPress} // Passa o onPress para MapView
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
