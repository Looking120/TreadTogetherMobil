import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ProfileHeader = ({ coverPhoto, avatar, onEditPress }) => {
  return (
    <View style={styles.coverContainer}>
      <Image 
        source={coverPhoto} 
        style={styles.coverPhoto} 
        resizeMode="cover"
      />
      
      <View style={styles.overlay} />
      
      <TouchableOpacity 
        style={styles.editButton}
        onPress={onEditPress}
      >
        <Feather name="edit" size={20} color="#fff" />
      </TouchableOpacity>
      
      <View style={styles.avatarContainer}>
        <Image 
          source={avatar} 
          style={styles.avatar} 
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  coverContainer: {
    height: 200,
    position: 'relative',
    marginBottom: 70, // Space for avatar
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'rgba(22, 33, 62, 0.6)', // #16213e with opacity
  },
  editButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(233, 69, 96, 0.8)', // #e94560 with opacity
    zIndex: 1,
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -80,
    left: 20,
    borderWidth: 4,
    borderColor: '#16213e',
    borderRadius: 75,
    padding: 4,
    backgroundColor: '#1a1a2e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#e94560',
  },
});

export default ProfileHeader;