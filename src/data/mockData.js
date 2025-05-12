export const stories = [
    { id: '1', name: 'Votre story', avatar: require('../../assets/avatar1.jpg'), isUser: true },
    { id: '2', name: 'Jean', avatar: require('../../assets/avatar2.png'), viewed: false },
    { id: '3', name: 'Marie', avatar: require('../../assets/avatar3.jpg'), viewed: false, live: true },
    { id: '4', name: 'Thomas', avatar: require('../../assets/avatar4.jpg'), viewed: true },
    { id: '5', name: 'Sophie', avatar: require('../../assets/avatar5.jpg'), viewed: true },
    { id: '6', name: 'Alex', avatar: require('../../assets/avatar6.jpg'), viewed: false },
  ];
  
  export const employees = [
    { 
      id: '1', 
      name: 'Jean Dupont', 
      position: 'Commercial', 
      status: 'mission', 
      avatar: require('../../assets/avatar2.png'), 
      lastSeen: '15 min', 
      online: false, 
      location: 'Client Acme' 
    },
    { 
      id: '2', 
      name: 'Marie Martin', 
      position: 'Technicienne', 
      status: 'available', 
      avatar: require('../../assets/avatar3.jpg'), 
      lastSeen: 'En ligne', 
      online: true, 
      location: 'Bureau principal' 
    },
    { 
      id: '3', 
      name: 'Thomas Leroy', 
      position: 'Responsable', 
      status: 'meeting', 
      avatar: require('../../assets/avatar4.jpg'), 
      lastSeen: '1h', 
      online: false, 
      location: 'Salle de réunion B' 
    },
    { 
      id: '4', 
      name: 'Sophie Lambert', 
      position: 'Commerciale', 
      status: 'travel', 
      avatar: require('../../assets/avatar5.jpg'), 
      lastSeen: '30 min', 
      online: false, 
      location: 'En déplacement' 
    },
    { 
      id: '5', 
      name: 'Alexandre Petit', 
      position: 'Technicien', 
      status: 'available', 
      avatar: require('../../assets/avatar6.jpg'), 
      lastSeen: 'En ligne', 
      online: true, 
      location: 'Atelier technique' 
    },
  ];
  
  export const announcements = [
    { 
      id: '1', 
      title: 'Réunion générale ce vendredi', 
      description: 'Nous discuterons des objectifs trimestriels et des nouvelles orientations stratégiques.',
      date: 'Aujourd\'hui, 15h', 
      author: 'La direction', 
      likes: 12, 
      comments: 5, 
      image: require('../../assets/meeting.jpg'),
      type: 'meeting'
    },
    { 
      id: '2', 
      title: 'Nouvelle politique de télétravail', 
      description: 'À compter du mois prochain, le télétravail sera autorisé 3 jours par semaine.',
      date: 'Hier', 
      author: 'RH', 
      likes: 24, 
      comments: 8, 
      image: require('../../assets/remote.jpg'),
      type: 'policy'
    },
    { 
      id: '3', 
      title: 'Formation sécurité obligatoire', 
      description: 'Tous les employés doivent suivre la nouvelle formation sécurité avant le 30 juin.',
      date: '15/05', 
      author: 'QHSE', 
      likes: 8, 
      comments: 2, 
      image: require('../../assets/training.jpg'),
      type: 'training'
    },
  ];
  
  export const quickActions = [
    { id: '1', icon: 'map-marker', title: 'Carte', color: '#4CAF50' },
    { id: '2', icon: 'clock', title: 'Historique', color: '#2196F3' },
    { id: '3', icon: 'qrcode', title: 'Check-in', color: '#FF9800' },
    { id: '4', icon: 'calendar', title: 'Planning', color: '#9C27B0' },
  ];