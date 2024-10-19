import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function Profile(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Icon name="person-circle" size={180} color="gray" />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>Nome do Usuário</Text>
          <Text style={styles.email}>email@exemplo.com</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'flex-start', 
    padding: 20, 
  },
  profileContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20, 
  },
  detailsContainer: {
    marginLeft: 10, 
    alignItems: 'flex-start', 
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  email: {
    fontSize: 16,
    color: 'black',
  },
});

export default Profile;
