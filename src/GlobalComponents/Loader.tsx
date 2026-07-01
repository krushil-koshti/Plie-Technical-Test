import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Colors from '../Constants/Colors';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color = Colors.black,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
