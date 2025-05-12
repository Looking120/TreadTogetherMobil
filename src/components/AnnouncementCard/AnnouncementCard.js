import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

const AnnouncementCard = ({ announcement }) => (
  <View style={styles.announcementCard}>
    <View style={styles.announcementHeader}>
      <Image 
        source={announcement.avatar || require('../../../assets/default-avatar.jpeg')} 
        style={styles.announcementAvatar} 
      />
      <View style={styles.announcementAuthorContainer}>
        <Text style={styles.announcementAuthor}>{announcement.author}</Text>
        <Text style={styles.announcementDate}>{announcement.date}</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Feather name="more-horizontal" size={20} color="#e94560" />
      </TouchableOpacity>
    </View>
    
    <Text style={styles.announcementTitle}>{announcement.title}</Text>
    <Text style={styles.announcementDescription}>{announcement.description}</Text>
    
    {announcement.image && (
      <Image 
        source={announcement.image} 
        style={styles.announcementImage} 
      />
    )}
    
    <View style={styles.announcementActions}>
      <TouchableOpacity style={styles.actionButton}>
        <AntDesign name="like2" size={20} color="#e94560" />
        <Text style={styles.actionText}>{announcement.likes}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Feather name="message-circle" size={20} color="#e94560" />
        <Text style={styles.actionText}>{announcement.comments}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Feather name="share-2" size={20} color="#e94560" />
        <Text style={styles.actionText}>Partager</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  announcementCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  announcementAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e94560',
  },
  announcementAuthorContainer: {
    flex: 1,
  },
  announcementAuthor: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
  },
  announcementDate: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  moreButton: {
    padding: 4,
  },
  announcementTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 10,
    paddingHorizontal: 16,
    color: '#fff',
  },
  announcementDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
    paddingHorizontal: 16,
    lineHeight: 22,
  },
  announcementImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  announcementActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#e94560',
    fontWeight: '500',
  },
});

export default AnnouncementCard;