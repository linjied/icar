
import React, { useState } from 'react';
import { Vehicle, VehicleStatus } from '../types';

interface FleetListProps {
  vehicles: Vehicle[];
  onUpdateStatus: (id: string, status: VehicleStatus) => void;
  onDelete: (id: string) => void;
}

const FleetList: React.FC<FleetListProps> = ({ vehicles, onUpdateStatus, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const filteredVehicles = vehicles.filter(v => 
    v.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.make.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: VehicleStatus) => {
    switch(status) {
      case VehicleStatus.ACTIVE: return 'text-emerald-700 bg-emerald-50 border-emerald-100';
      case VehicleStatus.MAINTENANCE: return 'text-amber-700 bg-amber-50 border-amber-100';
      case VehicleStatus.RETIRED: return 'text-slate-700 bg-slate-50 border-slate-100';
      default: return 'text-rose-700 bg-rose-50 border-rose-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-slate-800">车队资产清单</h3>
        <div className="relative w-full md:w-72">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            placeholder="搜索车牌、型号或品牌..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">车辆详情</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">车牌号</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">总里程</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">最近保养</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredVehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={vehicle.image} alt={vehicle.model} className="w-10 h-10 rounded-lg object-cover shadow-sm" />
                    <div>
                      <p className="font-semibold text-slate-800">{vehicle.make} {vehicle.model}</p>
                      <p className="text-xs text-slate-500">{vehicle.year}款</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm font-semibold text-slate-700">{vehicle.plateNumber}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{vehicle.mileage.toLocaleString()} km</td>
                <td className="px-6 py-4 text-sm text-slate-600">{vehicle.lastServiceDate}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button 
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="查看详情"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button 
                    onClick={() => onUpdateStatus(vehicle.id, VehicleStatus.MAINTENANCE)}
                    className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                    title="送去维修"
                  >
                    <i className="fas fa-tools"></i>
                  </button>
                  <button 
                    onClick={() => onDelete(vehicle.id)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    title="移除车辆"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredVehicles.length === 0 && (
        <div className="py-20 text-center text-slate-400">
          <i className="fas fa-truck-pickup text-4xl mb-4 opacity-20"></i>
          <p>没有找到符合搜索条件的车辆。</p>
        </div>
      )}

      {/* 车辆详情模态框 */}
      {selectedVehicle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="relative h-48 sm:h-64">
              <img 
                src={selectedVehicle.image} 
                alt={selectedVehicle.model} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedVehicle(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all"
              >
                <i className="fas fa-times"></i>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-6 text-white">
                <h2 className="text-2xl font-bold">{selectedVehicle.make} {selectedVehicle.model}</h2>
                <p className="opacity-90">{selectedVehicle.year}款 · {selectedVehicle.plateNumber}</p>
              </div>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">车辆基础信息</h4>
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                    <i className="fas fa-id-card"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">车牌号码</p>
                    <p className="font-bold text-slate-800">{selectedVehicle.plateNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">累计里程</p>
                    <p className="font-bold text-slate-800">{selectedVehicle.mileage.toLocaleString()} km</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">车辆年份</p>
                    <p className="font-bold text-slate-800">{selectedVehicle.year} 年</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">运营详情</h4>
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">指定驾驶员</p>
                    <p className="font-bold text-slate-800">{selectedVehicle.driverName || '未指派'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                    <i className="fas fa-history"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">最近保养日期</p>
                    <p className="font-bold text-slate-800">{selectedVehicle.lastServiceDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedVehicle.status === VehicleStatus.ACTIVE ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                  }`}>
                    <i className={`fas ${selectedVehicle.status === VehicleStatus.ACTIVE ? 'fa-check' : 'fa-exclamation'}`}></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">当前状态</p>
                    <p className="font-bold text-slate-800">{selectedVehicle.status}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setSelectedVehicle(null)}
                className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-all"
              >
                关闭详情
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetList;
