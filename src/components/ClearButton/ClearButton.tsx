import React from 'react';
import { View, Button } from 'react-native';
import styles from '../GoogleMaps/GoogleMaps.styles';

interface ClearButtonProps {
  onPress: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onPress }) => (
  <View style={styles.buttonContainer}>
    <Button title="Limpar Pontos" onPress={onPress} />
  </View>
);

export default ClearButton;