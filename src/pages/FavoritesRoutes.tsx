import { View, ScrollView, StyleSheet, Text } from 'react-native-web';
import RouteCard from '../components/RouteCard';
import useFavorites from '../hooks/useFavorites';
import { useEffect, useState } from 'react';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [routes, setRoutes] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    fetch('/google_transit/routes.txt')
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n').slice(1);
        const parsed = lines
          .map(line => line.split(','))
          .filter(cols => cols.length >= 4 && cols[2] && cols[3])
          .map(cols => ({
            id: cols[2].trim(),
            name: cols[3].trim()
          }));
        setRoutes(parsed);
      });
  }, []);

  const favoriteRoutes = routes.filter(route => favorites.includes(route.id));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>我的收藏路線</Text>
      <ScrollView style={styles.resultBox}>
        {favoriteRoutes.map(route => (
          <RouteCard
            key={route.id}
            id={route.id}
            name={route.name}
            displayId={route.id}
            isFavorite={true}
            onToggleFavorite={() => toggleFavorite(route.id)}
          />
        ))}
        {favoriteRoutes.length === 0 && (
          <Text style={styles.emptyText}>尚未收藏任何路線</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40, paddingHorizontal: 16 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 16 },
  resultBox: { flex: 1 },
  emptyText: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 32 }
});
