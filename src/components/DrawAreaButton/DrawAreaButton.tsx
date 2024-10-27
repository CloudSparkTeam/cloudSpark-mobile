import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../Overlay/Overlay.styles';

interface DrawAreaButtonProps {
  onPress: () => void;
}

const DrawAreaButton: React.FC<DrawAreaButtonProps> = ({ onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress} style={styles.botaoGenerico}>
      <Icon name="pencil" size={30} color="#000" />
    </TouchableOpacity>
    <Text style={styles.BotaoDesc}>Desenhar área de busca</Text>
  </View>
);

export default DrawAreaButton;
