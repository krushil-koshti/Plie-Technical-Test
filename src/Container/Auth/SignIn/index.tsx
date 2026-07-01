import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import SignInPresenter from '../../../Component/Auth/SignIn';
import APIManager from '../../../API/APIManager';
import APIConstant from '../../../API/APIConstant';
import { loginSuccess } from '../../../Store/redux/slices/authSlice';

export const SignInContainer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Validate email address using the exact regex required
  const validateEmail = (emailVal: string) => {
    const emailRegex = /^[a-z._][a-z0-9._]+@[a-z0-9.]+\.[a-z]{2,5}$/;
    return emailRegex.test(emailVal);
  };

  const handleSignIn = async () => {
    const cleanedEmail = email.trim().toLowerCase();

    // 1. Validation Checks
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Please enter email.');
      return;
    }
    if (!validateEmail(cleanedEmail)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }
    if (!password) {
      Alert.alert('Validation Error', 'Please enter password.');
      return;
    }

    // 2. Dispatch login API call
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', cleanedEmail);
      formData.append('password', password);

      const response = await APIManager.post(APIConstant.LOGIN, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const resData = response.data;
      if (resData && (resData.success || resData.token || (resData.data && resData.data.token))) {
        const token = resData.token || resData.data?.token;
        const user = resData.user || resData.data?.user || { name: 'Renzo' };
        
        if (token) {
          dispatch(loginSuccess({ token, user }));
        } else {
          Alert.alert('Authentication Error', 'Token not found in response.');
        }
      } else {
        const errMsg = resData?.message || 'Invalid credentials or login failed.';
        Alert.alert('Login Failed', errMsg);
      }
    } catch (error: any) {
      console.log('Login Error: ', error);
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        'An error occurred during sign in. Please try again.';
      Alert.alert('Error', errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password recovery flow is under development.');
  };

  const handleSignUp = () => {
    Alert.alert('Sign Up', 'Sign Up flow is under development.');
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert('Social Sign In', `${provider} Sign In is under development.`);
  };

  const handleEnterAsGuest = () => {
    // Let them enter by setting a mock guest token in redux store
    dispatch(loginSuccess({ token: 'guest_token', user: { name: 'Guest User' } }));
  };

  return (
    <SignInPresenter
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      loading={loading}
      onSignIn={handleSignIn}
      onForgotPassword={handleForgotPassword}
      onSignUp={handleSignUp}
      onSocialLogin={handleSocialLogin}
      onEnterAsGuest={handleEnterAsGuest}
    />
  );
};

export default SignInContainer;
