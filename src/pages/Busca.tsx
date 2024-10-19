import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import GoogleMaps from '../components/GoogleMaps';
import DatePicker from '../components/DatePicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../components/Input'; 
import Button from '../components/Button';

const { width } = Dimensions.get('window');

function Busca(): React.JSX.Element {
    const [north, setNorth] = useState('');
    const [south, setSouth] = useState('');
    const [east, setEast] = useState('');
    const [west, setWest] = useState('');
    const [cloudCoverage, setCloudCoverage] = useState('');
    const [maxScenes, setMaxScenes] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [clicado, setClicado] = useState(false);

    const handleCoordsChange = (norte: number, sul: number, leste: number, oeste: number) => {
        if (norte && sul && leste && oeste) {
            setNorth(norte.toString());
            setSouth(sul.toString());
            setEast(leste.toString());
            setWest(oeste.toString());
        }
    };

    const handleSearch = async () => {

        if (!north || !south || !east || !west || !startDate || !endDate || !cloudCoverage ) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
          }

        const response = await fetch('http://10.0.2.2:3002/imagemSatelite/criar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                coordenada_norte: parseFloat(north),
                coordenada_sul: parseFloat(south),
                coordenada_leste: parseFloat(east),
                coordenada_oeste: parseFloat(west),
                data_imagem: new Date().toISOString(), 
                status: 'Ativo',
                startDate: convertToISODate(startDate),
                endDate: convertToISODate(endDate),
                shadowPercentage: 0, 
                cloudPercentage: parseFloat(cloudCoverage),
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Imagem de satélite criada:', data);
        } else {
            const errorData = await response.json();
            console.error('Erro ao criar imagem de satélite:', errorData, startDate, endDate);
        }
    };

    const handlePress = () => {
        setClicado(!clicado);
    };

    const convertToISODate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}T00:00:00Z`).toISOString();
    };

    const handleCloudCoverageChange = (value: string) => {
        const numericValue = Number(value);
        // Aceitar apenas valores entre 0 e 100
        if (value === '' || (numericValue >= 0 && numericValue <= 100)) {
            setCloudCoverage(value);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <GoogleMaps onCoordsChange={handleCoordsChange} />

            <View style={styles.alignBottom}>
                {!clicado && (
                    <TouchableOpacity onPress={handlePress} style={styles.botao}>
                        <Icon name="chevron-up" size={30} color="#0006" />
                    </TouchableOpacity>
                )}

                {clicado && (
                    <View style={styles.formContainer}>
                        <TouchableOpacity onPress={handlePress} style={styles.botao}>
                            <Icon name="chevron-down" size={30} color="#0006" />
                        </TouchableOpacity>

                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            <Input
                                label="Norte"
                                placeholder="Norte..."
                                value={north}
                                onChangeText={() => {}} 
                                editable={false} 
                            />
                            <Input
                                label="Sul"
                                placeholder="Sul..."
                                value={south}
                                onChangeText={() => {}} 
                                editable={false} 
                            />
                            <Input
                                label="Leste"
                                placeholder="Leste..."
                                value={east}
                                onChangeText={() => {}} 
                                editable={false} 
                            />
                            <Input
                                label="Oeste"
                                placeholder="Oeste..."
                                value={west}
                                onChangeText={() => {}} 
                                editable={false} 
                            />
                            <DatePicker
                                label="Data Inicial:"
                                onDateChange={setStartDate}
                                value={startDate}
                            />
                            <DatePicker
                                label="Data Final:"
                                onDateChange={setEndDate}
                                value={endDate}
                            />
                            <Input
                                label="Cobertura de nuvem (máx)"
                                placeholder="Cobertura de nuvem"
                                value={cloudCoverage}
                                onChangeText={handleCloudCoverageChange}
                                keyboardType="numeric"
                            />
                            <Input
                                label="Número de cenas por dataset (máx)"
                                placeholder="Número de cenas por dataset"
                                value={maxScenes}
                                onChangeText={setMaxScenes}
                                keyboardType="numeric"
                            />
                            <Button color="yellow" onPress={handleSearch}>
                                Filtrar
                            </Button>
                        </ScrollView>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 10,
        borderColor: '#0004',
        borderWidth: 2,
        width: width * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    alignBottom: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    botao: {
        width: width * 0.15,
        height: width * 0.15,
        backgroundColor: '#fff',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#0004',
        paddingBottom: 5,
    },
});

export default Busca;