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
        height: height * 0.5,
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
});