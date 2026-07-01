import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Header from '../../../GlobalComponents/Header';

interface SearchPresenterProps {
  onLogout: () => void;
}

export const SearchPresenter: React.FC<SearchPresenterProps> = ({ onLogout }) => {
  return (
    <View style={styles.container}>
      <Header title="Search" subtitle="Find your favorite dances" onLogout={onLogout} />
      <View style={styles.content}>
        <Text style={styles.text}>Search Screen</Text>
      </View>
    </View>
  );
};

export default SearchPresenter;
