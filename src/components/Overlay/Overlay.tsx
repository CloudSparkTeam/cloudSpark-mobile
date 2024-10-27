import React, { useState } from 'react';
import { View, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/StackNavigator';
import SearchButton from '../SearchButton/SearchButton';
import DrawAreaButton from '../DrawAreaButton/DrawAreaButton';
import ModalBusca from '../ModalBusca/ModalBusca';
import { styles } from './Overlay.styles';

const { width, height } = Dimensions.get('window');

const Overlay: React.FC = () => {
  const [clicado, setClicado] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => setClicado(!clicado);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleSearchPress = () => {
    Alert.alert(
      "Muito bem!",
      "Agora você pode selecionar seus 4 pontos de interesse.",
      [{ text: "OK", onPress: () => navigation.navigate('Busca') }]
    );
  };

  return (
    <View style={styles.alignBottom}>
      {!clicado && (
        <TouchableOpacity onPress={handlePress} style={styles.botao}>
          <Icon name="chevron-up" size={30} color="#0006" />
        </TouchableOpacity>
      )}

      {clicado && (
        <View style={styles.container}>
          <TouchableOpacity onPress={handlePress} style={styles.botao}>
            <Icon name="chevron-down" size={30} color="#0006" />
          </TouchableOpacity>
          <View style={styles.overlay}>
            <View style={styles.grid}>
              <View style={styles.gridRow}>
                <SearchButton onPress={handleOpenModal} />
                <DrawAreaButton onPress={handleSearchPress} />
              </View>
            </View>
          </View>
        </View>
      )}

      <ModalBusca visible={modalVisible} onClose={handleCloseModal} />
    </View>
  );
};

export default Overlay;
