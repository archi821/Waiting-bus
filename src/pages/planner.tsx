export default function PlannerPage() {
  return (
    <div style={{
      margin: 0,
      fontFamily: 'Segoe UI, sans-serif',
      textAlign: 'center',
      padding: '48px 24px'
    }}>
      {/* 標題區塊 */}
      <div style={{
        backgroundColor: '#3553B9',
        color: '#FFD200',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 12,
        position: 'relative'
      }}>
        <a href="/main_ui" style={{
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#FFD200',
          textDecoration: 'none',
          fontSize: 20
        }}>
          ⬅️
        </a>
        行程規劃
      </div>

      {/* 內容區塊 */}
      <p style={{ marginTop: 48 }}>
        在 Trip Planner 上查看路線時刻表、獲取即時下一班巴士出發資訊以及交通提醒。
      </p>

      <a
        href="https://tripplanning.translink.ca/#/app/tripplanning"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          marginTop: 24,
          padding: '12px 24px',
          fontSize: 18,
          backgroundColor: '#3553B9',
          color: '#FFD200',
          textDecoration: 'none',
          borderRadius: 8,
          boxShadow: '0 0 4px rgba(0,0,0,0.2)'
        }}
      >
        前往 TransLink 行程規劃
      </a>
    </div>
  );
}
