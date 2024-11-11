import { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';

export default function useGeolocation() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (info) => setLocation({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      }),
      () => console.log('Erro ao obter localização'),
      { enableHighAccuracy: true, timeout: 2000 }
    );
  }, []);

  return location;
}