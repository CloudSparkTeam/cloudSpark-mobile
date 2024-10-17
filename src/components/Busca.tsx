import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

interface BuscaComponentProps {
  onClose: () => void;
  onSearch: (latitude: number, longitude: number) => void;
}

const BuscaComponent: React.FC<BuscaComponentProps> = ({ onClose, onSearch }) => {
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [estados, setEstados] = useState<any[]>([]);
  const [cidades, setCidades] = useState<any[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState<any>(null);
  const [loadingEstados, setLoadingEstados] = useState(false);
  const [loadingCidades, setLoadingCidades] = useState(false);

  // Fetch all states once when the component mounts
  useEffect(() => {
    const fetchEstados = async () => {
      setLoadingEstados(true);
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const estadosData = await response.json();
        setEstados(estadosData);
      } catch (error) {
        console.error('Erro ao buscar estados:', error);
      } finally {
        setLoadingEstados(false);
      }
    };
    fetchEstados();
  }, []);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (estadoSelecionado) {
      const fetchCidades = async () => {
        setLoadingCidades(true);
        try {
          const response = await fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado.id}/municipios`
          );
          const cidadesData = await response.json();
          setCidades(cidadesData);
        } catch (error) {
          console.error('Erro ao buscar cidades:', error);
        } finally {
          setLoadingCidades(false);
        }
      };
      fetchCidades();
    }
  }, [estadoSelecionado]);

  // Filter states as user types and limit to the first 3
  const estadosFiltrados = estados
    .filter((e) => e.nome.toLowerCase().includes(estado.toLowerCase()))
    .slice(0, 3); // Limit to first 3

  // Filter cities as user types and limit to the first 3
  const cidadesFiltradas = cidades
    .filter((c) => c.nome.toLowerCase().includes(cidade.toLowerCase()))
    .slice(0, 3); // Limit to first 3

  // Function to handle search
  const handleSearch = async () => {
    if (estadoSelecionado && cidade) {
      const selectedCity = cidades.find((c) => c.nome.toLowerCase() === cidade.toLowerCase());
      if (selectedCity) {
        // Fetch coordinates using OpenStreetMap Nominatim API
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
              cidade
            )}&state=${encodeURIComponent(estadoSelecionado.nome)}&country=Brazil&format=json`
          );
          const data = await response.json();
          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            onSearch(parseFloat(lat), parseFloat(lon)); // Chama a função original que passa as coordenadas para o mapa
          } else {
            alert('Coordenadas não encontradas para esta cidade.');
          }
        } catch (error) {
          console.error('Erro ao buscar coordenadas:', error);
        }
      } else {
        alert('Cidade não encontrada.');
      }
    } else {
      alert('Por favor, selecione um estado e uma cidade.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Estado:</Text>
      <TextInput
        placeholder="Digite o estado"
        value={estado}
        onChangeText={(text) => {
          setEstado(text);
          setEstadoSelecionado(null);
          setCidade('');
          setCidades([]);
        }}
        style={styles.input}
        autoCapitalize="words"
        placeholderTextColor="#666"
      />
      {loadingEstados && <ActivityIndicator size="small" color="#0000ff" />}
      {estado !== '' && !estadoSelecionado && (
        <FlatList
          data={estadosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          style={styles.suggestionList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setEstado(item.nome);
                setEstadoSelecionado(item);
                setCidade(''); // Limpa a cidade ao selecionar um estado
                setCidades([]); // Limpa as cidades ao selecionar um estado
              }}
            >
              <Text style={styles.suggestion}>{item.nome}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {estadoSelecionado && (
        <>
          <Text style={styles.label}>Cidade:</Text>
          <TextInput
            placeholder="Digite a cidade"
            value={cidade}
            onChangeText={setCidade}
            style={styles.input}
            autoCapitalize="words"
            placeholderTextColor="#666"
          />
          {loadingCidades && <ActivityIndicator size="small" color="#0000ff" />}
          {cidade !== '' && (
            <FlatList
              data={cidadesFiltradas}
              keyExtractor={(item) => item.id.toString()}
              style={styles.suggestionList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setCidade(item.nome);
                    setCidades([]); // Limpa as cidades ao selecionar uma cidade
                  }}
                >
                  <Text style={styles.suggestion}>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </>
      )}

      <TouchableOpacity onPress={handleSearch} style={styles.button}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose} style={styles.buttonClose}>
        <Text style={styles.buttonCloseText}>Fechar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    width: '100%',
    borderRadius: 5,
    color: '#000',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  buttonClose: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff5c5c',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonCloseText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  suggestionList: {
    position: 'absolute',
    top: 80,
    zIndex: 1,
    maxHeight: 150,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  suggestion: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#000',
  },
});

export default BuscaComponent;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

