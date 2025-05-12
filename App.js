import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, View, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './src/screen/HomeScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import EditProfileScreen from './src/screen/EditProfileScreen';
import MapScreen from './src/screen/MapScreen';
import MessagesScreen from './src/screen/MessagesScreen';
import NewTaskScreen from './src/screen/NewTaskScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#16213e" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#16213e',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 1,
              borderBottomColor: '#333',
            },
            headerTitleStyle: {
              color: '#fff',
              fontSize: 18,
              fontWeight: '600',
            },
            headerTintColor: '#e94560',
            headerBackTitleVisible: false,
            cardStyle: {
              backgroundColor: '#1a1a2e',
            },
          }}
        >
          {/* Écran Accueil - Pas de header */}
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />
          
          {/* Écran Carte */}
          <Stack.Screen 
            name="Map" 
            component={MapScreen}
            options={({ navigation }) => ({
              title: 'Interventions',
              headerRight: () => (
                <TouchableOpacity 
                  style={{ marginRight: 15 }}
                  onPress={() => console.log('Search pressed')}
                >
                  <MaterialIcons name="search" size={24} color="#e94560" />
                </TouchableOpacity>
              ),
            })}
          />
          
          {/* Écran Profil */}
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={({ navigation }) => ({
              title: 'Mon Profil',
              headerRight: () => (
                <TouchableOpacity 
                  style={{ marginRight: 15 }}
                  onPress={() => navigation.navigate('Settings')}
                >
                  <MaterialIcons name="settings" size={24} color="#e94560" />
                </TouchableOpacity>
              ),
            })}
          />
          
          {/* Écran Modifier Profil */}
          <Stack.Screen 
            name="EditProfile" 
            component={EditProfileScreen}
            options={({ navigation }) => ({
              title: 'Modifier Profil',
              headerRight: () => (
                <TouchableOpacity 
                  style={{ marginRight: 15 }}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={{ color: '#e94560', fontWeight: '500' }}>Enregistrer</Text>
                </TouchableOpacity>
              ),
            })}
          />
          
          {/* Écran Messages */}
          <Stack.Screen 
            name="Messages" 
            component={MessagesScreen}
            options={({ navigation }) => ({
              title: 'Messagerie',
              headerRight: () => (
                <TouchableOpacity 
                  style={{ marginRight: 15 }}
                  onPress={() => console.log('New message pressed')}
                >
                  <MaterialIcons name="edit" size={24} color="#e94560" />
                </TouchableOpacity>
              ),
            })}
          />
          
          {/* Écran Nouvelle Tâche */}
          <Stack.Screen 
            name="NewTask" 
            component={NewTaskScreen}
            options={({ navigation }) => ({
              title: 'Créer Tâche',
              headerRight: () => (
                <TouchableOpacity 
                  style={{ marginRight: 15 }}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={{ color: '#e94560', fontWeight: '500' }}>Publier</Text>
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}