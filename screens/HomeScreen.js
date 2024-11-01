import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to AlaLuz!</Text>
      <Button
        title="Go to Plant Scanner"
        onPress={() => navigation.navigate('Plant Scanner')}
      />
      <Button
        title="Go to My Garden"
        onPress={() => navigation.navigate('My Garden')}
      />
      <Button
        title="Go to AI Chat"
        onPress={() => navigation.navigate('AI Chat')}
      />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 24, marginBottom: 20 }
});
