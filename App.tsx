import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Overlay from './src/components/Overlay';
import Button from './src/components/Button';
import GoogleMaps from './src/components/GoogleMaps';

function App(): React.JSX.Element {
  const handleVoltarPress = () => {
    console.log('Botão Voltar pressionado!');
  };

  const handleAvancarPress = () => {
    console.log('Botão Avançar pressionado!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <GoogleMaps />
      <Overlay />
      <View style={styles.buttonContainer}>
        <Button color="yellow" onPress={handleVoltarPress}>
          Voltar
        </Button>
        <Button color="yellow" onPress={handleAvancarPress}>
          Avançar
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    marginTop: 20,
  },
});
export default App;
