
import { Vehicle, VehicleStatus } from './types';

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: '1',
    plateNumber: '京A-6721ZX',
    model: 'Model 3',
    make: '特斯拉',
    year: 2022,
    status: VehicleStatus.ACTIVE,
    mileage: 12500,
    lastServiceDate: '2023-11-15',
    driverName: '张三',
    image: 'https://picsum.photos/seed/tesla/400/300'
  },
  {
    id: '2',
    plateNumber: '沪B-882AB',
    model: 'F-150 Lightning',
    make: '福特',
    year: 2023,
    status: VehicleStatus.MAINTENANCE,
    mileage: 4200,
    lastServiceDate: '2024-01-20',
    driverName: '李四',
    image: 'https://picsum.photos/seed/ford/400/300'
  },
  {
    id: '3',
    plateNumber: '粤Z-104CC',
    model: 'Sprinter',
    make: '梅赛德斯-奔驰',
    year: 2021,
    status: VehicleStatus.ACTIVE,
    mileage: 45600,
    lastServiceDate: '2023-09-10',
    driverName: '王五',
    image: 'https://picsum.photos/seed/mercedes/400/300'
  }
];

export const SERVICE_TYPES = [
  '更换机油',
  '轮胎动平衡',
  '刹车系统检查',
  '发动机调校',
  '变速箱保养',
  '年度安检'
];
