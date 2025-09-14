import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { View, Text, Pressable, StyleSheet } from 'react-native-web';
import {
  FaBicycle, FaSubway, FaTrain, FaShip, FaBus, FaCog,
  FaMapMarkedAlt, FaSearch, FaLocationArrow, FaStar
} from 'react-icons/fa';

import SearchPage from './pages/Search';
import FavoritesPage from './pages/Favorites';
import StopDetail from './pages/StopDetail';
import NearbyPage from './pages/Nearby'; 
import BikePage from './pages/Bike';
import SkytrainPage from './pages/Skytrain';
import TrainPage from './pages/Train';
import SeabusPage from './pages/Seabus';
import BusTrackerPage from './pages/Bustracker';
import SettingsPage from './pages/Settings';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <View style={styles.page}>
      <Text style={styles.pageText}>{title} 頁面尚未建置</Text>
    </View>
  );
}

export default function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <View style={styles.container}>
              {/* 標題 */}
              <Text style={styles.header}>大溫等公車</Text>

              {/* 生活分類圖示列 */}
              <View style={styles.iconRow}>
                <IconLabel icon={<FaBicycle />} label="公共自行車" to="/bike" />
                <IconLabel icon={<FaSubway />} label="天車" to="/skytrain" />
                <IconLabel icon={<FaTrain />} label="火車" to="/train" />
                <IconLabel icon={<FaShip />} label="Seabus" to="/seabus" />
                <IconLabel icon={<FaBus />} label="公車追蹤" to="/bus" />
                <IconLabel icon={<FaCog />} label="設定" to="/settings" />
              </View>

              {/* 警示跑馬燈 */}
              <div style={webStyles.alertContainer}>
                <div style={webStyles.alertText} className="marquee">
                  🚨 秋季服務變更。我們將增加 99 號公車班次，縮短工作日以及週日和假日早上的候車時間。
                </div>
              </div>

              {/* 功能按鈕區塊 */}
              <View style={styles.buttonGrid}>
                <NavButton icon={<FaSearch />} label="路線搜尋" to="/search" color="#2D0AFF" />
                <NavButton icon={<FaLocationArrow />} label="附近站牌" to="/nearby" color="#00C2A8" />
                <NavButton icon={<FaMapMarkedAlt />} label="路線規劃" to="/planner" color="#FF8C00" />
                <NavButton icon={<FaStar />} label="常用站牌" to="/favorites" color="#FF4D4D" />
              </View>
            </View>
          }
        />
        {/* 路由區塊 */}
        <Route path="/bike" element={<BikePage />} />
        <Route path="/skytrain" element={<SkytrainPage />} />
        <Route path="/train" element={<TrainPage />} />
        <Route path="/seabus" element={<SeabusPage />} />
        <Route path="/bus" element={<BusTrackerPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/nearby" element={<NearbyPage />} />
        <Route path="/planner" element={<PlaceholderPage title="路線規劃" />} />
        <Route path="/favorites"element={<FavoritesPage />} />
        <Route path="/stop/:stopId" element={<StopDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

// 🔹 圖示 + 標籤元件（加上跳轉）
function IconLabel({ icon, label, to }: { icon: JSX.Element; label: string; to: string }) {
  return (
    <Link to={to} style={styles.iconLink}>
      <View style={styles.iconLabel}>
        {icon}
        <Text style={styles.iconText}>{label}</Text>
      </View>
    </Link>
  );
}

// 🔹 功能按鈕元件（支援自訂顏色）
function NavButton({ icon, label, to, color }: { icon: JSX.Element; label: string; to: string; color: string }) {
  return (
    <Link to={to} style={styles.navLink}>
      <Pressable style={[styles.navButton, { backgroundColor: color }]}>
        {icon}
        <Text style={styles.navText}>{label}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9'
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Noto Sans',
    textAlign: 'center',
    marginBottom: 24,
    color: '#2D0AFF'
  },
  iconRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  iconLink: {
    textDecorationLine: 'none',
    width: '30%',
    marginBottom: 16
  },
  iconLabel: {
    alignItems: 'center'
  },
  iconText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Noto Sans'
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  navLink: {
    width: '48%',
    marginBottom: 16,
    textDecorationLine: 'none'
  },
  navButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  navText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    fontFamily: 'Noto Sans'
  },
  page: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80
  },
  pageText: {
    fontSize: 18,
    color: '#666'
  }
});

// 🔹 Web 專用樣式（跑馬燈）
const webStyles = {
  alertContainer: {
    height: 32,
    overflow: 'hidden',
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    marginBottom: 24,
    padding: '0 8px',
    display: 'flex',
    alignItems: 'center'
  },
  alertText: {
    fontSize: 14,
    color: '#856404',
    fontWeight: 500,
    fontFamily: 'Noto Sans',
    whiteSpace: 'nowrap'
  }
};
