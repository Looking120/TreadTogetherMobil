import React from 'react';
import { 
  View, 
  FlatList, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity, 
  Text,
  StyleSheet 
} from 'react-native';
import Header from '../components/Header/Header';
import EmployeeCard from '../components/EmployeeCard/EmployeeCard';
import AnnouncementCard from '../components/AnnouncementCard/AnnouncementCard';
import StoryCircle from '../components/StoryCircle/StoryCircle';
import QuickActionButton from '../components/QuickActionButton/QuickActionButton';
import BottomNav from '../components/BottomNav/BottomNav';
import { employees, announcements, stories, quickActions } from '../data/mockData';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stories */}
        <View style={styles.sectionContainer}>
          <FlatList
            data={stories}
            renderItem={({ item }) => <StoryCircle story={item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionContainer}>
          <FlatList
            data={quickActions}
            renderItem={({ item }) => <QuickActionButton action={item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsContent}
          />
        </View>

        {/* Collaborateurs */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Vos collaborateurs
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>
                Tout voir
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={employees}
            renderItem={({ item }) => <EmployeeCard employee={item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
          />
        </View>

        {/* Annonces */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Annonces
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>
                Tout voir
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={announcements}
            renderItem={({ item }) => <AnnouncementCard announcement={item} />}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContent: {
    paddingBottom: 80
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  seeAllText: {
    color: '#e94560',
    fontSize: 15,
    fontWeight: '500',
  },
  horizontalListContent: {
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 10,
  },
  quickActionsContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  }
});

export default HomeScreen;