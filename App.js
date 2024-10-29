// In App.js in a new project

import "./global.css";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';
import PlantLibraryScreen from './screens/PlantLibraryScreen';
import MyGarden from './screens/MyGarden';
import AIChatScreen from './screens/AIChatScreen';
import Settings from './screens/Settings';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Plant Scanner" component={PlantLibraryScreen} />
          <Stack.Screen name="My Garden" component={MyGarden} />
          <Stack.Screen name="AI Chat" component={AIChatScreen} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;