import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../Constants/Colors';
import FontSize from '../Constants/FontSize';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Hello Renzo!',
  subtitle = 'Are you ready to dance?',
  onLogout,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top > 0 ? insets.top + 12 : 24 }]}>
      <View style={styles.topRow}>
        <View style={{gap:4}}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        {onLogout && (
          <TouchableOpacity onPress={onLogout} activeOpacity={0.7} style={styles.logoutButton}>
            <Image
              source={{
                uri: 'https://img.icons8.com/ios-glyphs/30/FF3B30/logout-rounded.png',
              }}
              style={styles.logoutIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.black,
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  logoutText: {
    fontSize: 11,
    color: '#FF3B30',
    fontWeight: '700',
    marginTop: 2,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.subtitle,
  },
});

export default Header;
