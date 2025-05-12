import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const InfoSection = ({ 
  title, 
  items = [], 
  children, 
  isSkills = false, 
  isProjects = false 
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>
      
      {children || (
        <>
          {isSkills && (
            <View style={styles.skillsContainer}>
              {items.map((skill, index) => (
                <View key={index} style={styles.skillPill}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          )}
          
          {isProjects && items.map((project, index) => (
            <View key={index} style={styles.projectRow}>
              <MaterialIcons 
                name="check-circle" 
                size={18} 
                color="#e94560"
                style={styles.projectIcon}
              />
              <Text style={styles.projectText}>
                {project}
              </Text>
            </View>
          ))}
          
          {!isSkills && !isProjects && items.map((item, index) => (
            <View key={index} style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                {item.label}
              </Text>
              <Text style={styles.infoValue}>
                {item.value}
              </Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    margin: 16,
    borderRadius: 12,
    padding: 18,
    backgroundColor: '#16213e',
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  infoLabel: {
    width: 120,
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  skillPill: {
    backgroundColor: 'rgba(233, 69, 96, 0.2)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(233, 69, 96, 0.3)',
  },
  skillText: {
    color: '#e94560',
    fontSize: 13,
    fontWeight: '500',
  },
  projectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  projectIcon: {
    marginRight: 10,
  },
  projectText: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
  },
});

export default InfoSection;