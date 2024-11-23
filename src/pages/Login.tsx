import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Alert, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import Input from '../components/Input';
import { useNavigation } from '@react-navigation/native';

function Login(): React.JSX.Element {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      console.log('Dados enviados para o backend:', { email, senha });

      const response = await fetch('http://192.168.137.66:3002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);

      const data = await response.json();

      console.log('Dados recebidos do backend:', data);

      if (data.token) {
        await AsyncStorage.setItem('userToken', data.token);
        console.log('Token armazenado com sucesso');
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', data.error || 'Login falhou');
        console.log('Erro no login:', data.error || 'Login falhou');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
      console.error('Erro na conexão com o servidor:', error);
    }
  };

  const entrarComoConvidado = async () => {
    navigation.navigate('Home');
  };

  const fazerCadastro = async () => {
    navigation.navigate('CadastroUsuario');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/Logo_Login.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.card}>
        <Text style={styles.title}>Faça seu Login</Text>

        <Input
          label="E-mail:"
          placeholder="email..."
          secureTextEntry={false}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="Senha:"
          placeholder="senha..."
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />

        <View style={styles.buttonContainer}>
          <Button color="yellow" style={styles.buttonEntrar} onPress={handleLogin}>
            Entrar
          </Button>

          <Button color="transparent" style={styles.buttonCriarConta} onPress={fazerCadastro}>
            Criar uma conta
          </Button>

          <Button color="lightgray" style={styles.buttonConvidado} onPress={entrarComoConvidado}>
            Entrar como convidado
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    width: 230,
    height: 250,
    marginTop: 50,
    marginBottom: 10,
  },
  buttonEntrar: {
    backgroundColor: 'yellow', 
    paddingVertical: 15,
    marginBottom: 10,
  },
  buttonCriarConta: {
    backgroundColor: 'transparent', 
    borderWidth: 1, 
    borderColor: 'gray',
    paddingVertical: 10, 
    marginBottom: 10,
  },
  buttonConvidado: {
    backgroundColor: 'lightgray',
    paddingVertical: 15,
  },
  buttonContainer: {
    marginTop: 10,
    width: '70%',
  },
});

export default Login;
