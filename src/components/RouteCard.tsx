import { View, Text, StyleSheet, Pressable } from 'react-native-web';

type Props = {
  id: string;
  name: string;
  displayId?: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

export default function RouteCard({ id, name, displayId, isFavorite, onToggleFavorite }: Props) {
  const getColor = () => {
    if (id === '99') return { bg: '#FF8000', text: '#fff' };
    if (id.startsWith('R')) return { bg: '#2E8B57', text: '#fff' };
    return { bg: '#3553B9', text: '#fff' };
  };

  const { bg, text } = getColor();
  const shownId = id.startsWith('R') || id === '99' ? id : displayId ?? id;

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View style={[styles.badge, { backgroundColor: bg }]}>
          <Text style={[styles.badgeText, { color: text }]}>{shownId}</Text>
        </View>
        <Text style={styles.boldText}>{name}</Text>
      </View>
      <Pressable onPress={onToggleFavorite}>
        <Text style={styles.favorite}>{isFavorite ? '★' : '☆'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f4f7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  left: {
    flexDirection: 'column',
    flexShrink: 1
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
  },
  favorite: {
    fontSize: 24,
    color: '#FFB300',
    paddingLeft: 12
  }
});


