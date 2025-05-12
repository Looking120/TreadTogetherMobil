import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Configuration de l'instance Axios
const apiClient = axios.create({
  baseURL: __DEV__ ? 'http://192.168.0.1:7294/api' : 'https://votre-api-production.com/api',
  timeout: 10000, // 10 secondes timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const authService = {
  signIn: async (email, password) => {
    try {
      console.log(`Tentative de connexion à: ${apiClient.defaults.baseURL}/auth/signin`);

      const response = await apiClient.post('/auth/signin', {
        email: email.trim(),
        password: password.trim()
      });

      // Si la réponse est réussie
      const { accessToken, user } = response.data;
      
      await AsyncStorage.multiSet([
        ['userToken', accessToken],
        ['user', JSON.stringify(user)]
      ]);

      return response.data;
    } catch (error) {
      console.error('Erreur de connexion:', {
        message: error.message,
        response: error.response?.data,
        code: error.code
      });

      let errorMessage = 'Impossible de se connecter au serveur';
      
      if (error.response) {
        // Erreur avec réponse du serveur
        errorMessage = error.response.data?.message || 
                       `Erreur ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        errorMessage = 'Pas de réponse du serveur. Vérifiez votre connexion.';
      }

      throw new Error(errorMessage);
    }
  },

  // Méthode pour ajouter le token aux requêtes suivantes
  setAuthToken: async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
    }
  },

  // Méthode pour se déconnecter
  signOut: async () => {
    await AsyncStorage.multiRemove(['userToken', 'user']);
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// Initialisation du token au démarrage
(async () => {
  await authService.setAuthToken();
})();