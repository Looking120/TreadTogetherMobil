import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './StoryCircle.styles';

const StoryCircle = ({ story }) => (
  <TouchableOpacity style={styles.storyContainer}>
    <LinearGradient
      colors={story.isUser ? ['#e0e0e0', '#e0e0e0'] : story.viewed ? ['#e0e0e0', '#e0e0e0'] : ['#FFD600', '#FF7A00', '#FF0069']}
      style={styles.storyCircle}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.storyInnerCircle}>
        <Image source={story.avatar} style={styles.storyAvatar} />
        {story.isUser && <Feather name="plus" size={16} color="#6200EE" style={styles.plusIcon} />}
        {story.live && (
          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        )}
      </View>
    </LinearGradient>
    <Text style={styles.storyName} numberOfLines={1}>{story.isUser ? 'Votre story' : story.name}</Text>
  </TouchableOpacity>
);

export default StoryCircle;