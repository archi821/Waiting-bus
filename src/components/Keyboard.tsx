import { View, Text, Pressable, StyleSheet, GestureResponderEvent } from 'react-native-web';

type KeyboardProps = {
  onKeyPress: (key: string) => void;
};

export default function Keyboard({ onKeyPress }: KeyboardProps) {
  const keys: string[][] = [
    ['N', '1', '2', '3'],
    ['R', '4', '5', '6'],
    ['S', '7', '8', '9'],
    ['W', '重設', '0', '⌫']
  ];

  return (
    <View style={styles.keyboard}>
      {keys.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map(key => (
            <Pressable
              key={key}
              onPress={() => onKeyPress(key)}
              style={(state: { pressed: boolean }) => [
                styles.key,
                state.pressed ? styles.keyPressed : null
              ]}
            >
              <Text style={[styles.keyText, key === '⌫' && styles.backspace]}>
                {key}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard: { marginTop: 8 },
  row: {
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
    width: '22%',
    cursor: 'pointer',
    transition: 'transform 0.1s'
  },
  keyPressed: {
    transform: 'scale(0.95)',
    backgroundColor: '#ddd'
  },
  keyText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  backspace: {
    fontSize: 20,
    fontWeight: '700'
  }
});



