import React from 'react';

export default function SkytrainPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>🚇 天車路線</h1>
      <p>以下是 TransLink 官方提供的互動地圖，可查看 Expo Line、Millennium Line、Canada Line 等路線：</p>

      <iframe
        title="TransLink Interactive Map"
        src="https://translink.maps.arcgis.com/apps/webappviewer/index.html?id=ae9b3c118ad74cea94760d7ae890267c"
        width="100%"
        height="600"
        style={{ border: 0, marginBottom: 32 }}
        allowFullScreen
      ></iframe>

      <section style={{ marginBottom: 24 }}>
        <h2>🚈 Expo Line</h2>
        <p>連接 Waterfront 至 King George 與 Production Way–University，途經市中心、Metrotown、New Westminster 等主要地區。</p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>🚈 Millennium Line</h2>
        <p>從 VCC–Clark 到 Lafarge Lake–Douglas，途經 Brentwood、Lougheed、Coquitlam 等地，與 Expo 線交會於多個站點。</p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>🚈 Canada Line</h2>
        <p>連接 Waterfront 至 Richmond–Brighouse 與 YVR Airport，是通往機場與南溫哥華的主要路線。</p>
      </section>
    </div>
  );
}

