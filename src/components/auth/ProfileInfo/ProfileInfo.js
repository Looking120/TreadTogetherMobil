import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileInfo = ({ name, position, department, isDarkMode }) => {
  return (
    <View style={styles.profileInfo}>
      <Text style={[styles.name, { color: isDarkMode ? '#fff' : '#000' }]}>{name}</Text>
      <Text style={[styles.position, { color: isDarkMode ? '#BB86FC' : '#6200EE' }]}>{position}</Text>
      <Text style={[styles.department, { color: isDarkMode ? '#aaa' : '#666' }]}>{department}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileInfo: {
    marginTop: 70,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: '600',
  },
  department: {
    fontSize: 14,
    marginTop: 2,
  },
});

export default ProfileInfo;