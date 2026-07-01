import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Colors from '../Constants/Colors';
import FontSize from '../Constants/FontSize';

interface SubmitButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  title,
  onPress,
  loading = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, style]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={Colors.black} size="small" />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 40,
    minWidth: 100,
  },
  text: {
    color: Colors.white,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
});

export default SubmitButton;
