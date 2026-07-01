import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import Colors from '../Constants/Colors';
import FontSize from '../Constants/FontSize';

interface EventCardProps {
  item: any;
  isFavourite: boolean;
  onToggleFavourite: (item: any) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  item,
  isFavourite,
  onToggleFavourite,
}) => {
  // Extract and normalise data fields with robust fallbacks
  const title = item.event_name || item.title || 'Untitled Event';
  const imgUrl =
    item.event_profile_img ||
    item.image ||
    'https://img.icons8.com/ios-glyphs/90/A0A0A0/image.png';
  const dateStr = item.event_date || item.date || 'Date TBD';
  const locationStr = item.event_place || item.location || 'Location TBD';
  
  // Format price nicely
  let priceStr = 'Price TBD';
  if (item.event_price !== undefined && item.event_price !== null) {
    priceStr = String(item.event_price);
  } else if (item.price !== undefined && item.price !== null) {
    priceStr = String(item.price);
  }
  if (priceStr && !priceStr.startsWith('€') && !priceStr.toLowerCase().startsWith('free') && !isNaN(Number(priceStr))) {
    priceStr = `€${priceStr}`;
  }

  // Parse chips/tags from API field (dance_style, keywords, tags, etc.)
  const rawTags = item.dance_style || item.tags || '';
  const tags: string[] = [];
  if (Array.isArray(rawTags)) {
    rawTags.forEach((t: any) => {
      if (typeof t === 'string') {
        tags.push(t);
      } else if (t && typeof t === 'object' && t.name) {
        tags.push(t.name);
      }
    });
  } else if (typeof rawTags === 'string') {
    rawTags.split(',').forEach((s: string) => {
      const trimmed = s.trim();
      if (trimmed) {
        tags.push(trimmed);
      }
    });
  } else if (rawTags && typeof rawTags === 'object') {
    // Check if it's an object with keys containing name objects
    Object.values(rawTags).forEach((t: any) => {
      if (typeof t === 'string') {
        tags.push(t);
      } else if (t && typeof t === 'object' && t.name) {
        tags.push(t.name);
      }
    });
  }

  // Share functionality
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this event: ${title} on ${dateStr} in ${locationStr}!`,
      });
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.cardContainer}>
      {/* Event Image */}
      <Image source={{ uri: imgUrl }} style={styles.eventImage} />

      {/* Event Details Content */}
      <View style={styles.contentContainer}>
        {/* Title and Top-Right Chevron */}
        <View style={styles.rowBetween}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Image
            source={{
              uri: 'https://img.icons8.com/?size=100&id=14914&format=png&color=000000',
            }}
            style={styles.chevronIcon}
          />
        </View>

        {/* Date and Location */}
        <View style={styles.rowBetween}>
          <Text style={styles.dateText} numberOfLines={1}>
            {dateStr}
          </Text>
          <Text style={styles.locationText} numberOfLines={1}>
            {locationStr}
          </Text>
        </View>

        {/* Price */}
        <Text style={styles.priceText} numberOfLines={1}>
          {priceStr}
        </Text>

        {/* Chips and Actions */}
        <View style={styles.bottomRow}>
          {/* Chips list */}
          <View style={styles.chipsContainer}>
            {tags.slice(0, 4).map((tag, index) => (
              <View key={index} style={styles.chip}>
                <Text style={styles.chipText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Share and Favourite buttons */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              onPress={handleShare}
              style={styles.actionButton}
              activeOpacity={0.7}
            >
              <Image
                source={{
                  uri: 'https://img.icons8.com/ios-glyphs/30/808080/share.png',
                }}
                style={styles.actionIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onToggleFavourite(item)}
              style={styles.actionButton}
              activeOpacity={0.7}
            >
              <Image
                source={{
                  uri: isFavourite
                    ? 'https://img.icons8.com/ios-glyphs/30/21D393/like--v1.png'
                    : 'https://img.icons8.com/ios-glyphs/30/808080/like--v1.png',
                }}
                style={styles.actionIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    // Card styling shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
    backgroundColor: Colors.grey,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
    height: 80,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: FontSize.sm + 1,
    fontWeight: '700',
    color: Colors.black,
    flex: 1,
    paddingRight: 8,
  },
  chevronIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  dateText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.primary,
    flex: 1.2,
  },
  locationText: {
    fontSize: FontSize.xs,
    color: Colors.subtitle,
    textAlign: 'right',
    flex: 1,
  },
  priceText: {
    fontSize: FontSize.xs,
    color: Colors.subtitle,
    fontWeight: '500',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  chip: {
    backgroundColor: '#F1F3F5',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 6,
    marginVertical: 2,
  },
  chipText: {
    fontSize: 9,
    color: Colors.subtitle,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 10,
    padding: 2,
  },
  actionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default EventCard;
