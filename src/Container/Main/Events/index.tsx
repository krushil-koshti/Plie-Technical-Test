import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import EventsPresenter from '../../../Component/Main/Events';
import APIManager from '../../../API/APIManager';
import APIConstant from '../../../API/APIConstant';
import { RootState } from '../../../Store/redux/store';
import { toggleFavourite } from '../../../Store/redux/slices/favouriteSlice';
import { logout } from '../../../Store/redux/slices/authSlice';



export const EventsContainer: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const favouriteEvents = useSelector(
    (state: RootState) => state.favourite.favouriteEvents
  );

  // Map favouriteIds for quick lookup in rendering (empty for guest users)
  const favouriteIds = token === 'guest_token'
    ? []
    : favouriteEvents.map((item) => {
        const baseId = item.event_id || item.id || '';
        return item.event_date_id ? `${baseId}-${item.event_date_id}` : String(baseId);
      });

  const fetchEvents = async () => {
    setInitialLoading(true);
    const startTime = Date.now();

    try {
      const formData = new FormData();
      formData.append('page', '1');

      const response = await APIManager.post(
        `${APIConstant.EVENTS_LISTING}?page=1`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const res = response.data;

      // Enforce a minimum delay of 800ms for first page load to show loader nicely
      const elapsedTime = Date.now() - startTime;
      const remainingTime = 800 - elapsedTime;
      if (remainingTime > 0) {
        await new Promise<void>((resolve) => setTimeout(() => resolve(), remainingTime));
      }

      if (res && res.success) {
        // Extract events
        const rawList = res.data?.events || res.data?.data || res.data || [];
        const apiEvents = Array.isArray(rawList) ? rawList : [];

        // Normalize API events and replace broken image URLs with beautiful Unsplash pictures
        const normalizedApiEvents = apiEvents.map((item, index) => {
          let imgUrl = item.event_profile_img || item.image;
          if (!imgUrl || imgUrl.includes('techeruditestaging.com')) {
            const unsplashImages = [
              'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=150&auto=format&fit=crop&q=60',
              'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=150&auto=format&fit=crop&q=60',
              'https://images.unsplash.com/photo-1545128485-c400e7702796?w=150&auto=format&fit=crop&q=60',
              'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=150&auto=format&fit=crop&q=60',
            ];
            imgUrl = unsplashImages[index % unsplashImages.length];
          }

          // Format price
          let priceText = 'Price TBD';
          if (item.event_price_from !== undefined && item.event_price_to !== undefined) {
            priceText = item.event_price_from === 0 && item.event_price_to === 0
              ? 'Free'
              : `€${item.event_price_from} - €${item.event_price_to}`;
          }

          // Format style/tags
          let stylesText = '';
          if (Array.isArray(item.danceStyles)) {
            stylesText = item.danceStyles.map((d: any) => d.ds_name).join(', ');
          }

          return {
            event_id: item.event_id || item.id,
            event_name: item.event_name || item.title || 'Untitled Event',
            event_date: item.readable_from_date || item.event_date || item.date || 'Date TBD',
            event_place: `${item.city || ''}, ${item.country || ''}`.trim() || item.event_place || 'Location TBD',
            event_price: priceText,
            event_profile_img: imgUrl,
            dance_style: stylesText || item.dance_style || 'Social, Bachata',
            event_date_id: item.event_date_id,
          };
        });

        setEvents(normalizedApiEvents);
      } else {
        setEvents([]);
      }
    } catch (error: any) {
      console.log('Error fetching events:', error);

      // Enforce minimum delay on error for first page
      const elapsedTime = Date.now() - startTime;
      const remainingTime = 800 - elapsedTime;
      if (remainingTime > 0) {
        await new Promise<void>((resolve) => setTimeout(() => resolve(), remainingTime));
      }
      setEvents([]);
    } finally {
      setInitialLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (token) {
      fetchEvents();
    }
  }, [token]);

  const handleToggleFavourite = (item: any) => {
    if (token === 'guest_token') {
      Alert.alert(
        'Login Required',
        'Please sign in to add events to your Favourites.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Sign In', onPress: () => dispatch(logout()) }
        ]
      );
      return;
    }
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
    <EventsPresenter
      events={events}
      favouriteIds={favouriteIds}
      initialLoading={initialLoading}
      onToggleFavourite={handleToggleFavourite}
      onLogout={handleLogout}
    />
  );
};

export default EventsContainer;
