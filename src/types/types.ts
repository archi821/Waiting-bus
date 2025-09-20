// GTFS 基本型別

export type Stop = {
  stop_id: string;
  stop_name: string;
};

export type StopTime = {
  trip_id: string;
  stop_id: string;
  stop_sequence: string;
  departure_time: string;
  arrival_time: string;
};

export type Trip = {
  trip_id: string;
  route_id: string;
  service_id: string;
  trip_headsign: string;
};

// 查詢結果型別

export type Result = {
  trip_id: string;
  departure_time: string;
  arrival_time: string;
};
