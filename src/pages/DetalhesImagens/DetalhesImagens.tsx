import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import { ImageCarousel } from '../../components/ImageCarousel/ImageCarousel';
import { ImageDetailsCard } from '../../components/ImageDetailsCard/ImageDetailsCard';
import { FullScreenModal } from '../../components/FullScreenModal/FullScreenModal';
import { fetchTreatedImages } from '../../services/apiService';
import { styles } from './DetalhesImagens.styles';

function DetalhesImagem({ route }) {
    const { dataImagem, coordenadas, coberturaNuvem } = route.params;
    const [images, setImages] = useState([]);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const loadImages = async () => {
            try {
                const data = await fetchTreatedImages();
                setImages(data);
            } catch (error) {
                console.error('Erro ao carregar as imagens:', error);
            }
        };
        loadImages();
    }, []);

    const openFullScreen = (index) => {
        setSelectedIndex(index);
        setIsFullScreen(true);
    };

    const closeFullScreen = () => setIsFullScreen(false);

    const onViewRef = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) setSelectedIndex(viewableItems[0].index);
    });
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    return (
        <SafeAreaView style={styles.container}>
            <ImageCarousel images={images} onImagePress={openFullScreen} />
            <ImageDetailsCard dataImagem={dataImagem} coordenadas={coordenadas} coberturaNuvem={coberturaNuvem} /> 
            <FullScreenModal
                visible={isFullScreen}
                images={images}
                selectedIndex={selectedIndex}
                onClose={closeFullScreen}
                onViewRef={onViewRef}
                viewConfigRef={viewConfigRef}
            />
        </SafeAreaView>
    );
}

export default DetalhesImagem;
