import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { buscarEstados } from '../../services/apiService';

interface EstadoComponentProps {
  estado: string;
  setEstado: (estado: string) => void;
  setEstadoSelecionado: (estadoSelecionado: any) => void;
}

const EstadoComponent: React.FC<EstadoComponentProps> = ({ estado, setEstado, setEstadoSelecionado }) => {
  const [estados, setEstados] = useState<any[]>([]);
  const [loadingEstados, setLoadingEstados] = useState(false);

  useEffect(() => {
    const fetchEstados = async () => {
      setLoadingEstados(true);
      try {
        const estadosData = await buscarEstados();
        setEstados(estadosData);
      } catch (error) {
        console.error('Erro ao buscar estados:', error);
      } finally {
        setLoadingEstados(false);
      }
    };
    fetchEstados();
  }, []);

  const estadosFiltrados = estados
    .filter((e) => e.nome.toLowerCase().includes(estado.toLowerCase()))
    .slice(0, 3);

  const handleEstadoSelecionado = (item: { nome: string; }) => {
    setEstado(item.nome);  // Define o estado selecionado no input
    setEstadoSelecionado(item);  // Define o estado selecionado no componente pai
    setEstados([]);  // Limpa a lista de sugestões
  };

  return (
    <View style={{ maxHeight: 300 }}>
      <Text style={styles.label}>Estado:</Text>
      <TextInput
        placeholder="Digite o estado"
        value={estado}
        onChangeText={(text) => {
          setEstado(text);
          setEstadoSelecionado(null);
        }}
        style={styles.input}
        autoCapitalize="words"
        placeholderTextColor="#666"
        onBlur={() => {
          if (estado === '') setEstados([]); // Limpa a lista ao sair do input se não houver texto
        }}
      />
      {loadingEstados && <ActivityIndicator size="small" color="#0000ff" />}
      {estado !== '' && estadosFiltrados.length > 0 && (
        <View style={styles.suggestionContainer}>
          <FlatList
            data={estadosFiltrados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleEstadoSelecionado(item)}>
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
    marginBottom: 0,
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

export default EstadoComponent;
