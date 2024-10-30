import React from 'react';
import { View, Modal, FlatList, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import { styles } from './FullScreenModal.styles';

const { width } = Dimensions.get('window');

export const FullScreenModal = ({ visible, images, selectedIndex, onClose, onViewRef, viewConfigRef }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.fullScreenContainer}>
                <FlatList
                    data={images}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.fullScreenImageWrapper}>
                            <Image source={{ uri: item.url }} style={styles.fullScreenImage} resizeMode="contain" />
                        </View>
                    )}
                    keyExtractor={(_, index) => index.toString()}
                    initialScrollIndex={selectedIndex}
                    getItemLayout={(data, index) => (
                        { length: width, offset: width * index, index }
                    )}
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfigRef.current}
                    contentContainerStyle={styles.flatListContent}
                />
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};
