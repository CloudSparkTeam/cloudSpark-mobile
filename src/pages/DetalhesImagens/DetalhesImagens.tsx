import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, Alert, Button, PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs'; // Importar a biblioteca
import { ImageCarousel } from '../../components/ImageCarousel/ImageCarousel';
import { ImageDetailsCard } from '../../components/ImageDetailsCard/ImageDetailsCard';
import { FullScreenModal } from '../../components/FullScreenModal/FullScreenModal';
import { styles } from './DetalhesImagens.styles';

function DetalhesImagem({ route }) {
    const { dataImagem, coordenadas, coberturaNuvem, periodo, imagens } = route.params;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const requestPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Permissão de Armazenamento',
                    message: 'Este aplicativo precisa de acesso ao armazenamento.',
                    buttonPositive: 'OK', // Botão para conceder a permissão
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Permissão de armazenamento concedida');
            } else {
                console.log('Permissão de armazenamento negada');
            }
        } catch (err) {
            console.warn(err);
        }
    };
    
    useEffect(() => {
        requestPermissions();
    }, []);

    const handleDownloadImage = async () => {
        if (imagens[selectedIndex] && imagens[selectedIndex].url) {
            const imageUrl = imagens[selectedIndex].url;
            const filename = imageUrl.split('/').pop();
            const path = `${RNFS.ExternalDirectoryPath}/Download/${filename}`; // Caminho para a pasta de download
    
            console.log('Caminho da imagem:', path); // Verifique o caminho
    
            try {
                // Verifique se a pasta "Download" existe, se não, crie-a
                const downloadDir = `${RNFS.ExternalDirectoryPath}/Download`;
                const dirExists = await RNFS.exists(downloadDir);
                if (!dirExists) {
                    await RNFS.mkdir(downloadDir);  // Cria a pasta "Download" se não existir
                    console.log('Pasta Download criada.');
                }
    
                // Baixar a imagem
                const download = await RNFS.downloadFile({
                    fromUrl: imageUrl,
                    toFile: path,
                }).promise;
    
                if (download.statusCode === 200) {
                    Alert.alert('Imagem baixada', `A imagem foi salva em: ${path}`);
    
                    // Verificar se o arquivo foi realmente salvo
                    const fileExists = await RNFS.exists(path);
                    console.log('Arquivo existe?', fileExists);  // Deve ser 'true'
    
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
            <ImageCarousel images={imagens} onImagePress={openFullScreen} />
            <ImageDetailsCard
                dataImagem={dataImagem}
                coordenadas={coordenadas}
                coberturaNuvem={coberturaNuvem}
                periodo={periodo}
            />
            <View style={styles.downloadButtonContainer}>
                <Button title="Baixar Imagem" onPress={handleDownloadImage} />
            </View>
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
