export const styles: { [key: string]: React.CSSProperties } = {
  tripRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
    alignItems: 'stretch',
  },

  leftCard: {
    flex: '1 1 60%',
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  trainNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
  },

  arrivalDate: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    lineHeight: 1.4,
  },

  leftContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  columnLeft: {
    textAlign: 'right',
    flex: '0 0 33%',
  },

  columnCenter: {
    textAlign: 'center',
    flex: '0 0 34%',
  },

  columnRight: {
    textAlign: 'left',
    flex: '0 0 33%',
  },

  place: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  time: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 4,
  },

  zone: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },

  priceCard: {
    flex: '0 0 120px',
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },

  priceHeader: {
    backgroundColor: '#000',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    padding: '12px 8px',
    textAlign: 'center',
  },

  priceBody: {
    backgroundColor: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    padding: '16px 8px',
    textAlign: 'center',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};




