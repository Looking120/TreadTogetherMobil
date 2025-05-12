import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';

// Chemin vers une image par défaut (à remplacer par votre propre image)
const DEFAULT_AVATAR = require('../../../assets/default-avatar.jpeg');

const EmployeeCard = ({ employee }) => (
  <TouchableOpacity style={styles.employeeCard}>
    <View style={styles.employeeAvatarContainer}>
      <Image 
        source={employee.avatar && typeof employee.avatar === 'string' 
          ? { uri: employee.avatar } 
          : DEFAULT_AVATAR} 
        style={styles.employeeAvatar}
        defaultSource={DEFAULT_AVATAR}
        onError={() => console.log("Erreur de chargement de l'image")}
      />
      {employee.online && <View style={styles.onlineDot} />}
    </View>
    <View style={styles.employeeInfo}>
      <Text style={styles.employeeName}>{employee.name}</Text>
      <Text style={styles.employeePosition}>{employee.position}</Text>
      <View style={styles.statusContainer}>
        <View style={[
          styles.statusIndicator,
          employee.status === 'available' && { backgroundColor: '#4ecca3' },
          employee.status === 'mission' && { backgroundColor: '#ff9f1c' },
          employee.status === 'meeting' && { backgroundColor: '#e94560' },
          employee.status === 'travel' && { backgroundColor: '#2196F3' },
        ]} />
        <Text style={styles.employeeStatus}>
          {employee.status === 'available' && 'Disponible'}
          {employee.status === 'mission' && 'En mission'}
          {employee.status === 'meeting' && 'En réunion'}
          {employee.status === 'travel' && 'En déplacement'}
        </Text>
      </View>
      <View style={styles.locationContainer}>
        <MaterialIcons name="location-on" size={14} color="#e94560" />
        <Text style={styles.locationText}>{employee.location}</Text>
      </View>
    </View>
    <View style={styles.employeeAction}>
      <Text style={styles.lastSeen}>{employee.lastSeen}</Text>
      <TouchableOpacity style={styles.messageButton}>
        <Feather name="message-circle" size={20} color="#e94560" />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  employeeCard: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    width: 240,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#333',
  },
  employeeAvatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  employeeAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#e94560',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4ecca3',
    borderWidth: 2,
    borderColor: '#16213e',
  },
  employeeInfo: {
    marginBottom: 12,
  },
  employeeName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#fff',
  },
  employeePosition: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  employeeStatus: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  locationText: {
    fontSize: 13,
    color: '#e94560',
    marginLeft: 4,
    fontWeight: '500',
  },
  employeeAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  lastSeen: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  messageButton: {
    padding: 6,
    backgroundColor: 'rgba(233, 69, 96, 0.2)',
    borderRadius: 20,
  },
});

export default EmployeeCard;