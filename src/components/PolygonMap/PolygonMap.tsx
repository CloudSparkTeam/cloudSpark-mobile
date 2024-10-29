import React from 'react';
import { Polygon, Marker } from 'react-native-maps';

interface PolygonMapProps {
  coordinates: { latitude: number; longitude: number }[];
  onMarkerDragEnd: (e: any, index: number) => void;
}

const PolygonMap: React.FC<PolygonMapProps> = ({ coordinates, onMarkerDragEnd }) => (
  <>
    {coordinates.length > 2 && (
      <Polygon coordinates={coordinates} strokeColor="#0000FF" strokeWidth={2} fillColor="rgba(0,0,255,0.3)" />
    )}
    {coordinates.map((coord, index) => (
      <Marker key={index} coordinate={coord} draggable onDragEnd={(e) => onMarkerDragEnd(e, index)} />
    ))}
  </>
);

export default PolygonMap;