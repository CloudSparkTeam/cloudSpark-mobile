import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import EstadoComponent from '../BuscaCidadeEstado/Estado';
import CidadeComponent from '../BuscaCidadeEstado/Cidade';
import {buscarCoordenadasCidade} from '../../services/apiService';
import {styles} from './Busca.styles';

const BuscaComponent: React.FC<{onClose: () => void}> = ({onClose}) => {
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [estadoSelecionado, setEstadoSelecionado] = useState<any>(null);
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (estadoSelecionado && cidade) {
      console.log(`Estado: ${estadoSelecionado.nome}, Cidade: ${cidade}`);
      try {
        const boundingbox = await buscarCoordenadasCidade(cidade);
        if (boundingbox) {
          const [norte, sul, leste, oeste] = boundingbox.map((coord: string) =>
            parseFloat(coord),
          );
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
        console.error('Erro ao buscar coordenadas:', (error as Error).message);
        // Exiba uma mensagem de erro apropriada para o usuário, se necessário
      }
    } else if (estadoSelecionado) {
      console.log(`Estado: ${estadoSelecionado.nome}`);
    } else {
      console.error('Por favor, selecione um estado ou uma cidade.');
    }
  };

  return (
    <View style={styles.modal}>
      <View style={styles.container}>
        <Text style={styles.infoText}>Definir dados da busca</Text>
        <View style={styles.inputContainer}>
          <EstadoComponent
            estado={estado}
            setEstado={setEstado}
            setEstadoSelecionado={setEstadoSelecionado}
          />
        </View>
        {estadoSelecionado && (
          <View style={styles.inputContainer}>
            <CidadeComponent
              estadoSelecionado={estadoSelecionado}
              cidade={cidade}
              setCidade={setCidade}
            />
          </View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onClose} style={styles.buttonClose}>
            <Text style={styles.buttonCloseText}>Fechar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSearch} style={styles.button}>
            <Text style={styles.buttonText}>Avançar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BuscaComponent;
