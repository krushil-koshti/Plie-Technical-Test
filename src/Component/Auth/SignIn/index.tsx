import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import TextInputComponent from '../../../GlobalComponents/TextInputComponent';
import SubmitButton from '../../../GlobalComponents/SubmitButton';

interface SignInPresenterProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  loading: boolean;
  onSignIn: () => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
  onSocialLogin: (provider: string) => void;
  onEnterAsGuest: () => void;
}

export const SignInPresenter: React.FC<SignInPresenterProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  onSignIn,
  onForgotPassword,
  onSignUp,
  onSocialLogin,
  onEnterAsGuest,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top grey area with Pliē text and icon */}
        <View
          style={[
            styles.topSection,
            { paddingTop: insets.top > 0 ? insets.top + 20 : 40 },
          ]}
        >
          <Image
            source={require('../../../assets/plie_text_logo.png')}
            style={styles.logoImage}
          />
          <Image
            source={require('../../../assets/plie_logo.png')}
            style={styles.placeholderIcon}
          />
        </View>

        {/* Bottom form inputs and login logic */}
        <View
          style={[
            styles.bottomSection,
            { paddingBottom: insets.bottom > 0 ? insets.bottom + 16 : 24 },
          ]}
        >
          <TextInputComponent
            label="Email"
            placeholder="email@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TextInputComponent
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            isPassword={true}
          />

          <TouchableOpacity onPress={onForgotPassword} activeOpacity={0.7}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <SubmitButton
            title="Sign In"
            onPress={onSignIn}
            loading={loading}
            style={styles.signInButton}
          />

          <TouchableOpacity
            style={styles.signUpContainer}
            onPress={onSignUp}
            activeOpacity={0.7}
          >
            <Text style={styles.signUpText}>
              Not a member? <Text style={styles.signUpLink}>Sign Up Here</Text>
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or Sign In with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social login buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => onSocialLogin('Google')}
              activeOpacity={0.7}
            >
              <Image
                source={{
                  uri: 'https://img.icons8.com/color/48/000000/google-logo.png',
                }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => onSocialLogin('Apple')}
              activeOpacity={0.7}
            >
              <Image
                source={{
                  uri: 'https://img.icons8.com/ios-filled/48/000000/mac-os.png',
                }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButtonFacebookImage}
              onPress={() => onSocialLogin('Facebook')}
              activeOpacity={0.7}
            >
              <Image
                source={require('../../../assets/fb_logo.png')}
                style={styles.socialIconFull}
              />
            </TouchableOpacity>
          </View>

          {/* Enter as Guest */}
          <TouchableOpacity
            style={styles.guestContainer}
            onPress={onEnterAsGuest}
            activeOpacity={0.7}
          >
            <Text style={styles.guestText}>Enter as Guest</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInPresenter;
