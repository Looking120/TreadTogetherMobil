import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AuthForm = ({
  formData,
  onInputChange,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  error
}) => {
  return (
    <View style={styles.container}>
      {/* Ligne 1: Prénom et Nom */}
      <View style={styles.inputRow}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(text) => onInputChange('firstName', text)}
          />
        </View>
        
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.lastName}
            onChangeText={(text) => onInputChange('lastName', text)}
          />
        </View>
      </View>

      {/* Ligne 2: Date de naissance et Username */}
      <View style={styles.inputRow}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Date Of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            value={formData.birthDate}
            onChangeText={(text) => onInputChange('birthDate', text)}
          />
        </View>
        
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>User Name</Text>
          <TextInput
            style={styles.input}
            placeholder="User Name"
            value={formData.userName}
            onChangeText={(text) => onInputChange('userName', text)}
          />
        </View>
      </View>

      {/* Ligne 3: Email */}
      <View style={styles.inputRow}>
        <View style={[styles.inputWrapper, styles.fullWidth]}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="email@exemple.com"
            value={formData.email}
            onChangeText={(text) => onInputChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Ligne 4: Mot de passe */}
      <View style={styles.inputRow}>
        <View style={[styles.inputWrapper, styles.fullWidth]}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => onInputChange('password', text)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon 
                name={showPassword ? 'eye' : 'eye-off'} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Ligne 5: Confirmation mot de passe */}
      <View style={styles.inputRow}>
        <View style={[styles.inputWrapper, styles.fullWidth]}>
          <Text style={styles.label}>Password Confirmation</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password Confirmation"
              value={formData.confirmPassword}
              onChangeText={(text) => onInputChange('confirmPassword', text)}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Icon 
                name={showConfirmPassword ? 'eye' : 'eye-off'} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  fullWidth: {
    flex: 2, // Prend toute la largeur
    marginHorizontal: 0,
  },
  label: {
    marginBottom: 5,
    fontWeight: '600',
    color: '#333',
    fontSize: 14,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  iconButton: {
    padding: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default AuthForm;