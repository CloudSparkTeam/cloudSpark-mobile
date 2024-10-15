import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import Input from '../components/Input';
import { useNavigation } from '@react-navigation/native';

function Login(): React.JSX.Element {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (data.token) {
        // Armazena o token usando AsyncStorage
        await AsyncStorage.setItem('userToken', data.token);

        // Navega para a tela "Home" com o token armazenado
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', data.error || 'Login falhou');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/LOGO.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Input
        label="Login:"
        placeholder="Digite seu login"
        secureTextEntry={false}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        label="Senha:"
        placeholder="Digite sua senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />

      <View style={styles.buttonContainer}>
        <Button color="yellow" onPress={handleLogin}>
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
