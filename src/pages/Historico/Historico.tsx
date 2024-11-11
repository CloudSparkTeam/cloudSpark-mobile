import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

interface Consulta {
    id: number;
    nome: string;
    data_imagem: string;
    coordenada_norte: number;
    coordenada_sul: number;
    coordenada_leste: number;
    coordenada_oeste: number;
    startDate: string;
    endDate: string;
    cloudPercentage: number;
    shadowPercentage: number;
    status: string;
    usuario_id: number | null;
    data_download: string | null;
}

const Historico: React.FC = () => {
    const [consultas, setConsultas] = useState<Consulta[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<number | null>(null);
    const navigation = useNavigation();

    const [loadingGerarNovamente, setLoadingGerarNovamente] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (token) {
                    const decodedToken: any = jwtDecode(token);
                    setUserId(decodedToken.id);
                } else {
                    Alert.alert('Erro', 'Faça o login e tente novamente!');
                    navigation.navigate('Home');
                }
            } catch (error) {
                Alert.alert('Erro', 'Você está como visitante');
            }
        };

        fetchUserId(); // Chamando a função fetchUserId
    }, []);

    useEffect(() => {
        if (userId !== null) {
            fetchConsultas();
        }
    }, [userId]);

    const fetchConsultas = async () => {
        setLoading(true);
        try {
            const response = await axios.get<Consulta[]>(`http://10.0.2.2:3002/imagemSatelite/listarUsuario/${userId}`);
            setConsultas(response.data);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    const convertToISODate = (dateString: string) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}T00:00:00Z`).toISOString();
    };

    const handleGerarNovamente = async (item: Consulta) => {
        console.log(`Gerar novamente consulta com ID: ${item.id}`);
        setLoadingGerarNovamente(true);
        try {
            const response = await fetch(`http://10.0.2.2:3002/imagemSatelite/gerarNovamente/${item.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    coordenada_norte: item.coordenada_norte,
                    coordenada_sul: item.coordenada_sul,
                    coordenada_leste: item.coordenada_leste,
                    coordenada_oeste: item.coordenada_oeste,
                    data_imagem: new Date().toISOString(),
                    status: item.status,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    shadowPercentage: item.shadowPercentage,
                    cloudPercentage: item.cloudPercentage,
                    usuario_id: userId,
                }),
            });
    
            if (response.ok) {
                Alert.alert("Sucesso", "Imagem gerada novamente com sucesso!");
                console.log("Indo para a página detalhes da imagem")
                navigation.navigate('DetalhesImagem', {
                    dataImagem: new Date(item.data_imagem).toLocaleDateString(),
                    coordenadas: {
                        norte: item.coordenada_norte,
                        sul: item.coordenada_sul,
                        leste: item.coordenada_leste,
                        oeste: item.coordenada_oeste,
                    },
                    coberturaNuvem: item.cloudPercentage,
                });
            } else {
                console.error("Erro ao gerar novamente a consulta:", response.statusText);
                Alert.alert("Erro", "Não foi possível gerar novamente a imagem.");
            }
        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
            Alert.alert("Erro", "Ocorreu um erro ao tentar gerar novamente.");
        } finally {
            setLoadingGerarNovamente(false);  // Finaliza o carregamento
        }
    };
    

    const renderItem = ({ item }: { item: Consulta }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.nome}</Text>
            <Text>Data da Imagem: {new Date(item.data_imagem).toLocaleDateString()}</Text>
            <Text>Norte: {item.coordenada_norte}</Text>
            <Text>Sul: {item.coordenada_sul}</Text>
            <Text>Leste: {item.coordenada_leste}</Text>
            <Text>Oeste: {item.coordenada_oeste}</Text>
            <Text>Período: {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</Text>
            <Text>Nuvens: {item.cloudPercentage}%</Text>
            <Text>Sombras: {item.shadowPercentage}%</Text>
            <Text>Status: {item.status}</Text>
            <Button color="yellow" onPress={() => handleGerarNovamente(item)}>
                Gerar novamente
            </Button>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Exibe o loading centralizado */}
            {loadingGerarNovamente && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}

            {/* Exibe o indicador de carregamento para as consultas */}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={consultas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // Adiciona a posição relativa para garantir que o loadingContainer seja posicionado corretamente
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Fundo semitransparente
        zIndex: 100, // Garante que o indicador de carregamento fique sobre a lista
    },
});

export default Historico;