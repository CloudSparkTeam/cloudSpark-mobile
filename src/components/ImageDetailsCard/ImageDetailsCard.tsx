import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { styles } from './ImageDetailsCard.styles'

export const ImageDetailsCard = ({ dataImagem, coordenadas, coberturaNuvem }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Detalhes da Consulta</Text>
            <Text style={styles.text}>Data da Imagem: {dataImagem}</Text>
            <Text style={styles.text}>Coordenadas:</Text>
            <Text style={styles.text}>Norte: {coordenadas.norte}</Text>
            <Text style={styles.text}>Sul: {coordenadas.sul}</Text>
            <Text style={styles.text}>Leste: {coordenadas.leste}</Text>
            <Text style={styles.text}>Oeste: {coordenadas.oeste}</Text>
            <Text style={styles.text}>Cobertura de Nuvem: {coberturaNuvem}%</Text>
        </View>
    );
};