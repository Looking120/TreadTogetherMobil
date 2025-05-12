import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  SafeAreaView 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const EditProfileScreen = ({ route, navigation }) => {
  const { profileData, onSave } = route.params;
  const [editedData, setEditedData] = useState(profileData);

  const handleSave = () => {
    if (!editedData.name.trim()) {
      Alert.alert('Erreur', 'Le nom ne peut pas être vide');
      return;
    }
    onSave(editedData);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nom complet</Text>
          <TextInput
            value={editedData.name}
            onChangeText={(text) => setEditedData({...editedData, name: text})}
            style={styles.input}
            placeholder="Votre nom"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Poste</Text>
          <TextInput
            value={editedData.position}
            onChangeText={(text) => setEditedData({...editedData, position: text})}
            style={styles.input}
            placeholder="Votre poste"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={editedData.email}
            onChangeText={(text) => setEditedData({...editedData, email: text})}
            style={styles.input}
            keyboardType="email-address"
            placeholder="Votre email"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Téléphone</Text>
          <TextInput
            value={editedData.phone}
            onChangeText={(text) => setEditedData({...editedData, phone: text})}
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Votre téléphone"
            placeholderTextColor="#666"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#e94560',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#16213e',
    color: '#fff',
    fontSize: 16,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  saveButton: {
    backgroundColor: '#e94560',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;