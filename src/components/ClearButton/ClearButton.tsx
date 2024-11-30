import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../GoogleMaps/GoogleMaps.styles';

interface ClearButtonProps {
  onPress: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onPress }) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      style={[styles.customButton, { backgroundColor: 'yellow' }]} // Fundo amarelo
      onPress={onPress}
    >
      <Text style={{ color: 'black', fontWeight: 'bold' }}>Limpar pontos</Text>
    </TouchableOpacity>
  </View>
);

export default ClearButton;
