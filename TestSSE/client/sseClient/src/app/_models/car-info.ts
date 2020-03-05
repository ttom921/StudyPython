import { Car } from './cars';

//公司資料.
export interface Company {
  id?: number;//Company ID.
  name: string;
  address?: string;
  tel?: string;
}

// Car 狀態.
export interface CarStatus {
  name: string;// Online (string) - 車輛狀態名稱.
  id?: number;// 1 (int) - 車輛狀態ID. 1: Online. 2: Offline
}
//DVR ports.
export interface DVRPorts {
  web?: number;// 80 (int) - Web Servic port.
  stream?: number;// 554 (int) - RTSP port.
  ctrl?: number;// 8080 (int) - Controle port.
}
export interface CarInfo {
  id?: number;//DVR ID.
  //dvr_sensor_num?: number;// 輸入控制點數量.
  //dvr_ext_dev_num?: number;//外接控制點數量.
  //dvr_timezone: +28800(string) - DVR timezone: +28800.
  //dvr_utc_time: 1550450864(int) - DVR UTC時間.
  //driver?: string;//駕駛名稱.
  //dvr_ch_num?: number;// 頻道數量.
  dvr_uid?: string;//DVR UID.
  //dvr_gateway?: string;// 122.123.111.254(string) - DVR Gateway.
  //dvr_ip?: string;//172.18.1.11(string) - DVR IP address.
  dvr_model?: string;// 1(string) - DVR model.
  //dvr_net_mode?: string;// 1(string) - DVR網路連線方式: LAN, WIFI, WWAN.
  //dvr_location?: string;// Taipei(string) - DVR的location名稱.
  //dvr_api_ver?: string;// v0;.2(string); - DVR的server; api; version.
  //gps_fix?: boolean;//: true(bool) - GPS; 是否定位.
  //gps_longitude?: number;// 1.0(float) - GPS; 經度.
  //gps_latitude?: number;// 1.0(float) - GPS; 緯度.
  //gps_altitude?: number;// 1.0(float) - GPS; 高度.
  //gps_sat_num?: number;// 1.0(float) - GPS; 衛星數量.
  //heading?: number;//1.0(float) - 車輛方向.
  //ign?: boolean;// 1(bool) - 車輛是否啟動.
  //speed?: number;// 1.0(float) - 車輛速度.
  version?: string;// 1(string) - DVR; FW; 版本.
  //audio_codec?: string;// 1(string) - DVR; audio編碼方式: alaw.
  //video_codec?: string;// 1(string) - DVR; video編碼方式: H264, H265.;
  company: Company;//公司資料.
  car: Car;//Car 基本資料.
  //car_status: CarStatus;//Car 狀態.
  //dvr_ports: DVRPorts;//DVR ports
  //live_resolution?: [];//Live Video 各個channel live的Resolution和camera狀態.
}
