import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Swipeable } from 'react-native-gesture-handler';

export default function MyGarden() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    try {
      const storedPlants = await AsyncStorage.getItem('myGarden');
      if (storedPlants) {
        setPlants(JSON.parse(storedPlants));
      } else {
        Alert.alert("No plants found", "Your garden is empty. Add plants from the Plant Library!");
      }
    } catch (error) {
      console.error("Error loading plants:", error);
    }
  };

  const deletePlant = async (index) => {
    try {
      const updatedPlants = [...plants];
      updatedPlants.splice(index, 1);
      setPlants(updatedPlants);
      await AsyncStorage.setItem('myGarden', JSON.stringify(updatedPlants));
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  const renderRightActions = (index) => (
    <TouchableOpacity
      onPress={() => deletePlant(index)}
      className="flex justify-center items-center bg-red-500 w-20 rounded-r-lg"
    >
      <Text className="text-white font-semibold">Delete</Text>
    </TouchableOpacity>
  );

  const renderPlant = ({ item, index }) => (
    <Swipeable renderRightActions={() => renderRightActions(index)}>
      <View className="flex-row items-center bg-white rounded-lg p-4 mb-4 shadow-sm">
        <Image source={{ uri: item.image }} className="w-16 h-16 rounded-lg mr-4" />
        <View className="flex-1">
          <Text className="text-lg font-semibold">{item.name}</Text>
          <Text className="text-gray-500">Probability: {(item.probability * 100).toFixed(2)}%</Text>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <View className="flex-1 p-6 bg-green-50">
      <Text className="text-2xl font-bold text-center mb-6">My Garden</Text>
      <FlatList
        data={plants}
        renderItem={renderPlant}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
