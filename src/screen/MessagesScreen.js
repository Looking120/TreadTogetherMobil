import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

const MessagesScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Salut! Ça va?', time: '10:30', isMe: false, status: 'read' },
    { id: '2', text: 'Oui super! Et toi?', time: '10:32', isMe: true, status: 'read' },
    { id: '3', text: 'Nickel! Je travaille sur un nouveau projet.', time: '10:33', isMe: false, status: 'read' },
    { id: '4', text: 'Cool! C\'est quoi comme projet?', time: '10:35', isMe: true, status: 'delivered' },
    { id: '5', text: 'Une app de messagerie justement!', time: '10:36', isMe: false, status: 'read' },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);

  const handleSend = () => {
    if (newMessage.trim() === '') return;
    
    const message = {
      id: Date.now().toString(),
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      status: 'sent'
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Scroll vers le nouveau message
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: 0, animated: true });
      }
    }, 100);
  };

  useEffect(() => {
    // Scroll vers le bas au chargement initial
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToIndex({ index: 0, animated: false });
    }
  }, []);

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.isMe ? styles.myMessage : styles.otherMessage
    ]}>
      {!item.isMe && (
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=5' }}
          style={styles.avatar}
        />
      )}
      <View style={[
        styles.messageBubble,
        item.isMe ? styles.myBubble : styles.otherBubble
      ]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <View style={styles.messageFooter}>
          <Text style={styles.messageTime}>{item.time}</Text>
          {item.isMe && (
            <View style={styles.statusIcon}>
              {item.status === 'sent' && <Text style={styles.statusText}>✓</Text>}
              {item.status === 'delivered' && <Text style={styles.statusText}>✓✓</Text>}
              {item.status === 'read' && <Text style={[styles.statusText, styles.readStatus]}>✓✓</Text>}
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header personnalisé */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.headerBackButton}>←</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=5' }}
          style={styles.headerAvatar}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.contactName}>Alex Dupont</Text>
          <Text style={styles.contactStatus}>En ligne</Text>
        </View>
        <TouchableOpacity style={styles.headerCallButton}>
          <Text style={styles.headerCallButtonText}>📞</Text>
        </TouchableOpacity>
      </View>
      
      {/* Fond d'écran de conversation */}
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
        style={styles.backgroundImage}
        blurRadius={5}
      />
      
      {/* Liste des messages avec KeyboardAvoidingView */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          inverted
          style={styles.messagesContainer}
          onContentSizeChange={() => {
            if (flatListRef.current && messages.length > 0) {
              flatListRef.current.scrollToIndex({ index: 0, animated: false });
            }
          }}
          onLayout={() => {
            if (flatListRef.current && messages.length > 0) {
              flatListRef.current.scrollToIndex({ index: 0, animated: false });
            }
          }}
        />
        
        {/* Zone de saisie */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.emojiButton}>
            <Text style={styles.emojiButtonText}>😊</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Écrivez un message..."
            placeholderTextColor="#999"
            multiline
          />
          {newMessage ? (
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>➤</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.attachmentButton}>
              <Text style={styles.attachmentButtonText}>📎</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  flex: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.15,
  },
  messagesContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1a1a2e',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerBackButton: {
    color: '#e94560',
    fontSize: 24,
    marginRight: 15,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#e94560',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  contactName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactStatus: {
    color: '#e94560',
    fontSize: 12,
  },
  headerCallButton: {
    padding: 8,
    backgroundColor: '#e94560',
    borderRadius: 20,
  },
  headerCallButtonText: {
    color: 'white',
    fontSize: 18,
  },
  messagesList: {
    padding: 15,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-end',
  },
  myMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e94560',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
  },
  myBubble: {
    backgroundColor: '#e94560',
    borderBottomRightRadius: 2,
  },
  otherBubble: {
    backgroundColor: '#16213e',
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },
  messageTime: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    marginRight: 4,
  },
  statusIcon: {
    flexDirection: 'row',
  },
  statusText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  readStatus: {
    color: '#4ecca3',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#16213e',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  emojiButton: {
    padding: 10,
    marginRight: 10,
  },
  emojiButtonText: {
    fontSize: 20,
    color: '#e94560',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    backgroundColor: '#1a1a2e',
    color: '#fff',
    fontSize: 16,
  },
  attachmentButton: {
    padding: 10,
    marginLeft: 10,
  },
  attachmentButtonText: {
    fontSize: 20,
    color: '#e94560',
  },
  sendButton: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: '#e94560',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MessagesScreen;