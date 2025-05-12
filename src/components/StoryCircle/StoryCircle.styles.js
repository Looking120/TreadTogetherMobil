import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  storyContainer: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  storyCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  storyInnerCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  storyAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  plusIcon: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 2,
  },
  liveBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FF0000',
    paddingVertical: 2,
  },
  liveText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  storyName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});