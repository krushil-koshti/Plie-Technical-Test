import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Store/redux/store';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import storage from '../utils/storage';
import { loginSuccess } from '../Store/redux/slices/authSlice';
import { hydrateFavourites } from '../Store/redux/slices/favouriteSlice';
import Loader from '../GlobalComponents/Loader';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const rehydrate = async () => {
      try {
        const storedToken = await storage.getItem('auth_token');
        const storedUser = await storage.getItem('auth_user_data');
        const storedFavs = await storage.getItem('favourite_events');

        if (storedToken) {
          const parsedUser = storedUser ? JSON.parse(storedUser) : null;
          dispatch(loginSuccess({ token: storedToken, user: parsedUser }));
        }

        if (storedFavs) {
          const parsedFavs = JSON.parse(storedFavs);
          if (Array.isArray(parsedFavs)) {
            dispatch(hydrateFavourites(parsedFavs));
          }
        }
      } catch (e) {
        console.log('Rehydration error:', e);
      } finally {
        setLoading(false);
      }
    };

    rehydrate();
  }, [dispatch]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
        }}
      >
        <Loader size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {token ? (
          <Stack.Screen name="Main" component={BottomTabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
