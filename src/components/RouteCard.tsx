import { View, Text, StyleSheet } from 'react-native-web';

export default function RouteCard({
  id,
  name,
  displayId
}: {
  id: string;
  name: string;
  displayId?: string;
}) {
  const getColor = () => {
    if (id === '99') return { bg: '#FF8000', text: '#fff' };
    if (id.startsWith('R')) return { bg: '#2E8B57', text: '#fff' };
    return { bg: '#3553B9', text: '#fff' };
  };

  const { bg, text } = getColor();
  const shownId = id.startsWith('R') || id === '99' ? id : displayId ?? id;

  return (
    <View style={styles.card}>
      <View style={[styles.badge, { backgroundColor: bg }]}>
        <Text style={[styles.badgeText, { color: text }]}>{shownId}</Text>
      </View>
      <Text style={styles.boldText}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f4f7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12
  },
  badge: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginBottom: 6
  },
  badgeText: {
    fontSize: 18,
    fontWeight: '700'
  },
  boldText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333'
  }
});

