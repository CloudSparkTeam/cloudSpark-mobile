import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    imageWrapper: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListContent: {
        justifyContent: 'center',
    },
    image: {
        width: width * 0.9,
        height: height * 0.5,
        borderRadius: 10,
    },
});