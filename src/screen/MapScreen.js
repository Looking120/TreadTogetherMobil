import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  Dimensions, 
  Linking, 
  ActivityIndicator, 
  Animated 
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import haversine from 'haversine';

const MapScreen = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [route, setRoute] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const panelPosition = useState(new Animated.Value(Dimensions.get('window').height))[0];

  // Données exemple avec design unifié
  const sampleTasks = [
    {
      id: 1,
      title: "Installation réseau fibre",
      address: "12 Rue de la Paix, 75002 Paris",
      coordinates: { latitude: 48.8688, longitude: 2.3292 },
      dueDate: "15/11/2023",
      priority: "high",
      client: "Société ABC",
      phone: "01 23 45 67 89"
    },
    {
      id: 2,
      title: "Maintenance serveur urgent",
      address: "5 Avenue des Champs-Élysées, 75008 Paris",
      coordinates: { latitude: 48.8698, longitude: 2.3079 },
      dueDate: "16/11/2023",
      priority: "medium",
      client: "Entreprise XYZ",
      phone: "01 98 76 54 32"
    }
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission de localisation refusée');
        return;
      }

      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          const newLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          };
          setUserLocation(newLocation);
          
          if (mapRef.current) {
            mapRef.current.animateToRegion(newLocation, 1000);
          }
        }
      );

      setTasks(sampleTasks);
      
      return () => locationSubscription?.remove();
    })();
  }, []);

  const calculateRoute = async (task) => {
    if (!userLocation || !task) return;
    
    const start = { latitude: userLocation.latitude, longitude: userLocation.longitude };
    const end = { latitude: task.coordinates.latitude, longitude: task.coordinates.longitude };
    
    const calculatedDistance = haversine(start, end, { unit: 'km' });
    setDistance(calculatedDistance.toFixed(1));
    
    const calculatedDuration = (calculatedDistance / 4 * 60).toFixed(0);
    setDuration(calculatedDuration);
    
    setRoute({
      coordinates: [start, end],
      strokeWidth: 4,
      strokeColor: '#e94560'
    });
    
    Animated.spring(panelPosition, {
      toValue: 180,
      useNativeDriver: false
    }).start();
  };

  const handleNavigateToTask = (task) => {
    const { latitude, longitude } = task.coordinates;
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`);
  };

  const handleCallClient = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  if (!userLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e94560" />
        <Text style={styles.loadingText}>Initialisation du GPS...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* En-tête unifié */}

      {/* Carte */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={userLocation}
        showsUserLocation={true}
        customMapStyle={mapStyle} // Style personnalisé pour la carte
      >
        {route && (
          <Polyline
            coordinates={route.coordinates}
            strokeWidth={route.strokeWidth}
            strokeColor={route.strokeColor}
          />
        )}

        {tasks.map(task => (
          <Marker
            key={task.id}
            coordinate={task.coordinates}
            onPress={() => {
              setSelectedTask(task);
              calculateRoute(task);
            }}
          >
            <View style={[
              styles.markerContainer,
              { 
                backgroundColor: task.priority === 'high' ? '#e94560' : '#ff9f1c',
                borderColor: '#16213e'
              }
            ]}>
              <MaterialIcons name="place" size={20} color="#fff" />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Panel d'information */}
      <Animated.View style={[styles.taskPanel, { bottom: panelPosition }]}>
        {selectedTask && (
          <>
            <View style={styles.taskHeader}>
              <Text style={styles.taskTitle}>{selectedTask.title}</Text>
              <View style={[
                styles.priorityBadge,
                { backgroundColor: selectedTask.priority === 'high' ? '#e94560' : '#ff9f1c' }
              ]}>
                <Text style={styles.priorityText}>
                  {selectedTask.priority === 'high' ? 'URGENT' : 'NORMAL'}
                </Text>
              </View>
            </View>
            
            <View style={styles.taskDetails}>
              <MaterialIcons name="location-on" size={18} color="#e94560" />
              <Text style={styles.taskAddress}>{selectedTask.address}</Text>
            </View>
            
            <View style={styles.taskDetails}>
              <MaterialIcons name="calendar-today" size={16} color="#e94560" />
              <Text style={styles.taskDate}>Pour le {selectedTask.dueDate}</Text>
            </View>
            
            <View style={styles.taskDetails}>
              <MaterialIcons name="person" size={16} color="#e94560" />
              <Text style={styles.taskClient}>{selectedTask.client}</Text>
            </View>
            
            <View style={styles.routeInfo}>
              <View style={styles.infoBox}>
                <FontAwesome name="road" size={16} color="#e94560" />
                <Text style={styles.infoText}>{distance} km</Text>
              </View>
              
              <View style={styles.infoBox}>
                <MaterialIcons name="access-time" size={16} color="#e94560" />
                <Text style={styles.infoText}>{duration} min</Text>
              </View>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.callButton]}
                onPress={() => handleCallClient(selectedTask.phone)}
              >
                <MaterialIcons name="phone" size={18} color="#fff" />
                <Text style={styles.buttonText}>Appeler</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.navigateButton]}
                onPress={() => handleNavigateToTask(selectedTask)}
              >
                <MaterialIcons name="directions" size={18} color="#fff" />
                <Text style={styles.buttonText}>Y aller</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Animated.View>

      {/* Liste des tâches */}
      <View style={styles.tasksList}>
        <Text style={styles.sectionTitle}>VOS MISSIONS AUJOURD'HUI</Text>
        
        {tasks.map(task => (
          <TouchableOpacity 
            key={task.id}
            style={styles.taskCard}
            onPress={() => {
              setSelectedTask(task);
              calculateRoute(task);
              panelPosition.setValue(180);
            }}
          >
            <View style={styles.taskCardHeader}>
              <View style={[
                styles.taskBullet,
                { backgroundColor: task.priority === 'high' ? '#e94560' : '#ff9f1c' }
              ]} />
              <Text style={styles.taskCardTitle}>{task.title}</Text>
              <MaterialIcons name="chevron-right" size={22} color="#e94560" />
            </View>
            
            <View style={styles.taskCardDetails}>
              <MaterialIcons name="location-on" size={14} color="#e94560" />
              <Text style={styles.taskCardAddress}>{task.address}</Text>
            </View>
            
            <View style={styles.taskCardFooter}>
              <Text style={styles.taskCardDue}>Pour le {task.dueDate}</Text>
              <View style={styles.taskCardClient}>
                <MaterialIcons name="person" size={12} color="#e94560" />
                <Text style={styles.taskCardClientText}>{task.client}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Style personnalisé pour la carte (mode sombre)
const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1a1a2e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16213e'
  },
  loadingText: {
    marginTop: 15,
    color: '#e94560',
    fontSize: 16,
    fontWeight: '500'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 50,
    backgroundColor: '#16213e',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    zIndex: 10
  },
  backButton: {
    padding: 5
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10
  },
  headerRight: {
    width: 28
  },
  errorText: {
    color: '#e94560',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16
  },
  map: {
    width: '100%',
    height: Dimensions.get('window').height * 0.6
  },
  markerContainer: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4
  },
  taskPanel: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#16213e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    zIndex: 5
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginLeft: 10
  },
  priorityText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12
  },
  taskDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  taskAddress: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 8,
    flex: 1
  },
  taskDate: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 8
  },
  taskClient: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 8,
    fontWeight: '500'
  },
  routeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#333'
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5
  },
  callButton: {
    backgroundColor: '#4ecca3'
  },
  navigateButton: {
    backgroundColor: '#e94560'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 15
  },
  tasksList: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#16213e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    paddingBottom: 25,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    zIndex: 1
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e94560',
    marginBottom: 15,
    letterSpacing: 1,
    textAlign: 'center'
  },
  taskCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3
  },
  taskCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  taskBullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10
  },
  taskCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    flex: 1
  },
  taskCardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  taskCardAddress: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 8,
    flex: 1
  },
  taskCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  taskCardDue: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)'
  },
  taskCardClient: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskCardClientText: {
    fontSize: 13,
    color: '#e94560',
    marginLeft: 5,
    fontWeight: '500'
  }
});

export default MapScreen;