import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import CadastroUsuario from '../pages/CadastroUsuario';
import Busca from '../pages/Busca';
import VisualizarEditarPerfil from '../pages/VisualizarEditarPerfil';
import DetalhesImagem from '../pages/DetalhesImagens';
import BuscaCidade from '../pages/BuscaCidade';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Login: undefined;
  CadastroUsuario: undefined;
  Busca: undefined;
  VisualizarEditarPerfil: undefined;
  DetalhesImagem: undefined;
  BuscaCidade: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  return (
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
  );
};

export default StackNavigator;
