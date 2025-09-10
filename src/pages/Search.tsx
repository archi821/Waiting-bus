import { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native-web';
import { FaSearch, FaKeyboard } from 'react-icons/fa';

const mockRoutes = [
  { id: 'N9', name: 'N9 夜間公車 - Coquitlam Central' },
  { id: 'R668', name: 'R5 Hastings St - SFU' },
  { id: 'S', name: 'S Waterfront - Lonsdale Quay' },
  { id: 'W', name: 'W Waterfront - Mission' },
  { id: '9', name: '9 Commercial-Broadway - Boundary' }
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof mockRoutes>([]);
  const [showCustomKeyboard, setShowCustomKeyboard] = useState(true);
  const inputRef = useRef<any>(null);

  const handleSearch = (text: string) => {
    setQuery(text);
    const filtered = mockRoutes.filter(route =>
      route.id.toLowerCase().includes(text.toLowerCase()) ||
      route.name.includes(text)
    );
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
      {/* 搜尋列 + 取消 */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <FaSearch style={styles.searchIcon} />
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            value={query}
            onChangeText={handleSearch}
            placeholder="今天要搭哪輛車"
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

      {/* 小鍵盤圖示（右側圓底） */}
      <View style={styles.keyboardToggle}>
        <Pressable onPress={toggleKeyboard} style={styles.keyboardCircle}>
          <FaKeyboard style={styles.keyboardIcon} />
        </Pressable>
      </View>

      {/* 搜尋結果（有輸入時才顯示） */}
      {query.length > 0 && (
        <ScrollView style={styles.resultBox}>
          {results.map(route => (
            <Text key={route.id} style={styles.resultItem}>
              ⭐ {route.name}
            </Text>
          ))}
        </ScrollView>
      )}

      {/* 自訂鍵盤 */}
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
  resultItem: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee'
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
