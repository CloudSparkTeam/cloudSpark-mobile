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
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      console.log('Dados enviados para o backend:', { email, senha });
  
      const response = await fetch('http://10.0.2.2:3002/login', {
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
  }

  const fazerCadastro = async () => {
    navigation.navigate('CadastroUsuario');
  }

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
        <Button color="yellow" style={styles.buttonEntrar} onPress={handleLogin}>
          Entrar
        </Button>

        <Button color="transparent" style={styles.buttonCriarConta} onPress={fazerCadastro}>
          Criar uma conta
        </Button>

        <Button color="lightgray" style={styles.buttonConvidado} onPress={entrarComoConvidado}>
          Entrar como convidade
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
    marginTop: 20,
    width: '100%', // Para os botões ocuparem a largura total da tela
  },
  buttonEntrar: {
    backgroundColor: 'yellow', // Botão "Entrar" com cor amarela
    paddingVertical: 15,
    marginBottom: 10, // Margem entre os botões
  },
  buttonCriarConta: {
    backgroundColor: 'transparent', // Botão "Criar uma conta" transparente
    borderWidth: 1, // Adiciona uma borda ao botão
    borderColor: 'gray',
    paddingVertical: 10, // Menor altura que o botão "Entrar"
    marginBottom: 10,
  },
  buttonConvidado: {
    backgroundColor: 'lightgray', // Botão "Entrar como convidado" com cor suave
    paddingVertical: 15,
  },
});

export default Login;