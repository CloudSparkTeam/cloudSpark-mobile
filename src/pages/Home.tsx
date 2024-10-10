import React from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import Overlay from '../components/Overlay';
import GoogleMaps from '../components/GoogleMaps';
import Icon from 'react-native-vector-icons/Ionicons'; 

interface HomeProps {
  navigation: NavigationProp<any>;
}

function Home({ navigation }: HomeProps): React.JSX.Element {
  const handleIconPress = () => {
    navigation.navigate('Profile'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <GoogleMaps />
      <View style={styles.overlay}>
        <Overlay />
      </View>
      <TouchableOpacity style={styles.iconContainer} onPress={handleIconPress}>
        <Icon name="person-circle" size={60} color="darkblue" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    marginBottom: 10,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  iconContainer: {
    position: 'absolute',
    top: 15,  
    left: 15, 
    zIndex: 3, 
  },
});

export default Home;
