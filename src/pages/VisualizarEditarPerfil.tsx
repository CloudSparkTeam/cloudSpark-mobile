import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';

function VisualizarEditarPerfil(): React.JSX.Element {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        // Obter dados do perfil ao montar o componente
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    Alert.alert('Erro', 'Usuário não autenticado. Volte ao Login e faça seu cadastro!');
                    navigation.navigate('Login');
                    return;
                }

                // Decodifica o token para extrair o ID do usuário
                const decodedToken: any = jwtDecode(token);
                const userId = decodedToken.id; // ou o campo que contém o id

                const response = await fetch(`http://10.0.2.2:3002/usuario/listar/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Dadaos do backend: ", data);
                    
                    setNome(data.nome);
                    setEmail(data.email);
                    setDataNascimento(data.data_nascimento); // Apenas visualização
                } else {
                    Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
                }
            } catch (error) {
                console.error('Erro ao buscar dados do perfil:', error);
                Alert.alert('Erro', 'Erro ao conectar ao servidor.');
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('userToken'); // Remove o token do AsyncStorage
          navigation.navigate('Login');
          console.log('Usuário deslogado com sucesso');
        } catch (error) {
          console.error('Erro ao fazer logout:', error);
        }
      };

    const handleAtualizar = async () => {
        if (!nome || !email) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            // Recupera o token armazenado
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                Alert.alert('Erro', 'Usuário não autenticado.');
                navigation.navigate('Login');
                return;
            }

            // Decodifica o token para extrair o ID do usuário
            const decodedToken: any = jwtDecode(token);
            const userId = decodedToken.id; // ou o campo que contém o id

            // Constrói o objeto de atualização, adicionando a senha somente se foi alterada
            const updatedData: any = { nome, email };
            if (senha) {
                updatedData.senha = senha;
            }

            const response = await fetch(`http://10.0.2.2:3002/usuario/atualizar/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ nome, senha, email })
            });

            if (response.ok) {
                Alert.alert('Atualização concluída com sucesso');
                navigation.navigate('Login');
            } else {
                Alert.alert('Erro ao atualizar perfil');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível conectar ao servidor');
            console.error('Erro na conexão com o servidor:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Meu Perfil</Text>

                <Input
                    label="Nome"
                    placeholder={nome}
                    secureTextEntry={false}
                    value={nome}
                    onChangeText={setNome}
                />
                <Input
                    label="E-mail"
                    placeholder="Digite seu e-mail"
                    secureTextEntry={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <Input
                    label="Senha"
                    placeholder="Digite sua nova senha"
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={setSenha}
                />

                <View style={styles.viewOnlyContainer}>
                    <Text style={styles.viewOnlyLabel}>Data de Nascimento:</Text>
                    <Text style={styles.viewOnlyText}>{dataNascimento}</Text>
                </View>

                <Button color="yellow" onPress={handleAtualizar}>
                    Atualizar
                </Button>

                <Button color="red" onPress={handleLogout}>
                    Logout
                </Button>
            </View>

            <Image
                source={require('../assets/LOGO.png')}
                style={styles.logo}
                resizeMode="contain"
            />
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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    viewOnlyContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    viewOnlyLabel: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    viewOnlyText: {
        fontSize: 16,
        color: '#333',
        marginTop: 5,
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 20,
    },
});

export default VisualizarEditarPerfil;
