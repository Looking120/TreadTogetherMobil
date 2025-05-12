import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    const iconColor = '#e94560'; // Couleur d'accent unifiée
    switch(type) {
      case 'project': return <Feather name="folder" size={20} color={iconColor} />;
      case 'meeting': return <Feather name="users" size={20} color={iconColor} />;
      case 'training': return <Feather name="book" size={20} color={iconColor} />;
      default: return <Feather name="activity" size={20} color={iconColor} />;
    }
  };

  return (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}>
        {getActivityIcon(activity.type)}
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>
          {activity.title}
        </Text>
        <View style={styles.activityMeta}>
          <Text style={styles.activityDate}>{activity.date}</Text>
          <View style={styles.separatorDot} />
          <Text style={styles.activityStatus}>{activity.status || activity.duration}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#16213e',
  },
  activityIcon: {
    marginRight: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(233, 69, 96, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDate: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
  },
  activityStatus: {
    color: '#4ecca3', // Vert pour les statuts
    fontSize: 13,
    fontWeight: '500',
  },
  separatorDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 8,
  },
});

export default ActivityItem;