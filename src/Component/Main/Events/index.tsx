import React from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../../GlobalComponents/Header';
import Loader from '../../../GlobalComponents/Loader';
import EventCard from '../../../GlobalComponents/EventCard';

interface EventsPresenterProps {
  events: any[];
  favouriteIds: string[];
  initialLoading: boolean;
  onToggleFavourite: (item: any) => void;
  onLogout: () => void;
}

export const EventsPresenter: React.FC<EventsPresenterProps> = ({
  events,
  favouriteIds,
  initialLoading,
  onToggleFavourite,
  onLogout,
}) => {
  return (
    <View style={styles.container}>
      {/* App Header */}
      <Header title="Hello Renzo!" subtitle="Are you ready to dance?" onLogout={onLogout} />

      {initialLoading ? (
        <View style={styles.loaderContainer}>
          <Loader size="large" />
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item, index) => {
            const baseId = item.event_id || item.id || '';
            const key = item.event_date_id ? `${baseId}-${item.event_date_id}` : String(baseId);
            return key || `event-${index}`;
          }}
          renderItem={({ item }) => {
            const baseId = item.event_id || item.id || '';
            const key = item.event_date_id ? `${baseId}-${item.event_date_id}` : String(baseId);
            const isFav = favouriteIds.includes(key);
            return (
              <EventCard
                item={item}
                isFavourite={isFav}
                onToggleFavourite={onToggleFavourite}
              />
            );
          }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default EventsPresenter;
