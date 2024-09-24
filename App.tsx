import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import axios from 'axios';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [message, setMessage] = useState<string | null>(null); // Estado para armazenar a resposta do backend

  useEffect(() => {
    // Fazendo a requisição ao backend
    axios.get('http://10.0.2.2:3002/') // Acessa a rota '/' para verificar o backend
      .then(response => {
        setMessage(response.data); // Armazena a resposta do backend no estado
      })
      .catch(error => {
        console.error('Erro ao conectar com o backend:', error);
        setMessage('Erro ao conectar com o backend.'); // Exibe uma mensagem de erro, se ocorrer
      });
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor}/>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={{backgroundColor: isDarkMode ? Colors.black : Colors.white}}>
          <Text style={styles.title}>Verificação do Backend</Text>
          {/* Exibe a resposta do backend */}
          <Text>{message ? message : 'Conectando ao backend...'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
