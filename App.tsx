import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import Home from './src/pages/Home';
import CadastroUsuario from './src/pages/CadastroUsuario';
import DatePicker from './src/components/DatePicker';
import FormPage from './src/pages/DataPage';

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
          name="Data" 
          component={FormPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen 
          name="CadastroUsuario" 
          component={CadastroUsuario}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
