import React from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import ProfilePresenter from '../../../Component/Main/Profile';
import { logout } from '../../../Store/redux/slices/authSlice';

export const ProfileContainer: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => dispatch(logout()) }
      ]
    );
  };

  return <ProfilePresenter onLogout={handleLogout} />;
};

export default ProfileContainer;
