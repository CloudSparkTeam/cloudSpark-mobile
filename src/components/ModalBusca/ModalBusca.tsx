import React from 'react';
import { View, Modal } from 'react-native';
import BuscaComponent from '../Busca';
import { styles } from '../Overlay/Overlay.styles';

interface ModalBuscaProps {
  visible: boolean;
  onClose: () => void;
}

const ModalBusca: React.FC<ModalBuscaProps> = ({ visible, onClose }) => (
  <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <BuscaComponent onClose={onClose} />
      </View>
    </View>
  </Modal>
);

export default ModalBusca;
