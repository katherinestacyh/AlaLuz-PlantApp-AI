import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyGarden() {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        loadPlants();
    }, []);

    // Function to load plants from AsyncStorage
    const loadPlants = async () => {
        try {
            const storedPlants = await AsyncStorage.getItem('myGarden');
            if (storedPlants) {
                const parsedPlants = JSON.parse(storedPlants);
                //console.log("Loaded plants:", parsedPlants); // Debug log
                setPlants(parsedPlants);
            } else {
                Alert.alert("No plants found", "Your garden is empty. Add plants from the Plant Library!");
            }
        } catch (error) {
            console.error("Error loading plants:", error);
        }
    };

    const renderPlant = ({ item }) => {
        //console.log("Rendering plant with image URI:", item.image); // Debug log, worked!!!!
        return (
            <View style={styles.plantContainer}>
                <Image source={{ uri: item.image }} style={styles.plantImage} />
                <View style={styles.plantDetails}>
                    <Text style={styles.plantName}>{item.name}</Text>
                    <Text>Probability: {(item.probability * 100).toFixed(2)}%</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Garden</Text>
            <FlatList
                data={plants}
                renderItem={renderPlant}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f0f8e0' },
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    listContent: { paddingBottom: 20 },
    plantContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    plantImage: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
    plantDetails: { flex: 1 },
    plantName: { fontSize: 18, fontWeight: 'bold' },
});
