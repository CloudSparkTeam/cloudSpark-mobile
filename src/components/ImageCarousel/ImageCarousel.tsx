import React from 'react';
import { FlatList, Image, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './ImageCarousel.styles';

export function ImageCarousel({ images, onImagePress, onDownloadPress }) {

    // Função para renderizar as imagens no carrossel interno
    const renderInnerItem = ({ item, index }) => (
        <TouchableOpacity style={styles.innerImageWrapper}>
            <Image source={{ uri: item.url }} style={styles.innerImage} />
        </TouchableOpacity>
    );

    // Função para renderizar cada item do carrossel principal
    const renderItem = ({ item, index }) => (
        <View style={styles.imageWrapper}>
            <TouchableOpacity onPress={() => onImagePress(index)}>
                <Image source={{ uri: item.url }} style={styles.image} />
            </TouchableOpacity>

            {/* Carrossel interno com 3 botões */}
            <View style={styles.innerCarouselWrapper}>
                <FlatList
                    data={item.innerImages} // Certifique-se de que há imagens dentro de 'innerImages'
                    renderItem={renderInnerItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

            {/* Botão de download */}
            <View style={styles.buttonWrapper}>
                <TouchableOpacity
                    style={styles.downloadButton}
                    onPress={() => onDownloadPress(index)}
                >
                    <Text style={styles.downloadButtonText}>Baixar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
        />
    );
}