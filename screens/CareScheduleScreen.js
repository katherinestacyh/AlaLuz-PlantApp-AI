import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CareScheduleScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Care Schedule</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 24 }
});
