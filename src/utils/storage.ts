import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log('Storage setItem error:', e);
    }
  },
  getItem: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.log('Storage getItem error:', e);
      return null;
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log('Storage removeItem error:', e);
    }
  },
  clear: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log('Storage clear error:', e);
    }
  },
};

export default storage;
