import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import BuscaComponent from './Busca';

const { width, height } = Dimensions.get('window');

interface OverlayProps {
  centralizarMapa: (cidade: string) => void; // Função para centralizar o mapa
}

const Overlay: React.FC<OverlayProps> = ({ centralizarMapa }) => {
  const [clicado, setClicado] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setClicado(!clicado);
  };

  const handleCloseBusca = () => {
    setModalVisible(false);
  };

  const handleCitySelect = (latitude: number, longitude: number) => {
    centralizarMapa(`${latitude},${longitude}`); // Chama a função para centralizar o mapa
    handleCloseBusca();
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.alignBottom}>
      {!clicado && (
        <TouchableOpacity onPress={handlePress} style={styles.botao}>
          <Icon name="chevron-up" size={30} color="#0006" />
        </TouchableOpacity>
      )}

      {clicado && (
        <View style={styles.container}>
          <TouchableOpacity onPress={handlePress} style={styles.botao}>
            <Icon name="chevron-down" size={30} color="#0006" />
          </TouchableOpacity>
          <View style={styles.overlay}>
            <View style={styles.grid}>
              <View style={styles.gridRow}>
                <View style={styles.container}>
                  {/* Ícone de Lupa que abre o modal */}
                  <TouchableOpacity onPress={handleOpenModal} style={styles.botaoGenerico}>
                    <Icon name="search" size={30} color="#000" />
                  </TouchableOpacity>
                  <Text style={styles.BotaoDesc}>Realizar busca</Text>
                </View>

                <View style={styles.container}>
                  <TouchableOpacity onPress={handlePress} style={styles.botaoGenerico}>
                    <Icon name="pencil" size={30} color="#000" />
                  </TouchableOpacity>
                  <Text style={styles.BotaoDesc}>Desenhar área de busca</Text>
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => console.log('Voltar Pressionado')} style={styles.customButton}>
                <Text style={styles.buttonText}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Avançar Pressionado')} style={styles.customButton}>
                <Text style={styles.buttonText}>Avançar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Modal de busca */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseBusca}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <BuscaComponent onClose={handleCloseBusca} onSearch={handleCitySelect} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 30,
  },
  alignBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
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
    marginTop: 10,
  },
  overlay: {
    marginTop: height * 0.007,
    width: 'auto',
    height: 'auto',
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#0004',
  },
  grid: {
    padding: 20,
    width: width * 0.9,
    flexDirection: 'column',
    gap: height * 0.03,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  botaoGenerico: {
    width: width * 0.2,
    height: width * 0.2,
    backgroundColor: '#FFD700',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0007',
    paddingBottom: 5,
    marginLeft: 25,
  },
  BotaoDesc: {
    marginTop: 5,
    maxWidth: width * 2,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  customButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoFechar: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff5c5c',
    borderRadius: 5,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Overlay;