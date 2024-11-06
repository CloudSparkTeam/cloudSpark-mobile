import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, TouchableOpacity, Alert, Text, Dimensions } from 'react-native';
import GoogleMaps from '../components/GoogleMaps/GoogleMaps';
import DatePicker from '../components/DatePicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../components/Input';
import Button from '../components/Button';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'; // Importar o hook de navegação
import FormInputs from '../components/FormularioBusca/FormularioBusca';

const { width } = Dimensions.get('window');

function BuscaCidade(): React.JSX.Element {
  const route = useRoute();
  const { estado, cidade, boundingbox } = route.params as {
    estado: string;
    cidade: string;
    boundingbox: {
      norte: number;
      sul: number;
      leste: number;
      oeste: number;
    } | null;
  };

  const [north, setNorth] = useState(boundingbox?.norte.toString() || '');
  const [south, setSouth] = useState(boundingbox?.sul.toString() || '');
  const [east, setEast] = useState(boundingbox?.leste.toString() || '');
  const [west, setWest] = useState(boundingbox?.oeste.toString() || '');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cloudCoverage, setCloudCoverage] = useState('');
  const [maxScenes, setMaxScenes] = useState('');
  const [clicado, setClicado] = useState(false);

  const navigation = useNavigation();

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
        console.log('Imagem de satélite criada:', data);
    } else {
        const errorData = await response.json();
        console.error('Erro ao criar imagem de satélite:', errorData, startDate, endDate);
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

  return (
    <SafeAreaView style={styles.container}>
      <GoogleMaps />

      <View style={styles.alignBottom}>
        {!clicado && (
          <TouchableOpacity onPress={handlePress} style={styles.botao}>
            <Icon name="chevron-up" size={30} color="#0006" />
          </TouchableOpacity>
        )}

        {clicado && (
          <View style={styles.formContainer}>
            <TouchableOpacity onPress={() => setClicado(!clicado)} style={styles.botao}>
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
};

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
    buttonContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderRadius: 10,
    },
});


export default BuscaCidade;