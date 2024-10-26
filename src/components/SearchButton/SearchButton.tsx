import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../Overlay/Overlay.styles';

interface SearchButtonProps {
  onPress: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress} style={styles.botaoGenerico}>
      <Icon name="search" size={30} color="#000" />
    </TouchableOpacity>
    <Text style={styles.BotaoDesc}>Realizar busca</Text>
  </View>
);

export default SearchButton;
