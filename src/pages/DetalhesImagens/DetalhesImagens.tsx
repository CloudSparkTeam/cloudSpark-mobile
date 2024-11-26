import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Button, View, Alert } from 'react-native';
import { ImageCarousel } from '../../components/ImageCarousel/ImageCarousel';
import { ImageDetailsCard } from '../../components/ImageDetailsCard/ImageDetailsCard';
import { FullScreenModal } from '../../components/FullScreenModal/FullScreenModal';
import { fetchTreatedImages } from '../../services/apiService';
import { styles } from './DetalhesImagens.styles';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';  // Importa a biblioteca para manipulação de arquivos
import { PermissionsAndroid } from 'react-native';


function DetalhesImagem({ route }) {
    const { dataImagem, coordenadas, coberturaNuvem } = route.params;
    const [images, setImages] = useState([]);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.id;
                    setUserId(userId);

                    const response = await fetch(`http://10.0.2.2:3002/usuario/listar/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        setIsUserLoggedIn(true);
                        const data = await response.json();
                        console.log("Dados do backend:", data);
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar dados do perfil:', error);
            }
        };

        checkUserLoggedIn();
    }, []);

    useEffect(() => {
        if (userId !== null) {
            const loadImages = async () => {
                try {
                    const data = await fetchTreatedImages(userId);
                    console.log('Imagens carregadas:', data);
                    setImages(data);
                } catch (error) {
                    console.error('Erro ao carregar as imagens:', error);
                    Alert.alert(`Erro: ${error}`);
                }
            };
            loadImages();
        }
    }, [userId]);  // Dependência no userId

    const openFullScreen = (index) => {
        setSelectedIndex(index);
        setIsFullScreen(true);
    };

    const closeFullScreen = () => setIsFullScreen(false);

    const onViewRef = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) setSelectedIndex(viewableItems[0].index);
    });
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const handleDownloadImage = async () => {
        if (images[selectedIndex] && images[selectedIndex].url) {
            const imageUrl = images[selectedIndex].url;
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
    
    

    return (
        <SafeAreaView style={styles.container}>
            <ImageCarousel images={images} onImagePress={openFullScreen} />
            <ImageDetailsCard dataImagem={dataImagem} coordenadas={coordenadas} coberturaNuvem={coberturaNuvem} />
            {isUserLoggedIn && (
                <View style={styles.downloadButtonContainer}>
                    <Button title="Baixar Imagem" onPress={handleDownloadImage} />
                </View>
            )}
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
