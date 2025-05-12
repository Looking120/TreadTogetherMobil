import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const QuickActionButton = ({ action }) => {
  const [scaleValue] = useState(new Animated.Value(1));
  
  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 50,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.elastic(1.5),
        useNativeDriver: true
      })
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity 
        style={[styles.quickActionButton, { 
          backgroundColor: action.color || '#e94560',
          shadowColor: action.color || '#e94560'
        }]}
        activeOpacity={0.7}
        onPressIn={animatePress}
      >
        <View style={[
          styles.iconContainer,
          { backgroundColor: action.color ? `${action.color}30` : 'rgba(233, 69, 96, 0.2)' }
        ]}>
          <MaterialCommunityIcons 
            name={action.icon} 
            size={28} 
            color="white" 
            style={styles.iconShadow}
          />
        </View>
        <Text style={styles.quickActionText}>{action.title}</Text>
        
        {/* Effet de lumière */}
        <View style={styles.glowEffect} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  quickActionButton: {
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconShadow: {
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  quickActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 4,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  glowEffect: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    height: 30,
    backgroundColor: 'white',
    opacity: 0.1,
    transform: [{ rotate: '15deg' }],
  },
});

export default QuickActionButton;