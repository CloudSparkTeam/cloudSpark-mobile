import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: 320,
    height: 370, // Altura fixa para o modal
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative', // Permite posicionar os botões fixamente
  },
  infoText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
    position: 'relative',
  },
  input: {
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  suggestionList: {
    position: 'absolute',
    top: 42, // Abaixo do input
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    maxHeight: 150,
    zIndex: 10, // Aumentar o zIndex
    elevation: 2,
    opacity: 0.75, // Opacidade aplicada
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 20, // Mantém os botões na parte inferior do modal
    paddingHorizontal: 20,
    zIndex: 5, // ZIndex menor que o da lista de sugestões
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    borderRadius: 10,
    width: '48%', // Mantém o mesmo tamanho para ambos os botões
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: 'lightgray',
    paddingVertical: 12,
    borderRadius: 10,
    width: '48%', // Mantém o mesmo tamanho para ambos os botões
    alignItems: 'center',
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonCloseText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
