import 'react-native-gesture-handler'; []
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/Home';
import Profile from './src/pages/Profile';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile} 
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
