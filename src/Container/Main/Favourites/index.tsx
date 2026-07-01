import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FavouritesPresenter from '../../../Component/Main/Favourites';
import { RootState } from '../../../Store/redux/store';
import { toggleFavourite } from '../../../Store/redux/slices/favouriteSlice';
import { logout } from '../../../Store/redux/slices/authSlice';

export const FavouritesContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(true);
  const token = useSelector((state: RootState) => state.auth.token);
  const favouriteEvents = useSelector(
    (state: RootState) => token === 'guest_token' ? [] : state.favourite.favouriteEvents
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleFavourite = (item: any) => {
    dispatch(toggleFavourite(item));
  };

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

  return (
    <FavouritesPresenter
      favouriteEvents={favouriteEvents}
      onToggleFavourite={handleToggleFavourite}
      onLogout={handleLogout}
      initialLoading={initialLoading}
    />
  );
};

export default FavouritesContainer;
