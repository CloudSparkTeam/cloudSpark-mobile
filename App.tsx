import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import Profile from './src/pages/Profile';
import Login from './src/pages/Login';
import CadastroUsuario from './src/pages/CadastroUsuario';
import Busca from './src/pages/Busca';
import VisualizarEditarPerfil from './src/pages/VisualizarEditarPerfil';
import DetalhesImagem from './src/pages/DetalhesImagens';
import BuscaCidade from './src/pages/BuscaCidade';

// Definindo o tipo das rotas
export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Login: undefined;
  CadastroUsuario: undefined;
  Busca: undefined;
  VisualizarEditarPerfil: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          name="CadastroUsuario"
          component={CadastroUsuario}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Busca"
          component={Busca}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="VisualizarEditarPerfil"
          component={VisualizarEditarPerfil}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="DetalhesImagem"
          component={DetalhesImagem}
        />
        <Stack.Screen
          name="BuscaCidade"
          component={BuscaCidade}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;