import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../../GlobalComponents/Header';
import EventCard from '../../../GlobalComponents/EventCard';
import Loader from '../../../GlobalComponents/Loader';

interface FavouritesPresenterProps {
  favouriteEvents: any[];
  onToggleFavourite: (item: any) => void;
  onLogout: () => void;
  initialLoading: boolean;
}

export const FavouritesPresenter: React.FC<FavouritesPresenterProps> = ({
  favouriteEvents,
  onToggleFavourite,
  onLogout,
  initialLoading,
}) => {
  return (
    <View style={styles.container}>
      {/* App Header */}
      <Header title="Hello Renzo!" subtitle="Are you ready to dance?" onLogout={onLogout} />

      {initialLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Loader size="large" />
        </View>
      ) : favouriteEvents.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favourite events found.</Text>
        </View>
      ) : (
        <FlatList
          data={favouriteEvents}
          keyExtractor={(item, index) => {
            const baseId = item.event_id || item.id || '';
            const key = item.event_date_id ? `${baseId}-${item.event_date_id}` : String(baseId);
            return key || `fav-${index}`;
          }}
          renderItem={({ item }) => {
            return (
              <EventCard
                item={item}
                isFavourite={true}
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

export default FavouritesPresenter;
