import React from 'react';
import { Image, StyleSheet, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import EventsContainer from '../Container/Main/Events';
import FavouritesContainer from '../Container/Main/Favourites';
import SearchContainer from '../Container/Main/Search';
import ProfileContainer from '../Container/Main/Profile';
import Colors from '../Constants/Colors';
import { RootState } from '../Store/redux/store';
import { logout } from '../Store/redux/slices/authSlice';

export type BottomTabParamList = {
  Search: undefined;
  Events: undefined;
  Favourites: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const getTabIcon = (routeName: string, focused: boolean) => {
  let uri = '';
  switch (routeName) {
    case 'Search':
      uri = focused
        ? 'https://img.icons8.com/ios-glyphs/30/000000/search--v1.png'
        : 'https://img.icons8.com/ios-glyphs/30/808080/search--v1.png';
      break;
    case 'Events':
      uri = focused
        ? 'https://img.icons8.com/ios-glyphs/30/000000/calendar.png'
        : 'https://img.icons8.com/ios-glyphs/30/808080/calendar.png';
      break;
    case 'Favourites':
      uri = focused
        ? 'https://img.icons8.com/ios-glyphs/30/000000/like--v1.png'
        : 'https://img.icons8.com/ios-glyphs/30/808080/like--v1.png';
      break;
    case 'Profile':
      uri = focused
        ? 'https://img.icons8.com/ios-glyphs/30/000000/user--v1.png'
        : 'https://img.icons8.com/ios-glyphs/30/808080/user--v1.png';
      break;
  }
  return <Image source={{ uri }} style={styles.tabIcon} />;
};

export const BottomTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  return (
    <Tab.Navigator
      initialRouteName="Events"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => getTabIcon(route.name, focused),
        tabBarActiveTintColor: Colors.black,
        tabBarInactiveTintColor: Colors.subtitle,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen name="Search" component={SearchContainer} />
      <Tab.Screen name="Events" component={EventsContainer} />
      <Tab.Screen
        name="Favourites"
        component={FavouritesContainer}
        listeners={{
          tabPress: (e) => {
            if (token === 'guest_token') {
              e.preventDefault();
              Alert.alert(
                'Login Required',
                'Please sign in to add events to your Favourites.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Sign In', onPress: () => dispatch(logout()) }
                ]
              );
            }
          },
        }}
      />
      <Tab.Screen name="Profile" component={ProfileContainer} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default BottomTabNavigator;
