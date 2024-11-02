import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import GoogleMaps from '../../components/GoogleMaps/GoogleMaps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import PolygonMap from '../../components/PolygonMap/PolygonMap';
import CoordDisplay from '../../components/CoordDisplay/CoordDisplay';
import ClearButton from '../../components/ClearButton/ClearButton';
import { styles } from './BuscaPoligono.styles';
import FormInputs from '../../components/FormularioBusca/FormularioBusca';

function Busca(): React.JSX.Element {
    const [polygonCoords, setPolygonCoords] = useState<{ latitude: number; longitude: number }[]>([]);
    const [north, setNorth] = useState('');
    const [south, setSouth] = useState('');
    const [east, setEast] = useState('');
    const [west, setWest] = useState('');
    const [cloudCoverage, setCloudCoverage] = useState('');
    const [maxScenes, setMaxScenes] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [clicado, setClicado] = useState(false);
    const navigation = useNavigation();

    const handleCoordsChange = (norte: number, sul: number, leste: number, oeste: number) => {
        if (norte && sul && leste && oeste) {
            setNorth(norte.toString());
            setSouth(sul.toString());
            setEast(leste.toString());
            setWest(oeste.toString());
        }
    };

    const handleSearch = async () => {
        if (!north || !south || !east || !west || !startDate || !endDate || !cloudCoverage) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        navigation.navigate('DetalhesImagem', {
            dataImagem: new Date().toISOString(),
            coordenadas: {
                norte: north,
                sul: south,
                leste: east,
                oeste: west,
            },
            coberturaNuvem: cloudCoverage,
        });

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
        } else {
            const errorData = await response.json();
            console.error('Erro ao criar imagem de satélite:', errorData);
        }
    };

    const handlePress = () => {
        setClicado(!clicado);
    };

    const convertToISODate = (dateString: string) => {
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

    const handleMarkerDragEnd = (e: any, index: number) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        const updatedCoords = [...polygonCoords];
        updatedCoords[index] = { latitude, longitude };
        setPolygonCoords(updatedCoords);
        
        // Recalcular os extremos quando os pontos são movidos
        if (updatedCoords.length === 4) {
            calcularExtremos(updatedCoords);
        }
    };

    const handleMapPress = (e: any) => {
        console.log("Map pressed", e.nativeEvent.coordinate);
        const { coordinate } = e.nativeEvent;
        if (polygonCoords.length < 4) {
            const newCoords = [...polygonCoords, coordinate];
            setPolygonCoords(newCoords);
            if (newCoords.length === 4) {
                calcularExtremos(newCoords);
            }
        }
    };

    const calcularExtremos = (coords: { latitude: number; longitude: number }[]) => {
        const latitudes = coords.map((coord) => coord.latitude);
        const longitudes = coords.map((coord) => coord.longitude);
    
        setNorth(Math.max(...latitudes).toString());
        setSouth(Math.min(...latitudes).toString());
        setEast(Math.max(...longitudes).toString());
        setWest(Math.min(...longitudes).toString());
    };

    const limparPontos = () => {
        setPolygonCoords([]);
        setNorth('');
        setSouth('');
        setEast('');
        setWest('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <GoogleMaps onPress={handleMapPress}>
                <PolygonMap coordinates={polygonCoords} onMarkerDragEnd={handleMarkerDragEnd} />
            </GoogleMaps>

            {polygonCoords.length === 4 && (
                <>
                    <CoordDisplay norte={Number(north)} sul={Number(south)} leste={Number(east)} oeste={Number(west)} />
                    <ClearButton onPress={limparPontos} />
                </>
            )}

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
                        <FormInputs
                            north={north}
                            south={south}
                            east={east}
                            west={west}
                            cloudCoverage={cloudCoverage}
                            setCloudCoverage={setCloudCoverage}
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                            maxScenes={maxScenes}
                            setMaxScenes={setMaxScenes}
                            handleSearch={handleSearch}
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

export default Busca;