import React from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import Button from './src/components/Button';
import Input from './src/components/Input';


function App(): React.JSX.Element {

  const handleAvancarPress = () => {
    console.log('Botão Avançar pressionado!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('./src/assets/LOGO.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Input label="Login:" placeholder="Digite seu login" secureTextEntry={false}/>
      <Input label="Senha:" placeholder="Digite sua senha" secureTextEntry={true}/>

      <View style={styles.buttonContainer}>
        <Button color="yellow" onPress={handleAvancarPress}>
          Entrar
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
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default App;
