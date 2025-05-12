import React, { useCallback, useState } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  ScrollView, 
  Alert,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthLogo from '../components/auth/login/AuthLogo';
import AuthInput from '../components/auth/login/AuthInput';
import AuthButton from '../components/auth/login/AuthButton';
import { signIn } from '../utils/authService';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const logo = require('../../assets/images/Logo.png');
  const backgroundImage = require('../../assets/background/overlay_4.jpg');

  // Validation des champs
  const validateForm = useCallback(() => {
    if (!email.trim()) {
      setError('Veuillez entrer votre email');
      return false;
    }
    
    if (!password.trim()) {
      setError('Veuillez entrer votre mot de passe');
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Veuillez entrer un email valide');
      return false;
    }
    
    setError('');
    return true;
  }, [email, password]);

  // Gestion de la connexion
  const handleLogin = useCallback(async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      console.log('Tentative de connexion avec:', email);
      const response = await signIn(email, password);
      
      console.log('Connexion réussie:', response);
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      
    } catch (error) {
      console.error('Échec de la connexion:', {
        message: error.message,
        code: error.code,
        stack: error.stack
      });
      
      let errorMessage = 'Une erreur est survenue';
      
      if (error.message.includes('Network request failed')) {
        errorMessage = 'Problème de connexion. Vérifiez votre internet.';
      } else if (error.message.includes('401')) {
        errorMessage = 'Email ou mot de passe incorrect';
      } else if (error.message.includes('400')) {
        errorMessage = 'Requête invalide. Vérifiez vos informations.';
      }
      
      setError(errorMessage);
      Alert.alert('Erreur', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [email, password, navigation, validateForm]);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      blurRadius={5}
      resizeMode="cover"
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <AuthLogo logoSource={logo} size={120} />
          
          <Text style={styles.title}>Connexion</Text>

          <AuthInput
            placeholder="Adresse email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
          />

          <AuthInput
            placeholder="Mot de passe"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError('');
            }}
            secureTextEntry
            autoComplete="password"
            textContentType="password"
          />

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          <AuthButton
            title={loading ? "Connexion en cours..." : "Se connecter"}
            onPress={handleLogin}
            loading={loading}
            disabled={!email || !password || loading}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Pas de compte ? </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('SignUp')}
              disabled={loading}
            >
              <Text style={styles.footerLink}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    padding: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#333',
    textAlign: 'left',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  footerLink: {
    color: '#6200ee',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default LoginScreen;