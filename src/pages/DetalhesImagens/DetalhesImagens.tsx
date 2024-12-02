import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, Alert, Button, PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs'; // Biblioteca para gerenciar arquivos
import { ImageCarousel } from '../../components/ImageCarousel/ImageCarousel';
import { ImageDetailsCard } from '../../components/ImageDetailsCard/ImageDetailsCard';
import { FullScreenModal } from '../../components/FullScreenModal/FullScreenModal';
import { styles } from './DetalhesImagens.styles';

function DetalhesImagem({ route }) {
    const { dataImagem, coordenadas, coberturaNuvem, periodo, imagens } = route.params;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Solicitar permissão para acessar o armazenamento
    const requestPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Permissão de Armazenamento',
                    message: 'Este aplicativo precisa de acesso ao armazenamento.',
                    buttonPositive: 'OK',
                }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Permissão necessária', 'Permissão para acessar o armazenamento foi negada.');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    // Solicitar permissão ao carregar o componente
    useEffect(() => {
        requestPermissions();
    }, []);

    // Função para realizar o download da imagem
    const handleDownloadImage = async (index) => {
        if (imagens[index] && imagens[index].url) {
            const imageUrl = imagens[index].url;
            const filename = imageUrl.split('/').pop();
            const path = `${RNFS.ExternalDirectoryPath}/Download/${filename}`;

            try {
                // Verificar ou criar diretório de download
                const downloadDir = `${RNFS.ExternalDirectoryPath}/Download`;
                const dirExists = await RNFS.exists(downloadDir);
                if (!dirExists) {
                    await RNFS.mkdir(downloadDir);
                }

                // Baixar a imagem
                const download = await RNFS.downloadFile({
                    fromUrl: imageUrl,
                    toFile: path,
                }).promise;

                if (download.statusCode === 200) {
                    Alert.alert('Imagem baixada', `A imagem foi salva em: ${path}`);
                } else {
                    Alert.alert('Erro ao baixar', 'Não foi possível baixar a imagem.');
                }
            } catch (error) {
                console.error('Erro ao baixar imagem:', error);
                Alert.alert('Erro', 'Houve um problema ao tentar baixar a imagem.');
            }
        } else {
            Alert.alert('Erro', 'Imagem não encontrada.');
        }
    };

    // Abrir imagem em tela cheia
    const openFullScreen = (index) => {
        setSelectedIndex(index);
        setIsFullScreen(true);
    };

    // Fechar imagem em tela cheia
    const closeFullScreen = () => setIsFullScreen(false);

    // Configurações do carrossel
    const onViewRef = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) setSelectedIndex(viewableItems[0].index);
    });
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    return (
        <SafeAreaView style={styles.container}>
            {/* Carrossel de Imagens com botão de download integrado */}
            <ImageCarousel
                images={imagens}
                onImagePress={openFullScreen}
                onDownloadPress={(index) => handleDownloadImage(index)} // Função de download
            />
            {/* <Picker
                selectedValue={selectedOption}
                onValueChange={handleOptionChange}
                style={styles.picker} // Adicione estilos conforme necessário
            >
                <Picker.Item label="Original" value="original" />
                <Picker.Item label="Máscara de Sombras" value="shadow_mask" />
                <Picker.Item label="Máscara de Nuvem" value="cloud_mask" />
            </Picker> */}

            {/* Detalhes da Imagem */}
            <ImageDetailsCard
                dataImagem={dataImagem}
                coordenadas={coordenadas}
                coberturaNuvem={coberturaNuvem}
                periodo={periodo}
            />

            {/* Botão de Download Geral (opcional) */}
            {/* <View style={styles.downloadButtonContainer}>
                <Button title="Baixar Imagem Atual" onPress={() => handleDownloadImage(selectedIndex)} />
            </View> */}

            {/* Modal de Tela Cheia */}
            <FullScreenModal
                visible={isFullScreen}
                images={imagens}
                selectedIndex={selectedIndex}
                onClose={closeFullScreen}
                onViewRef={onViewRef}
                viewConfigRef={viewConfigRef}
            />
        </SafeAreaView>
    );
}

export default DetalhesImagem;