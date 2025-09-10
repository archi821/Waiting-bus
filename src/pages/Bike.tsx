import { View, Text, StyleSheet, Image, Linking, Pressable } from 'react-native-web';
import limebikeLogo from './images/Limebike.png';
import rogersLogo from './images/Rogers.png';

export default function BikePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>公共自行車</Text>

      <View style={styles.brandRow}>
        {/* LimeBike 區塊 */}
        <View style={styles.brandBlock}>
          <Pressable onPress={() => Linking.openURL('https://www.li.me/en-ca/locations/vancouver')}>
            <Image
              source={{ uri: limebikeLogo }}
              style={styles.brandImage}
              alt="LimeBike Logo"
            />
          </Pressable>
          <Text style={styles.brandText}>
            LimeBike 是一個綠色共享單車品牌，主打城市短程移動。
          </Text>
        </View>

        {/* Rogers 區塊 */}
        <View style={styles.brandBlock}>
          <Pressable onPress={() => Linking.openURL('https://www.mobibikes.ca/en/map')}>
            <Image
              source={{ uri: rogersLogo }}
              style={styles.brandImage}
              alt="Mobi by Rogers Logo"
            />
          </Pressable>
          <Text style={styles.brandText}>
            Mobi 是溫哥華市區的共享單車系統，由 Rogers 支援營運。
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 32,
    color: '#2D0AFF'
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    flexWrap: 'wrap'
  },
  brandBlock: {
    alignItems: 'center',
    maxWidth: 160
  },
  brandImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 12
  },
  brandText: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center'
  }
});

