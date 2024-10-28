import React, { useState } from 'react';
import { View, Text, Button, Image, ActivityIndicator, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function PlantLibraryScreen() {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [plantInfo, setPlantInfo] = useState(null);

//Function to pick an image
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        });

        if (!result.canceled) {
        setImage(result.uri);
        identifyPlant(result.uri);
        }
    };

    const identifyPlant = async (uri) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('images', {
                uri, 
                name: 'plant.jpg',
                type: 'image/jpeg',
            });

            const response = await fetch('https://plant.id/api/v3/identification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Api-Key': 'bJbO7f4DdsmiHeBhFRtNWqKdqxGT6jrl9YquRuuB2Mj7wahaLf', 
                },
                body: formData,
            });

            const data = await response.json();
            setPlantInfo(data);
        }   
            catch (error){
            console.error("Error identifying plant:", error);
            }   
            finally {
            setLoading(false);
            }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Plant Library</Text>
      <Button title="Pick an Image" onPress={pickImage} />

      {image && <Image source={{ uri: image }} style={styles.image} />}
      {loading && <ActivityIndicator size="large" color="#00ff00" />}

      {plantInfo && (
        <View style={styles.results}>
            <Text style={styles.resultText}>
                Plant identified: {plantInfo.suggestions[0]?.plant_name || "Unknown"}
            </Text>
            <Text style={styles.resultText}>
                Probability: {(plantInfo.suggestions[0]?.probability * 100).toFixed(2)}%
            </Text>
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
