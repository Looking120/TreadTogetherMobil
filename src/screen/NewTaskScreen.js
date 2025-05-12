import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';

const TaskItem = ({ task }) => (
  <View style={[
    styles.taskCard,
    task.priority === 'high' && styles.highPriority,
    task.priority === 'medium' && styles.mediumPriority,
    task.priority === 'low' && styles.lowPriority
  ]}>
    <View style={styles.taskHeader}>
      <Text style={styles.taskTitle}>{task.title}</Text>
      <Text style={styles.taskDueDate}>{task.dueDate}</Text>
    </View>
    <Text style={styles.taskDescription}>{task.description}</Text>
    <View style={styles.taskFooter}>
      <Text style={styles.taskCategory}>{task.category}</Text>
      <Text style={styles.taskStatus}>{task.status}</Text>
    </View>
    {task.assigner && (
      <View style={styles.assignerInfo}>
        <Image 
          source={{ uri: task.assigner.avatar }} 
          style={styles.assignerAvatar}
        />
        <Text style={styles.assignerName}>Assigné par {task.assigner.name}</Text>
      </View>
    )}
  </View>
);

const AssignedTasksScreen = () => {
  // Exemple de données de tâches assignées
  const tasks = [
    {
      id: '1',
      title: 'Révision du design',
      description: 'Revoir les maquettes UI et proposer des améliorations',
      dueDate: '15/06/2023',
      priority: 'high',
      category: 'Design',
      status: 'En cours',
      assigner: {
        name: 'Marie Dupont',
        avatar: 'https://i.pravatar.cc/150?img=32',
        department: 'Direction'
      }
    },
    {
      id: '2',
      title: 'Rapport mensuel',
      description: 'Préparer le rapport des performances du mois dernier',
      dueDate: '20/06/2023',
      priority: 'medium',
      category: 'Rapports',
      status: 'À commencer',
      assigner: {
        name: 'Jean Martin',
        avatar: 'https://i.pravatar.cc/150?img=45',
        department: 'Management'
      }
    },
    {
      id: '3',
      title: 'Mise à jour documentation',
      description: 'Actualiser la documentation technique pour la v2.1',
      dueDate: '25/06/2023',
      priority: 'low',
      category: 'Technique',
      status: 'En attente',
      assigner: {
        name: 'Sophie Lambert',
        avatar: 'https://i.pravatar.cc/150?img=28',
        department: 'Dev'
      }
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes Tâches Assignées</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filtres</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des tâches */}
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskItem task={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Aucune tâche assignée</Text>
          </View>
        }
      />

      {/* Stats rapides */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, styles.inProgress]}>1</Text>
          <Text style={styles.statLabel}>En cours</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, styles.pending]}>1</Text>
          <Text style={styles.statLabel}>En attente</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, styles.completed]}>0</Text>
          <Text style={styles.statLabel}>Terminées</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: '#16213e',
  },
  filterButtonText: {
    color: '#e94560',
    fontSize: 14,
  },
  listContent: {
    padding: 15,
  },
  taskCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#e94560',
  },
  highPriority: {
    borderLeftColor: '#e94560',
  },
  mediumPriority: {
    borderLeftColor: '#ff9f1c',
  },
  lowPriority: {
    borderLeftColor: '#4ecca3',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  taskTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  taskDueDate: {
    color: '#e94560',
    fontSize: 14,
    marginLeft: 10,
  },
  taskDescription: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 12,
  },
  taskCategory: {
    color: '#e94560',
    fontSize: 12,
    fontWeight: '500',
  },
  taskStatus: {
    color: '#4ecca3',
    fontSize: 12,
    fontWeight: '500',
  },
  assignerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  assignerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  assignerName: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  emptyStateText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#16213e',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 4,
  },
  inProgress: {
    color: '#ff9f1c',
  },
  pending: {
    color: '#e94560',
  },
  completed: {
    color: '#4ecca3',
  },
});

export default AssignedTasksScreen;