import React, { useState } from 'react';
import { View, Text, Button, Image, ActivityIndicator, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function PlantLibraryScreen() {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [plantInfo, setPlantInfo] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets[0].uri) {
            const imageUri = result.assets[0].uri;
            setImage(imageUri);
            identifyPlant(imageUri);
        } else {
            console.error("No image selected or invalid URI");
        }
    };

    const identifyPlant = async (uri) => {
        setLoading(true);
        try {
            const base64Image = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const response = await fetch('https://api.plant.id/v3/identification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'bJbO7f4DdsmiHeBhFRtNWqKdqxGT6jrl9YquRuuB2Mj7wahaLf', // Replace with your actual API key
                },
                body: JSON.stringify({
                    images: [`data:image/jpeg;base64,${base64Image}`],
                    similar_images: true,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("API Error Response:", errorText);
                throw new Error("Failed to identify plant. Please check your API key and request setup.");
            }

            const data = await response.json();
            console.log("API Response Data:", data); // Log the response data
            setPlantInfo(data);
        } catch (error) {
            console.error("Error identifying plant:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Plant Library</Text>
            <Button title="Pick an Image" onPress={pickImage} />

            {image && <Image source={{ uri: image }} style={styles.image} />}
            {loading && <ActivityIndicator size="large" color="#00ff00" />}

            {plantInfo && plantInfo.result && plantInfo.result.classification && (
                <View style={styles.results}>
                    {plantInfo.result.is_plant.binary ? (
                        <>
                            <Text style={styles.resultText}>This is a plant!</Text>
                            {plantInfo.result.classification.suggestions.map((suggestion, index) => (
                                <View key={index}>
                                    <Text style={styles.resultText}>Name: {suggestion.name || "Unknown"}</Text>
                                    <Text style={styles.resultText}>
                                        Probability: {(suggestion.probability * 100).toFixed(2)}%
                                    </Text>
                                </View>
                            ))}
                        </>
                    ) : (
                        <Text style={styles.resultText}>This is not a plant.</Text>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    text: { fontSize: 24, marginBottom: 20 },
    image: { width: 200, height: 200, marginTop: 20 },
    results: { marginTop: 20 },
    resultText: { fontSize: 16 },
});
