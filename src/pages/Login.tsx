import React from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import { useNavigation } from '@react-navigation/native';

function Login(): React.JSX.Element {
  const navigation = useNavigation(); 

  const handleAvancarPress = () => {
    navigation.navigate('Home'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/LOGO.png')}
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

export default Login;
