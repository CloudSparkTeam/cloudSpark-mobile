import React, { useState } from 'react';
import { FlatList, Image, View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importa o Picker
import { styles } from './ImageCarousel.styles';

export function ImageCarousel({ images, onImagePress, onDownloadPress }) {
    // Estado para armazenar a opção selecionada para cada item
    const [selectedOption, setSelectedOption] = useState(
        images.map(() => 'original') // Inicializa com 'original' para cada imagem
    );

    // Função para renderizar cada item do carrossel principal
    const renderItem = ({ item, index }) => {
        // Lógica para selecionar a URL correta baseada na opção escolhida
        const getImageUrl = (option) => {
            // Extraímos o nome do arquivo da URL completa
            const fileName = item.url.split('/').pop(); // Obtém a última parte da URL (nome do arquivo)

            // Agora ajustamos o nome da imagem com os sufixos desejados
            switch (option) {
                case 'shadowMask':
                    return item.url.replace(fileName, fileName.replace('_original_thumbnail.png', '_overexposed_thumbnail.png')); // Máscara de Sombra
                case 'cloudMask':
                    return item.url.replace(fileName, fileName.replace('_original_thumbnail.png', '_segmented_thumbnail.png')); // Máscara de Nuvem
                default:
                    return item.url; // Imagem Original
            }
        };

        return (
            <View style={styles.imageWrapper}>
                <TouchableOpacity onPress={() => onImagePress(index)}>
                    <Image source={{ uri: getImageUrl(selectedOption[index]) }} style={styles.image} />
                </TouchableOpacity>

                {/* Carrossel interno com 3 botões */}
                <View style={styles.innerCarouselWrapper}>
                    <FlatList
                        data={item.innerImages} // Certifique-se de que há imagens dentro de 'innerImages'
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                {/* Picker para selecionar a opção de imagem */}
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={selectedOption[index]} // Valor selecionado para o item atual
                        onValueChange={(itemValue) => {
                            // Atualiza a opção selecionada para este item específico
                            const newSelectedOption = [...selectedOption];
                            newSelectedOption[index] = itemValue;
                            setSelectedOption(newSelectedOption);
                        }}
                        style={styles.picker}
                    >
                        <Picker.Item label="Imagem Original" value="original" />
                        <Picker.Item label="Máscara de Sombra" value="shadowMask" />
                        <Picker.Item label="Máscara de Nuvem" value="cloudMask" />
                    </Picker>
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
    };

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
