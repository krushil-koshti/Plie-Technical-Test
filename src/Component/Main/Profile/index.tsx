import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Header from '../../../GlobalComponents/Header';

interface ProfilePresenterProps {
  onLogout: () => void;
}

export const ProfilePresenter: React.FC<ProfilePresenterProps> = ({ onLogout }) => {
  return (
    <View style={styles.container}>
      <Header title="Profile" subtitle="Manage your account preferences" onLogout={onLogout} />
      <View style={styles.content}>
        <Text style={styles.text}>Profile Screen</Text>
      </View>
    </View>
  );
};

export default ProfilePresenter;
