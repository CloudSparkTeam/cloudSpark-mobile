import React from 'react';
import { View, Text } from 'react-native';
import styles from '../GoogleMaps/GoogleMaps.styles';

interface CoordDisplayProps {
  norte: number;
  sul: number;
  leste: number;
  oeste: number;
}

const CoordDisplay: React.FC<CoordDisplayProps> = ({ norte, sul, leste, oeste }) => (
  <View style={styles.coordContainer}>
    <Text>Norte: {norte.toFixed(6)}</Text>
    <Text>Sul: {sul.toFixed(6)}</Text>
    <Text>Leste: {leste.toFixed(6)}</Text>
    <Text>Oeste: {oeste.toFixed(6)}</Text>
  </View>
);

export default CoordDisplay;