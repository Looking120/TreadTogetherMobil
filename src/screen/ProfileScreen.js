import React from 'react';
import { ScrollView, SafeAreaView, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileHeader from '../components/Profil/ProfileHeader';
import ProfileInfo from '../components/auth/ProfileInfo/ProfileInfo';
import InfoSection from '../components/Profil/InfoSection/InfoSection';
import ActivityItem from '../components/Profil/ActivityItem/ActivityItem';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const employeeData = {
    name: "Jean Dupont",
    position: "Développeur Full Stack",
    department: "IT - Département Technique",
    employeeId: "EMP-20456",
    hireDate: "15/06/2018",
    email: "j.dupont@entreprise.com",
    phone: "+33 6 12 34 56 78",
    skills: ["React Native", "Node.js", "MongoDB", "AWS"],
    projects: ["Migration App Mobile", "Refonte API"],
    isManager: true,
    teamSize: 8,
    avatar: require('../../assets/default-avatar.jpeg'),
    coverPhoto: require('../../assets/background/overlay_4.jpg'),
  };

  const professionalInfo = [
    { label: "ID Employé", value: employeeData.employeeId },
    { label: "Date d'embauche", value: employeeData.hireDate },
    { label: "Email", value: employeeData.email },
    { label: "Téléphone", value: employeeData.phone },
    ...(employeeData.isManager ? [{ label: "Équipe", value: `${employeeData.teamSize} membres` }] : [])
  ];

  const recentActivities = [
    { id: '1', type: 'project', title: "Migration App Mobile", date: "Aujourd'hui", status: "En cours" },
    { id: '2', type: 'meeting', title: "Réunion équipe technique", date: "Hier", duration: "1h30" },
    { id: '3', type: 'training', title: "Formation React Native", date: "05/10/2023", completed: true },
  ];

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { 
      profileData: employeeData,
      onSave: (updatedData) => {
        // Ici vous pourriez mettre à jour les données du profil
        console.log('Profile updated:', updatedData);
        // Ajoutez votre logique de mise à jour ici
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ProfileHeader
          coverPhoto={employeeData.coverPhoto}
          avatar={employeeData.avatar}
          onEditPress={handleEditProfile}
        />
        
        <View style={styles.content}>
          <ProfileInfo
            name={employeeData.name}
            position={employeeData.position}
            department={employeeData.department}
          />
          
          <InfoSection
            title="Informations professionnelles"
            items={professionalInfo}
          />
          
          <InfoSection
            title="Compétences"
            items={employeeData.skills}
            isSkills={true}
          />
          
          <InfoSection
            title="Projets en cours"
            items={employeeData.projects}
            isProjects={true}
          />
          
          <InfoSection
            title="Activités récentes"
          >
            {recentActivities.map((activity) => (
              <ActivityItem 
                key={activity.id} 
                activity={activity} 
              />
            ))}
          </InfoSection>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    paddingBottom: 30,
  },
});

export default ProfileScreen;