import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  StyleSheet 
} from 'react-native';
import { 
  Ionicons, 
  Feather, 
  MaterialCommunityIcons 
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Header = () => (
  <LinearGradient
    colors={['#1a1a2e', '#16213e']}
    style={styles.header}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <View style={styles.headerContent}>
      <View style={styles.headerTitleContainer}>
        <MaterialCommunityIcons 
          name="map-marker-radius" 
          size={28} 
          color="#e94560" 
        />
        <Text style={styles.headerTitle}>TeamConnect</Text>
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons 
            name="notifications-outline" 
            size={24} 
            color="#fff" 
          />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Feather 
            name="search" 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>
      </View>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 20,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e94560',
  },
});

export default Header;