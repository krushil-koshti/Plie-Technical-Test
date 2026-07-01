import React from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import SearchPresenter from '../../../Component/Main/Search';
import { logout } from '../../../Store/redux/slices/authSlice';

export const SearchContainer: React.FC = () => {
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

  return <SearchPresenter onLogout={handleLogout} />;
};

export default SearchContainer;
