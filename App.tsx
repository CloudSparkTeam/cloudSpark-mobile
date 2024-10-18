import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import Home from './src/pages/Home';
import CadastroUsuario from './src/pages/CadastroUsuario';
import Busca from './src/pages/Busca';
import VisualizarEditarPerfil from './src/pages/VisualizarEditarPerfil';
import DetalhesImagem from './src/pages/DetalhesImagens';

const Stack = createNativeStackNavigator();

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
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
