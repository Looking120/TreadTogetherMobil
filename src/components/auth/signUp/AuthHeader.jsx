import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const AuthHeader = ({ logoSource, title }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={logoSource} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start', 
    marginLeft: 5, 
    width: '100%',
  },
});

export default AuthHeader;