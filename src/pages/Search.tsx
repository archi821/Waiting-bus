import { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native-web';
import { FaSearch, FaKeyboard } from 'react-icons/fa';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [routes, setRoutes] = useState<{ id: string; name: string }[]>([]);
  const [results, setResults] = useState<{ id: string; name: string }[]>([]);
  const [showCustomKeyboard, setShowCustomKeyboard] = useState(true);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    fetch('/google_transit/routes.txt')
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split('\n').slice(1);
        const parsed = lines
          .map((line) => line.split(','))
          .filter((cols) => cols.length >= 4 && cols[2] && cols[3])
          .map((cols) => ({
            id: cols[2].trim(),
            name: cols[3].trim()
          }));
        setRoutes(parsed);
        setResults(parsed);
      })
      .catch((err) => {
        console.error('讀取 routes.txt 失敗:', err);
      });
  }, []);

  const handleSearch = (text: string) => {
    setQuery(text);
    const normalized = text.trim();
    const inputNum = parseInt(normalized, 10);

    const filtered = routes.filter(route => {
      const routeNum = parseInt(route.id, 10);
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
    if (showCustomKeyboard) {
      setShowCustomKeyboard(false);
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
      setShowCustomKeyboard(true);
    }
  };

  return (
    <View style={styles.container}>
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
            onFocus={() => setShowCustomKeyboard(false)}
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

      <View style={styles.keyboardToggle}>
        <Pressable onPress={toggleKeyboard} style={styles.keyboardCircle}>
          <FaKeyboard style={styles.keyboardIcon} />
        </Pressable>
      </View>

      {query.length > 0 && results.length > 0 && (
        <ScrollView style={styles.resultBox}>
          {results.map(route => (
            <View key={route.id} style={styles.card}>
              <Text style={styles.cardTitle}>{route.id}</Text>
              <Text style={styles.cardSubtitle}>{route.name}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {query.length > 0 && results.length === 0 && (
        <View style={styles.noResult}>
          <Text style={styles.noResultText}>找不到符合的路線</Text>
        </View>
      )}

      {showCustomKeyboard && (
        <View style={styles.keyboard}>
          {[
            ['N', '1', '2', '3'],
            ['R', '4', '5', '6'],
            ['S', '7', '8', '9'],
            ['W', '重設', '0', '⌫']
          ].map((row, i) => (
            <View key={i} style={styles.keyRow}>
              {row.map(key => {
                const isBackspace = key === '⌫';
                return (
                  <Pressable key={key} style={styles.key} onPress={() => handleKeyPress(key)}>
                    <Text style={[styles.keyText, isBackspace && styles.backspaceText]}>
                      {key}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 16
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3553B9',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingHorizontal: 12,
    height: 44
  },
  searchIcon: {
    marginRight: 8,
    color: '#888'
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 0,
    outlineStyle: 'none'
  },
  clearText: {
    fontSize: 18,
    color: '#888',
    marginHorizontal: 8
  },
  cancelButton: {
    marginLeft: 8,
    backgroundColor: '#3553B9',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20
  },
  cancelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },
  keyboardToggle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    marginBottom: 24
  },
  keyboardCircle: {
    backgroundColor: '#5B636A',
    borderRadius: 20,
    padding: 8,
    marginRight: 16
  },
  keyboardIcon: {
    fontSize: 20,
    color: '#fff'
  },
  resultBox: {
    flex: 1,
    marginBottom: 12
  },
  card: {
    backgroundColor: '#f2f4f7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333'
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4
  },
  noResult: {
    padding: 24,
    alignItems: 'center'
  },
  noResultText: {
    fontSize: 16,
    color: '#999'
  },
  keyboard: {
    marginTop: 8
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  key: {
    backgroundColor: '#eee',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '22%'
  },
  keyText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  backspaceText: {
    fontSize: 20,
    fontWeight: '700'
  }
});






