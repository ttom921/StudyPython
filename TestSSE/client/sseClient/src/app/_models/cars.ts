import { CarGroup } from './car-group';

// export class Car {
//   id: number;
//   company_id: number;
//   server_id: number;
//   car_uid: string;
//   car_group: CarGroup;
//   car_group_id: number;
//   car_password: string;
//   car_id_pic: string;
//   dvr_uid: string;
//   is_action: boolean;
//   created_time: Date;
//   modified_time: Date;
//   deleted_time: Date;
//   car_disk_total: number;
//   car_disk_used: number;
//   fw_enable_update: number;
//   fw_update_status: string;
//   fw_update_progress: number;
// }
//Car 基本資料.
export interface Car {
  //is_action: boolean;//Car 是否驗證通過
  id?: number; //Car ID
  //server?: number;//Car分配到的Server ID
  //dvr_uid: string;//多的
  //created_time?: Date;//Car 第一次註冊時間(註冊後不會再改變)
  //modified_time?: Date;//Car 最近上傳資料的時間
  car_uid: string;//車牌
  //car_group_id?: number;//Car group ID
  //car_disk_used?: number;// Car在Server已經儲存Video的容量
  //car_disk_total?: number;//Car在Server能儲存Video的最大容量
  //fw_enable_update?: number;// Enable remote FW update.
  //fw_update_status?: string;//Remote FW update 狀態.
  fw_update_progress?: number;//Remote FW update 進度.
}
