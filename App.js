// In App.js in a new project

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import PlantLibraryScreen from './screens/PlantLibraryScreen';
import CareScheduleScreen from './screens/CareScheduleScreen';
import AIChatScreen from './screens/AIChatScreen';
import Settings from './screens/Settings';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Plant Library" component={PlantLibraryScreen} />
        <Stack.Screen name="Care Schedule" component={CareScheduleScreen} />
        <Stack.Screen name="AI Chat" component={AIChatScreen} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;