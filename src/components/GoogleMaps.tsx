import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, PermissionsAndroid, Dimensions, Text, Button } from 'react-native';
import MapView, { Polygon, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('screen');

interface GoogleMapsProps {
  onCoordsChange: (norte: number, sul: number, leste: number, oeste: number) => void;
}

interface GoogleMapsInterface {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

function GoogleMaps({ onCoordsChange }: GoogleMapsProps): React.JSX.Element {
  const [regiao, setRegiao] = useState<GoogleMapsInterface | null>(null);
  const [polygonCoords, setPolygonCoords] = useState<{ latitude: number; longitude: number }[]>([]);

  const [norte, setNorte] = useState<number | null>(null);
  const [sul, setSul] = useState<number | null>(null);
  const [leste, setLeste] = useState<number | null>(null);
  const [oeste, setOeste] = useState<number | null>(null);

  useEffect(() => {
    getMinhaLocalizacao();
  }, []);

  useEffect(() => {
    if (polygonCoords.length === 4) {
      calcularExtremos(polygonCoords);
    }
  }, [polygonCoords]);

  function getMinhaLocalizacao() {
    Geolocation.getCurrentPosition(
      (info) => {
        setRegiao({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 50.0,
          longitudeDelta: 50.0,
        });
      },
      () => {
        console.log('Erro ao obter localização');
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
      }
    );
  }

  // Função para selecionar coordenadas manualmente no mapa
  const handleMapPress = (e: any) => {
    const { coordinate } = e.nativeEvent;

    if (polygonCoords.length < 4) {
      setPolygonCoords((prevCoords) => [...prevCoords, coordinate]);

      if (polygonCoords.length === 3) {
        console.log('Coordenadas selecionadas:', [...polygonCoords, coordinate]);
      }
    } else {
      console.log('Você já selecionou 4 pontos.');
    }
  };

  // Função para calcular Norte, Sul, Leste e Oeste
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

    // Chame a função de callback para enviar os valores para o componente pai
    onCoordsChange(norte, sul, leste, oeste);

    console.log(`Norte: ${norte}, Sul: ${sul}, Leste: ${leste}, Oeste: ${oeste}`);
  };

  // Função para limpar os pontos e redefinir os extremos
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

    // Recalcula os extremos ao mover o marcador
    calcularExtremos(updatedCoords);
    console.log(`Marcador ${index + 1} atualizado para:`, newCoordinate);
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
        {/* Desenha o polígono com base nas coordenadas manuais selecionadas */}
        {polygonCoords.length > 2 && (
          <Polygon coordinates={polygonCoords} strokeColor="#0000FF" strokeWidth={2} fillColor="rgba(0,0,255,0.3)" />
        )}

        {/* Adiciona os marcadores nos pontos manuais */}
        {polygonCoords.map((coord, index) => (
          <Marker key={index} coordinate={coord} draggable onDragEnd={(e) => handleMarkerDragEnd(e, index)} />
        ))}
      </MapView>

      {/* Exibe as coordenadas Norte, Sul, Leste e Oeste */}
      {norte && sul && leste && oeste && (
        <View style={styles.coordContainer}>
          <Text>Norte: {norte.toFixed(6)}</Text>
          <Text>Sul: {sul.toFixed(6)}</Text>
          <Text>Leste: {leste.toFixed(6)}</Text>
          <Text>Oeste: {oeste.toFixed(6)}</Text>
        </View>
      )}

      {/* Botão para limpar os pontos */}
      <View style={styles.buttonContainer}>
        <Button title="Limpar Pontos" onPress={limparPontos} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  coordContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
  },
});

export default GoogleMaps;
