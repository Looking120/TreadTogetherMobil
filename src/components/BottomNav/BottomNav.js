import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BottomNav = ({ activeTab }) => {
  const navigation = useNavigation();
  
  // Animations séparées pour chaque bouton
  const scaleValues = {
    home: useRef(new Animated.Value(1)).current,
    map: useRef(new Animated.Value(1)).current,
    center: useRef(new Animated.Value(1)).current,
    messages: useRef(new Animated.Value(1)).current,
    profile: useRef(new Animated.Value(1)).current,
  };

  const handlePressIn = (buttonName) => {
    Animated.spring(scaleValues[buttonName], {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (buttonName) => {
    Animated.spring(scaleValues[buttonName], {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.bottomNav}>
      {/* Colonne gauche */}
      <View style={styles.sideContainer}>
        {/* Bouton Accueil */}
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}
          onPressIn={() => handlePressIn('home')}
          onPressOut={() => handlePressOut('home')}
          activeOpacity={0.8}
        >
          <Animated.View style={[styles.buttonContent, { transform: [{ scale: scaleValues.home }] }]}>
            <MaterialCommunityIcons 
              name="home" 
              size={26} 
              color={activeTab === 'home' ? '#e94560' : 'rgba(255,255,255,0.7)'} 
              style={styles.icon}
            />
            <Text style={[styles.navButtonText, activeTab === 'home' && styles.navButtonTextActive]}>
              Accueil
            </Text>
          </Animated.View>
        </TouchableOpacity>

        {/* Bouton Carte */}
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Map')}
          onPressIn={() => handlePressIn('map')}
          onPressOut={() => handlePressOut('map')}
          activeOpacity={0.8}
        >
          <Animated.View style={[styles.buttonContent, { transform: [{ scale: scaleValues.map }] }]}>
            <MaterialCommunityIcons 
              name="map-marker" 
              size={24} 
              color={activeTab === 'map' ? '#e94560' : 'rgba(255,255,255,0.7)'} 
              style={styles.icon}
            />
            <Text style={[styles.navButtonText, activeTab === 'map' && styles.navButtonTextActive]}>
              Carte
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Bouton Central */}
      <View style={styles.centerButtonWrapper}>
        <TouchableOpacity 
          style={styles.navCenterButton}
          onPress={() => navigation.navigate('NewTask')}
          onPressIn={() => handlePressIn('center')}
          onPressOut={() => handlePressOut('center')}
          activeOpacity={0.8}
        >
          <Animated.View style={[styles.centerButton, { transform: [{ scale: scaleValues.center }] }]}>
            <Feather name="plus" size={28} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Colonne droite */}
      <View style={styles.sideContainer}>
        {/* Bouton Messages */}
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Messages')}
          onPressIn={() => handlePressIn('messages')}
          onPressOut={() => handlePressOut('messages')}
          activeOpacity={0.8}
        >
          <Animated.View style={[styles.buttonContent, { transform: [{ scale: scaleValues.messages }] }]}>
            <MaterialCommunityIcons 
              name="message-text" 
              size={24} 
              color={activeTab === 'messages' ? '#e94560' : 'rgba(255,255,255,0.7)'} 
              style={styles.icon}
            />
            <Text style={[styles.navButtonText, activeTab === 'messages' && styles.navButtonTextActive]}>
              Messages
            </Text>
          </Animated.View>
        </TouchableOpacity>

        {/* Bouton Profil */}
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Profile')}
          onPressIn={() => handlePressIn('profile')}
          onPressOut={() => handlePressOut('profile')}
          activeOpacity={0.8}
        >
          <Animated.View style={[styles.buttonContent, { transform: [{ scale: scaleValues.profile }] }]}>
            <FontAwesome 
              name="user-circle" 
              size={24} 
              color={activeTab === 'profile' ? '#e94560' : 'rgba(255,255,255,0.7)'} 
              style={styles.icon}
            />
            <Text style={[styles.navButtonText, activeTab === 'profile' && styles.navButtonTextActive]}>
              Profil
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#16213e',
    borderTopWidth: 1,
    borderTopColor: '#333',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  sideContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 6,
  },
  buttonContent: {
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    marginBottom: 4,
  },
  navButtonText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
    textAlign: 'center',
  },
  navButtonTextActive: {
    color: '#e94560',
    fontWeight: '600',
  },
  centerButtonWrapper: {
    position: 'absolute',
    left: '50%',
    bottom: 20,
    marginLeft: -30,
    width: 60,
    height: 60,
    zIndex: 10,
  },
  navCenterButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e94560',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#1a1a2e',
  },
});

export default BottomNav;