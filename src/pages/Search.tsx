import { useState, useRef, useEffect } from 'react';
import { View, TextInput, Pressable, StyleSheet, ScrollView, Text } from 'react-native-web';
import { FaSearch, FaKeyboard } from 'react-icons/fa';
import RouteCard from '../components/RouteCard';
import Keyboard from '../components/Keyboard';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [routes, setRoutes] = useState<{ id: string; name: string }[]>([]);
  const [results, setResults] = useState<{ id: string; name: string }[]>([]);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const inputRef = useRef<any>(null);

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
        setResults([]); // 初始不顯示任何結果
      });
  }, []);

  const handleSearch = (text: string) => {
    const normalized = text.trim();
    setQuery(normalized);

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

  const handleKeyPress = (key: string) => {
    if (key === '重設') {
      handleSearch('');
    } else if (key === '⌫') {
      handleSearch(query.slice(0, -1));
    } else {
      handleSearch(query + key);
    }
  };

  const toggleKeyboard = () => {
    setShowKeyboard(prev => !prev);
    if (!showKeyboard) inputRef.current?.focus();
    else inputRef.current?.blur();
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
            onChangeText={handleSearch}
            placeholder="輸入路線編號"
            placeholderTextColor="#ccc"
            onFocus={() => setShowKeyboard(false)}
          />
          {query.length > 0 && (
            <Pressable onPress={() => handleSearch('')}>
              <Text style={styles.clearText}>⨉</Text>
            </Pressable>
          )}
        </View>
        <Pressable onPress={() => handleSearch('')} style={styles.cancelButton}>
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
          <RouteCard key={route.id} id={route.id} name={route.name} displayId={query} />
        ))}
      </ScrollView>

      {/* 自訂鍵盤 */}
      <Keyboard onKeyPress={handleKeyPress} />
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
  cancelButton: { marginLeft: 8, backgroundColor: '#3553B9', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20 },
  cancelText: { color: '#fff', fontSize: 16, fontWeight: '500' },
  keyboardToggle: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8, marginBottom: 24 },
  keyboardCircle: { backgroundColor: '#5B636A', borderRadius: 20, padding: 8, marginRight: 16 },
  keyboardIcon: { fontSize: 20, color: '#fff' },
  resultBox: { flex: 1 }
});

