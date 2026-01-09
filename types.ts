
export enum VehicleStatus {
  ACTIVE = '活跃',
  MAINTENANCE = '维修中',
  INACTIVE = '闲置',
  RETIRED = '已报废'
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  model: string;
  year: number;
  make: string;
  status: VehicleStatus;
  mileage: number;
  lastServiceDate: string;
  driverName?: string;
  image: string;
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  date: string;
  type: string;
  description: string;
  cost: number;
  mileageAtService: number;
}

export interface FuelLog {
  id: string;
  vehicleId: string;
  date: string;
  liters: number;
  cost: number;
  mileageAtFill: number;
}
