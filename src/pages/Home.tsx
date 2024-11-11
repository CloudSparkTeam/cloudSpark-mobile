import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import Overlay from '../components/Overlay/Overlay';
import GoogleMaps from '../components/GoogleMaps/GoogleMaps';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface HomeProps {
  navigation?: NavigationProp<any>;
  isHomePage?: true;
}

function Home({ navigation }: HomeProps): React.JSX.Element {
  const [north, setNorth] = useState('');
  const [south, setSouth] = useState('');
  const [east, setEast] = useState('');
  const [west, setWest] = useState('');

  const handleCoordsChange = (norte: number, sul: number, leste: number, oeste: number) => {
    setNorth(norte.toString());
    setSouth(sul.toString());
    setEast(leste.toString());
    setWest(oeste.toString());
  };

  const internalNavigation = useNavigation();
  const handleIconPress = () => {
    if (navigation) {
      navigation.navigate('Profile');
    } else {
      internalNavigation.navigate('VisualizarEditarPerfil');
    }
  };

  const verPerfil = () => {
    internalNavigation.navigate('VisualizarEditarPerfil');
  };

  const handleNavigateToHistorico = () => {
    if (navigation) {
      navigation.navigate('Historico');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GoogleMaps />
      <View style={styles.overlayContainer}>
        <Overlay />
      </View>
      <TouchableOpacity style={styles.iconContainer} onPress={verPerfil}>
        <Icon name="person-circle" size={40} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleNavigateToHistorico}
        style={styles.botaoHistorico}>
        <Icon name="time-outline" size={30} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center', // Centraliza o Overlay no contêiner
    zIndex: 2,
  },
  buttonContainer: {
    marginTop: 20,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 3,
  },
  botaoHistorico: {
    position: 'absolute',
    top: 65,
    right: 13,
    backgroundColor: '#ffffff',
    padding: 3,
    elevation: 5,
  },
});

export default Home;