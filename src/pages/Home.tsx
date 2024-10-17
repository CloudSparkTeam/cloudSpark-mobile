import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Overlay from '../components/Overlay';
import GoogleMaps from '../components/GoogleMaps';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';

function Home(): React.JSX.Element {
  const navigation = useNavigation();

  const verPerfil = async () => {
    navigation.navigate('VisualizarEditarPerfil');
  }

  return (
    <SafeAreaView style={styles.container}>
      <GoogleMaps />
      <Overlay style={styles.overlay} />
      <View style={styles.buttonContainer}>
        {/* Botões, se houver */}
        <Button color="lightgray" onPress={verPerfil}>
          Ver Perfil
        </Button>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  overlay: {
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
});

export default Home;
