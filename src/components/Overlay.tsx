// screens/Home.tsx
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
const { width, height } = Dimensions.get('window');

const overlay: React.FC = () => {

    const [clicado, setClicado] = useState(false);
    const handlePress = () => {
        console.log('Botão clicado!');
        setClicado(!clicado);
    };

    return (
        <View style={styles.alignBottom}>
            {!clicado && (
                <TouchableOpacity onPress={handlePress} style={styles.botao}>
                    <Icon name="chevron-up" size={30} color="#0006" />
                </TouchableOpacity>
            )}


            {clicado && (
                <View style={styles.container}>
                    <TouchableOpacity onPress={handlePress} style={styles.botao}>
                        <Icon name="chevron-down" size={30} color="#0006" />
                    </TouchableOpacity>
                    <View style={styles.overlay}>
                        <View style={styles.grid}>
                            <View style={styles.gridRow} >
                                <View style={styles.container}>
                                    <TouchableOpacity onPress={handlePress} style={styles.botaoGenerico}>
                                        <Icon name="search" size={30} color="#0006" />
                                    </TouchableOpacity>
                                    <Text style={styles.BotaoDesc}>
                                        Realizar busca
                                    </Text>
                                </View>

                                <View style={styles.container}>
                                    <TouchableOpacity onPress={handlePress} style={styles.botaoGenerico}>
                                        <Icon name="pencil" size={30} color="#0006" />
                                    </TouchableOpacity>
                                    <Text style={styles.BotaoDesc}>
                                        Desenhar área de busca
                                    </Text>
                                    
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff', // Fundo branco
    },
    alignBottom: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    botao: {
        width: width * 0.15,
        height: width * 0.15,
        backgroundColor: '#fff',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#0004',
        paddingBottom: 5,
    },

    overlay: {
        marginTop:height*0.007,
        width: 'auto',
        height: 'auto',
        borderRadius: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#0004',

    },
    grid: {
        padding: 10,
        width: width * 0.9,
        flexDirection: "column",
        gap: height * 0.05
    },

    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',


    },
    botaoGenerico: {
        width: width * 0.2,
        height: width * 0.2,
        backgroundColor: '#FFD700',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#0004',
        paddingBottom: 5,
    },BotaoDesc: {
        marginTop: 5,
        maxWidth: width * 0.2,
        textAlign: 'center',
        flexWrap: 'wrap',
    },
});

export default overlay;