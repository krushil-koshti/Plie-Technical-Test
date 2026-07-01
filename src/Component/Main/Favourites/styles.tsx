import { StyleSheet } from 'react-native';
import Colors from '../../../Constants/Colors';
import FontSize from '../../../Constants/FontSize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: Colors.background,
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.subtitle,
    fontWeight: '600',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 24,
  },
});

export default styles;
