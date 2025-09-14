declare module '*.json' {
  const value: {
    stop_id: string;
    stop_name: string;
    stop_lat: string;
    stop_lon: string;
    [key: string]: any;
  }[];
  export default value;
}
