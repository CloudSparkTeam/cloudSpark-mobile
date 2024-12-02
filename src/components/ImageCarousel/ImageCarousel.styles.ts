import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    imageWrapper: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    flatListContent: {
        justifyContent: 'center',
    },
    image: {
        width: width * 0.9,
        height: height * 0.4,
        borderRadius: 10,
    },
    buttonWrapper: {
        marginTop: 10,
        alignItems: 'center',
    },
    downloadButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    downloadButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    // Novo estilo para o carrossel interno
    innerCarouselWrapper: {
        marginTop: 10,
        width: width * 0.9, // Ajuste o tamanho conforme necessário
        alignItems: 'center',
    },
    innerImageWrapper: {
        marginRight: 10, // Espaço entre as imagens internas
    },
    innerImage: {
        width: width * 0.25, // Ajuste o tamanho para que as imagens internas ocupem 1/4 da tela
        height: height * 0.2, // Ajuste a altura
        borderRadius: 5,
    },
    pickerWrapper: {
        width: width * 0.9, // Ajuste para garantir que o Picker ocupe a largura necessária
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10, // Espaço superior para não colidir com a imagem
        marginBottom: 20, // Espaço inferior para manter o layout bem espaçado
        zIndex: 999, // Assegura que o Picker fique acima de outros componentes
    },
    picker: {
        width: width * 0.9, // Largura do Picker
        height: 40, // Tamanho do Picker
        backgroundColor: '#fff', // Cor de fundo do Picker
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc', // Cor de borda para visibilidade
    },
    
});