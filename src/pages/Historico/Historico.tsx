import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';

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
    const navigation = useNavigation();

    useEffect(() => {
        fetchConsultas();
    }, []);

    const fetchConsultas = async () => {
        setLoading(true);
        try {
            const response = await axios.get<Consulta[]>('http://10.0.2.2:3002/imagemSatelite/listar');
            setConsultas(response.data);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGerarNovamente = (item: Consulta) => {
        console.log(`Gerar novamente consulta com ID: ${item.id}`);
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
        backgroundColor: '#f2f2f2',
        padding: 10,
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
});

export default Historico;
