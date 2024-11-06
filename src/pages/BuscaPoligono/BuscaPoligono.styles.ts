import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  
  formContainer: {
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    maxHeight: height * 0.6, // Limite a altura do modal para 60% da altura da tela
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
