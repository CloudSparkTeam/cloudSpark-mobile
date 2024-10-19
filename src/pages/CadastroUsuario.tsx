import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import DatePickerComponent from '../components/DatePicker'; // Importando o componente de Data
import { useNavigation } from '@react-navigation/native';

function CadastroUsuario(): React.JSX.Element {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const navigation = useNavigation();

    const handleCadastro = async () => {
        if (!nome || !senha || !email || !dataNascimento) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
          }

          try {
            console.log('Enviando estes dados:', {nome, email, dataNascimento, senha});
            
            const response = await fetch('http://10.0.2.2:3002/usuario/criar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({nome, senha, email, data_nascimento: dataNascimento})
            })

            console.log('Response Status:', response.status);
            console.log('Response Headers:', response.headers);

            const data = await response.json();

            console.log('Dados recebidos do backend:', data);

            if (response.ok) {
                Alert.alert('Cadastro concluído com sucesso');
                navigation.navigate('Login');
            } else {
                Alert.alert('Erro ao fazer cadastro');
              }
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível conectar ao servidor');
            console.error('Erro na conexão com o servidor:', error);
          }
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Cadastre a sua conta</Text>

        <Input
          label="Digite seu nome"
          placeholder="nome..."
          secureTextEntry={false}
          value={nome}
          onChangeText={setNome}
        />
        <Input
          label="Digite seu e-mail"
          placeholder="email..."
          secureTextEntry={false}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="Digite sua senha"
          placeholder="senha..."
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />

        <DatePickerComponent
          label="Data de Nascimento:"
          onDateChange={setDataNascimento}
          value={dataNascimento}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Já tenho uma conta!</Text>
        </TouchableOpacity>

        <Button color="yellow" onPress={handleCadastro}>
          Cadastrar
        </Button>
      </View>

      <Image
        source={require('../assets/LOGO.png')} // Seu logo aqui
        style={styles.logo}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  linkText: {
    color: '#0095FF',
    marginVertical: 10,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});

export default CadastroUsuario;