import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  TextInputProps,
} from 'react-native';
import Colors from '../Constants/Colors';
import FontSize from '../Constants/FontSize';

interface TextInputComponentProps extends TextInputProps {
  label: string;
  isPassword?: boolean;
}

export const TextInputComponent: React.FC<TextInputComponentProps> = ({
  label,
  isPassword = false,
  style,
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(isPassword);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, style]}
          secureTextEntry={isPassword ? hidePassword : false}
          placeholderTextColor="#B0B0B0"
          autoCapitalize="none"
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={() => setHidePassword(!hidePassword)}
            activeOpacity={0.7}
          >
            <Image
              source={{
                uri: hidePassword
                  ? 'https://img.icons8.com/ios-glyphs/30/B0B0B0/invisible.png'
                  : 'https://img.icons8.com/ios-glyphs/30/B0B0B0/visible.png',
              }}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: FontSize.sm,
    color: Colors.text,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    // Soft shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 4,
  },
  input: {
    flex: 1,
    height: 44,
    color: Colors.black,
    fontSize: FontSize.sm,
    paddingVertical: 0,
  },
  eyeIconContainer: {
    padding: 4,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default TextInputComponent;
