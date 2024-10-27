import React, { useState, useEffect } from 'react';
import { View, Platform, PermissionsAndroid, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import useGeolocation from '../../hooks/useGeolocation';
import PolygonMap from '../PolygonMap/PolygonMap';
import CoordDisplay from '../CoordDisplay/CoordDisplay';
import ClearButton from '../ClearButton/ClearButton';
import styles from './GoogleMaps.styles';

const { width, height } = Dimensions.get('screen');

interface GoogleMapsProps {
  onCoordsChange: (norte: number, sul: number, leste: number, oeste: number) => void;
  isHomePage?: boolean;
}

function GoogleMaps({ onCoordsChange, isHomePage = false }: GoogleMapsProps): React.JSX.Element {
  const location = useGeolocation();
  const [regiao, setRegiao] = useState<{ latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number } | undefined>(undefined);
  const [polygonCoords, setPolygonCoords] = useState<{ latitude: number; longitude: number }[]>([]);
  const [norte, setNorte] = useState<number | null>(null);
  const [sul, setSul] = useState<number | null>(null);
  const [leste, setLeste] = useState<number | null>(null);
  const [oeste, setOeste] = useState<number | null>(null);

  useEffect(() => {
    if (location) {
      setRegiao({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 50.0,
        longitudeDelta: 50.0,
      });
    }
  }, [location]);

  useEffect(() => {
    if (polygonCoords.length === 4) {
      calcularExtremos(polygonCoords);
    }
  }, [polygonCoords]);

  const handleMapPress = (e: any) => {
    const { coordinate } = e.nativeEvent;
    if (polygonCoords.length < 4) {
      setPolygonCoords((prevCoords) => [...prevCoords, coordinate]);
    } else {
      console.log('Você já selecionou 4 pontos.');
    }
  };

  const calcularExtremos = (coords: { latitude: number; longitude: number }[]) => {
    const latitudes = coords.map((coord) => coord.latitude);
    const longitudes = coords.map((coord) => coord.longitude);

    const norte = Math.max(...latitudes);
    const sul = Math.min(...latitudes);
    const leste = Math.max(...longitudes);
    const oeste = Math.min(...longitudes);

    setNorte(norte);
    setSul(sul);
    setLeste(leste);
    setOeste(oeste);

    onCoordsChange(norte, sul, leste, oeste);
  };

  const limparPontos = () => {
    setPolygonCoords([]);
    setNorte(null);
    setSul(null);
    setLeste(null);
    setOeste(null);
    console.log('Pontos limpos');
  };

  const handleMarkerDragEnd = (e: any, index: number) => {
    const newCoordinate = e.nativeEvent.coordinate;
    const updatedCoords = [...polygonCoords];
    updatedCoords[index] = newCoordinate;
    setPolygonCoords(updatedCoords);
    calcularExtremos(updatedCoords);
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
        style={{ width: width, height: height }}
        region={regiao}
        zoomEnabled={true}
        minZoomLevel={1}
        showsUserLocation={true}
        loadingEnabled={true}
        onPress={handleMapPress}
      >
        <PolygonMap coordinates={polygonCoords} onMarkerDragEnd={handleMarkerDragEnd} />
      </MapView>

      {norte && sul && leste && oeste && (
        <CoordDisplay norte={norte} sul={sul} leste={leste} oeste={oeste} />
      )}

      {!isHomePage && <ClearButton onPress={limparPontos} />}
    </View>
  );
}

export default GoogleMaps;