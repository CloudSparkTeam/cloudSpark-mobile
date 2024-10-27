import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Importando o useNavigation

interface BuscaComponentProps {
  onClose: () => void;
  // onSearch: (coordenadas: { norte: number; sul: number; leste: number; oeste: number }) => void;
}

const BuscaComponent: React.FC<BuscaComponentProps> = ({ onClose }) => {
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [estados, setEstados] = useState<any[]>([]);
  const [cidades, setCidades] = useState<any[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState<any>(null);
  const [loadingEstados, setLoadingEstados] = useState(false);
  const [loadingCidades, setLoadingCidades] = useState(false);

  const navigation = useNavigation();  // Hook para navegação

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
          console.log('Cidades carregadas:', cidadesData); // Verifique o conteúdo aqui
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
      const selectedCity = cidades.find((c) =>
        c.nome.toLowerCase() === cidade.toLowerCase()
      );
      console.log('Cidades carregadas:', cidades);
      console.log('Estado Selecionado:', estadoSelecionado);
      console.log('Cidade digitada:', cidade);
  
      // Encode the city and replace %20 with +
      const cityEncoded = encodeURIComponent(cidade).replace(/%20/g, '+');
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?city=${cityEncoded}&format=json&polygon=1&addressdetails=1`,
          {
            headers: {
              'User-Agent': 'cloudSparkMobile/0.0.1',
            },
          }
        );
        const data = await response.json();
        console.log('Resposta da API:', data);
        
        if (data && data.length > 0) {
          const { boundingbox } = data[0];
          const [norte, sul, leste, oeste] = boundingbox.map((coord: string) => parseFloat(coord));
  
          console.log(`Estado: ${estadoSelecionado.nome}, Cidade: ${cidade}`);
          console.log(`BoundingBox: Norte: ${norte}, Sul: ${sul}, Leste: ${leste}, Oeste: ${oeste}`);

          // Navegue para a tela BuscaCidade e passe os valores do boundingbox como parâmetros
          navigation.navigate('BuscaCidade', {
            estado: estadoSelecionado.nome,
            cidade: cidade,
            boundingbox: {
              norte: norte,
              sul: sul,
              leste: leste,
              oeste: oeste,
            },
          });  
        } else {
          console.error('Coordenadas não encontradas para esta cidade.');
        }
      } catch (error) {
        console.error('Erro ao buscar coordenadas:', error);
      }
    } else if (estadoSelecionado) {
      // Apenas busca pelo estado se a cidade não for preenchida
      console.log(`Estado: ${estadoSelecionado.nome}`);
      // Aqui você precisaria definir coordenadas padrão ou lógica para quando apenas o estado for selecionado.
      // Atualmente, o Nominatim exige uma cidade para fornecer o bounding box, então você pode precisar de uma fonte alternativa para os limites dos estados.
    } else {
      console.error('Por favor, selecione um estado ou uma cidade.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Você pode pesquisar somente estado ou estado e cidade. Caso não deseje, pode ir direto clicando em "Avançar".
      </Text>

      <Text style={styles.label}>Estado:</Text>
      <TextInput
        placeholder="Digite o estado"
        value={estado}
        onChangeText={(text) => {
          setEstado(text);
          setEstadoSelecionado(null);
          setCidade(''); // Limpa a cidade ao alterar o estado
          setCidades([]); // Limpa as cidades ao alterar o estado
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
        <Text style={styles.buttonText}>Avançar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose} style={styles.buttonClose}>
        <Text style={styles.buttonCloseText}>Fechar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  suggestionList: {
    marginTop: 8,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonClose: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonCloseText: {
    color: '#333',
    textAlign: 'center',
    fontSize: 16,
  },
  infoText: {
    marginBottom: 12,
    color: '#666',
    fontSize: 14,
  },
});

export default BuscaComponent;