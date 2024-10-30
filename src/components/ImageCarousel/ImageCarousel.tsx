import React from 'react';
import { FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { styles } from './ImageCarousel.styles';

const { width } = Dimensions.get('window');

export const ImageCarousel = ({ images, onImagePress }) => {
    return (
        <FlatList
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <TouchableOpacity key={index} onPress={() => onImagePress(index)} style={styles.imageWrapper}>
                    <Image source={{ uri: item.url }} style={styles.image} resizeMode="contain" />
                </TouchableOpacity>
            )}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={styles.flatListContent}
            snapToAlignment="center"
            decelerationRate="fast"
            snapToInterval={width}
            bounces={false}
        />
    );
};