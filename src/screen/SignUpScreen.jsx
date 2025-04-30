import React, { useState } from 'react';
import { 
  ImageBackground,
  ScrollView,
  Alert,
  StyleSheet,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthHeader from '../components/auth/signUp/AuthHeader';
import AuthForm from '../components/auth/signUp/AuthForm';
import AuthFooter from '../components/auth/signUp/AuthFooter';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const logo = require('../../assets/images/Logo.png');
  const backgroundImage = require('../../assets/background/overlay_4.jpg');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError('');

    // Validation
    if (Object.values(formData).some(field => !field)) {
      setError('all fields are required.');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match pas.');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigation.navigate('Login');
      Alert.alert('Succès', 'Inscription réussie !');
    } catch (err) {
      setError(err.message || 'Échec de l\'inscription');
      Alert.alert('Erreur', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      blurRadius={5}
    >
      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <AuthHeader 
            logoSource={logo} 
            title="Sign Up" 
          />

          <AuthForm
            formData={formData}
            onInputChange={handleInputChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            error={error}
          />

          <AuthFooter
            loading={loading}
            buttonText="sign up"
            onPress={handleSignUp}
            footerText="already have an account ?"
            linkText="log in"
            onLinkPress={() => navigation.navigate('Login')}
          />
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
    maxWidth: 900,
    borderRadius: 12,
    padding: 25,
  },
});

export default SignUpScreen;