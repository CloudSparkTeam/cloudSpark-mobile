import React, { useEffect, useState } from 'react';
import { View, Platform, PermissionsAndroid, Dimensions } from 'react-native';
import MapView, { Region } from 'react-native-maps'; // Importando o tipo Region
import useGeolocation from '../../hooks/useGeolocation';
import styles from './GoogleMaps.styles';

const { width, height } = Dimensions.get('screen');

const GoogleMaps: React.FC = () => {
  const location = useGeolocation();
  const [regiao, setRegiao] = useState<Region | null>(null); // Usando o tipo Region para o estado

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

  const handleRegionChangeComplete = (region: Region) => { // Definindo o tipo do parâmetro como Region
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
        zoomEnabled={true}
        minZoomLevel={1}
        showsUserLocation={true}
        loadingEnabled={true}
      />
    </View>
  );
};

export default GoogleMaps;