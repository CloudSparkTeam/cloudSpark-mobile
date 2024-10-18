import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, Dimensions, Modal, TouchableOpacity, FlatList } from 'react-native';

// Dimensões da tela
const { width, height } = Dimensions.get('window');

// Listar os nomes das imagens na pasta
const imageFiles = [
    require('../assets/CBERS4A_WPM_PCA_RGB321_20240930_202_142_thumbnail.png'),
    require('../assets/CBERS4A_WPM_PCA_RGB321_20240930_202_142_thumbnail.png'), // Exemplo de outra imagem
    // Adicione outras imagens conforme necessário
];

function DetalhesImagem({ route }): React.JSX.Element {
    const { dataImagem, coordenadas, coberturaNuvem } = route.params;

    // Estado para controlar a imagem em tela cheia
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Função para abrir a imagem em tela cheia
    const openFullScreen = (index) => {
        setSelectedIndex(index);
        setIsFullScreen(true);
    };

    // Função para fechar o modal de tela cheia
    const closeFullScreen = () => {
        setIsFullScreen(false);
    };

    // Função chamada ao trocar de página no FlatList
    const onViewRef = React.useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setSelectedIndex(viewableItems[0].index);
        }
    });
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

    // Função para definir o layout de cada item
    const getItemLayout = (data, index) => ({
        length: width, // Largura de cada item
        offset: width * index, // Deslocamento do item
        index, // Índice do item
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Detalhes da Imagem</Text>

                {/* Carrossel Horizontal */}
                <FlatList
                    data={imageFiles}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={index} onPress={() => openFullScreen(index)} style={styles.imageWrapper}>
                            <Image source={item} style={styles.image} resizeMode="contain" />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={styles.flatListContent} // Centraliza o conteúdo da FlatList
                />

                <Text style={styles.text}>Data da Imagem: {dataImagem}</Text>
                <Text style={styles.text}>Coordenadas:</Text>
                <Text style={styles.text}>Norte: {coordenadas.norte}</Text>
                <Text style={styles.text}>Sul: {coordenadas.sul}</Text>
                <Text style={styles.text}>Leste: {coordenadas.leste}</Text>
                <Text style={styles.text}>Oeste: {coordenadas.oeste}</Text>
                <Text style={styles.text}>Cobertura de Nuvem: {coberturaNuvem}%</Text>
            </View>

            {/* Modal para exibir a imagem em tela cheia com carrossel */}
            <Modal visible={isFullScreen} transparent={true} animationType="fade">
                <View style={styles.fullScreenContainer}>
                    <FlatList
                        data={imageFiles}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={styles.fullScreenImageWrapper}>
                                <Image source={item} style={styles.fullScreenImage} resizeMode="contain" />
                            </View>
                        )}
                        keyExtractor={(_, index) => index.toString()}
                        initialScrollIndex={selectedIndex}
                        onViewableItemsChanged={onViewRef.current}
                        viewabilityConfig={viewConfigRef.current}
                        getItemLayout={getItemLayout} // Adicione esta linha
                        onScrollToIndexFailed={(info) => {
                            console.warn(`Couldn't scroll to index ${info.index}`, info);
                        }} // Adicione esta linha para lidar com falhas
                        contentContainerStyle={styles.flatListContent} // Centraliza o conteúdo da FlatList no modal
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={closeFullScreen}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    card: {
        width: width * 0.9,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        alignSelf: 'center',
        marginVertical: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    imageWrapper: {
        width: width * 0.81, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListContent: {
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    image: {
        width: width * 0.8, 
        height: height * 0.4,
        borderRadius: 10,
    },
    fullScreenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    fullScreenImageWrapper: {
        width: width, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImage: {
        width: width * 0.9,
        height: height * 0.8,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 15,
        padding: 10,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default DetalhesImagem;
