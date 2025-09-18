import { useState, useRef, useEffect } from 'react';
import { View, TextInput, Pressable, StyleSheet, ScrollView, Text } from 'react-native-web';
import { FaSearch, FaKeyboard, FaBook } from 'react-icons/fa';
import RouteCard from '../components/RouteCard';
import Keyboard from '../components/Keyboard';
import FavoritesRoutes from './FavoritesRoutes';
import useFavorites from '../hooks/useFavorites';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [routes, setRoutes] = useState<{ id: string; name: string }[]>([]);
  const [results, setResults] = useState<{ id: string; name: string }[]>([]);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const inputRef = useRef<any>(null);
  const { favorites, toggleFavorite } = useFavorites();

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

  const searchRoutes = (text: string) => {
    const normalized = text.trim();
    if (normalized === '') {
      setResults([]);
      return;
    }

    const filtered = routes.filter(route => {
      if (route.id === '99' && normalized === '99') return true;
      if (route.id.startsWith('R') && normalized === route.id) return true;

      const routeNum = parseInt(route.id, 10);
      const inputNum = parseInt(normalized, 10);
      return !isNaN(routeNum) && !isNaN(inputNum) && routeNum === inputNum;
    });

    setResults(filtered);
  };

  const handleInputChange = (text: string) => {
    setQuery(text);
    searchRoutes(text);
  };

  const handleKeyPress = (key: string) => {
    let next = '';
    if (key === '重設') next = '';
    else if (key === '⌫') next = query.slice(0, -1);
    else next = query + key;

    setQuery(next);
    searchRoutes(next);
  };

  const toggleKeyboard = () => {
    setShowKeyboard(true);
    inputRef.current?.blur();
  };

  return (
    <View style={styles.container}>
      {/* 搜尋列 */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <FaSearch style={styles.searchIcon} />
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            value={query}
            onChangeText={handleInputChange}
            placeholder="輸入路線編號"
            placeholderTextColor="#ccc"
            onFocus={() => {
              if (showKeyboard) setShowKeyboard(false);
            }}
          />
          {query.length > 0 && (
            <Pressable onPress={() => handleInputChange('')}>
              <Text style={styles.clearText}>⨉</Text>
            </Pressable>
          )}
          <Pressable onPress={() => setShowFavoritesModal(true)}>
            <FaBook style={styles.bookIcon} />
          </Pressable>
        </View>
        <Pressable onPress={() => handleInputChange('')} style={styles.cancelButton}>
          <Text style={styles.cancelText}>取消</Text>
        </Pressable>
      </View>

      {/* 鍵盤切換 */}
      <View style={styles.keyboardToggle}>
        <Pressable onPress={toggleKeyboard} style={styles.keyboardCircle}>
          <FaKeyboard style={styles.keyboardIcon} />
        </Pressable>
      </View>

      {/* 搜尋結果 */}
      <ScrollView style={styles.resultBox}>
        {results.map(route => (
          <RouteCard
            key={route.id}
            id={route.id}
            name={route.name}
            displayId={query}
            isFavorite={favorites.includes(route.id)}
            onToggleFavorite={() => toggleFavorite(route.id)}
          />
        ))}
      </ScrollView>

      {/* 自訂鍵盤 */}
      {showKeyboard && <Keyboard onKeyPress={handleKeyPress} />}

      {/* 收藏頁 Modal */}
      {showFavoritesModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Pressable onPress={() => setShowFavoritesModal(false)} style={styles.modalClose}>
              <Text style={styles.modalCloseText}>✕</Text>
            </Pressable>
            <FavoritesRoutes />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40, paddingHorizontal: 16 },
  searchRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#3553B9', padding: 8, borderRadius: 8, marginBottom: 8 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 22, paddingHorizontal: 12, height: 44 },
  searchIcon: { marginRight: 8, color: '#888' },
  searchInput: { flex: 1, fontSize: 16, color: '#000', paddingVertical: 0, outlineStyle: 'none' },
  clearText: { fontSize: 18, color: '#888', marginHorizontal: 8 },
  bookIcon: { fontSize: 18, color: '#888', marginLeft: 8 },
  cancelButton: { marginLeft: 8, backgroundColor: '#3553B9', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20 },
  cancelText: { color: '#fff', fontSize: 16, fontWeight: '500' },
  keyboardToggle: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8, marginBottom: 24 },
  keyboardCircle: { backgroundColor: '#5B636A', borderRadius: 20, padding: 8, marginRight: 16 },
  keyboardIcon: { fontSize: 20, color: '#fff' },
  resultBox: { flex: 1 },
  modalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },
  modalBox: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16
  },
  modalClose: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1000
  },
  modalCloseText: {
    fontSize: 20,
    color: '#888'
  }
});






