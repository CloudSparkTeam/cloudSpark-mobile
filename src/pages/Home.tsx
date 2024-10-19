import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import Overlay from '../components/Overlay';
import GoogleMaps from '../components/GoogleMaps';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Button from '../components/Button';

interface HomeProps {
  navigation?: NavigationProp<any>;
  isHomePage?: true;
}

function Home({ navigation }: HomeProps): React.JSX.Element {
  const [north, setNorth] = useState('');
  const [south, setSouth] = useState('');
  const [east, setEast] = useState('');
  const [west, setWest] = useState('');

  // Função que atualiza as coordenadas
  const handleCoordsChange = (norte: number, sul: number, leste: number, oeste: number) => {
    setNorth(norte.toString());
    setSouth(sul.toString());
    setEast(leste.toString());
    setWest(oeste.toString());
  };

  const internalNavigation = useNavigation(); // Para navegação sem prop
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Passando a função handleCoordsChange e isHomePage={true} para o componente GoogleMaps */}
      <GoogleMaps onCoordsChange={handleCoordsChange} isHomePage={true} />
      <View style={styles.overlay}>
        <Overlay />
      </View>
      {/* <View style={styles.buttonContainer}>
        <Button color="lightgray" onPress={verPerfil}>
          Ver Perfil
        </Button>
      </View> */}
      <TouchableOpacity style={styles.iconContainer} onPress={verPerfil}>
        <Icon name="person-circle" size={40} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    marginBottom: 10,
    left: 0,
    right: 0,
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
});

export default Home;