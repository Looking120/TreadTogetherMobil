import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const AuthLogo = ({ logoSource, size = 120 }) => {
  return (
    <View style={styles.logoContainer}>
      <Image 
        source={logoSource} 
        style={[styles.logoImage, { width: size, height: size }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logoImage: {
    marginBottom: 10,
  },
});

export default AuthLogo;