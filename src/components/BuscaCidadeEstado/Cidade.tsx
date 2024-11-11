import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { buscarCidadesPorEstado } from '../../services/apiService';

interface CidadeComponentProps {
  estadoSelecionado: any;
  cidade: string;
  setCidade: (cidade: string) => void;
}

const CidadeComponent: React.FC<CidadeComponentProps> = ({ estadoSelecionado, cidade, setCidade }) => {
  const [cidades, setCidades] = useState<any[]>([]);
  const [loadingCidades, setLoadingCidades] = useState(false);

  useEffect(() => {
    if (estadoSelecionado) {
      const fetchCidades = async () => {
        setLoadingCidades(true);
        try {
          const cidadesData = await buscarCidadesPorEstado(estadoSelecionado.id);
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

  const cidadesFiltradas = cidades
    .filter((c) => c.nome.toLowerCase().includes(cidade.toLowerCase()))
    .slice(0, 3);

  const handleCidadeSelecionada = (item: { nome: string; }) => {
    setCidade(item.nome);  // Define a cidade selecionada no input
    setCidades([]);  // Limpa a lista de sugestões
  };

  return (
    <View style={{ maxHeight: 300 }}>
      <Text style={styles.label}>Cidade:</Text>
      <TextInput
        placeholder="Digite a cidade"
        value={cidade}
        onChangeText={setCidade}
        style={styles.input}
        autoCapitalize="words"
        placeholderTextColor="#666"
        onBlur={() => {
          if (cidade === '') setCidades([]); // Limpa a lista ao sair do input se não houver texto
        }}
      />
      {loadingCidades && <ActivityIndicator size="small" color="#0000ff" />}
      {cidade !== '' && cidadesFiltradas.length > 0 && (
        <View style={styles.suggestionContainer}>
          <FlatList
            data={cidadesFiltradas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCidadeSelecionada(item)}>
                <Text style={styles.suggestion}>{item.nome}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: '#000',
  },
  suggestionContainer: {
    position: 'absolute',
    top: 75, // Ajuste para ficar logo abaixo do input
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    maxHeight: 150,
    zIndex: 10, // Garante que a lista fique acima de outros componentes
    elevation: 2,
    opacity: 0.75, // Opacidade para o fundo da lista
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color: '#000',
  },
});

export default CidadeComponent;
