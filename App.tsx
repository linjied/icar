
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FleetList from './components/FleetList';
import InsightsPanel from './components/InsightsPanel';
import { Vehicle, VehicleStatus, MaintenanceRecord, FuelLog } from './types';
import { INITIAL_VEHICLES } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>([]);
  const [fuelLogs, setFuelLogs] = useState<FuelLog[]>([]);

  // Local storage persistence
  useEffect(() => {
    const savedVehicles = localStorage.getItem('zenith_vehicles');
    if (savedVehicles) setVehicles(JSON.parse(savedVehicles));
    
    const savedMaintenance = localStorage.getItem('zenith_maintenance');
    if (savedMaintenance) setMaintenance(JSON.parse(savedMaintenance));
  }, []);

  useEffect(() => {
    localStorage.setItem('zenith_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('zenith_maintenance', JSON.stringify(maintenance));
  }, [maintenance]);

  const addMaintenanceRecord = (record: MaintenanceRecord) => {
    setMaintenance(prev => [record, ...prev]);
    // 同时也更新对应车辆的最后保养日期和状态（如果需要）
    setVehicles(prev => prev.map(v => 
      v.id === record.vehicleId 
        ? { ...v, lastServiceDate: record.date, mileage: Math.max(v.mileage, record.mileageAtService) } 
        : v
    ));
  };

  const updateVehicleStatus = (id: string, status: VehicleStatus) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, status } : v));
  };

  const deleteVehicle = (id: string) => {
    if (confirm('您确定要从车队中移除这辆车吗？')) {
      setVehicles(prev => prev.filter(v => v.id !== id));
    }
  };

  const getTabTitle = () => {
    switch(activeTab) {
      case 'dashboard': return '控制台仪表盘';
      case 'fleet': return '车队列表管理';
      case 'maintenance': return '车辆维护保养';
      case 'fuel': return '燃油消耗日志';
      case 'insights': return 'AI 智能决策支持';
      default: return '管理系统';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard vehicles={vehicles} />;
      case 'fleet':
        return <FleetList vehicles={vehicles} onUpdateStatus={updateVehicleStatus} onDelete={deleteVehicle} />;
      case 'insights':
        return <InsightsPanel vehicles={vehicles} maintenance={maintenance} />;
      default:
        return (
          <div className="flex items-center justify-center h-full py-20 bg-white rounded-3xl border border-slate-100">
            <div className="text-center">
              <i className="fas fa-hammer text-4xl text-slate-200 mb-4"></i>
              <h2 className="text-xl font-bold text-slate-400">功能开发中</h2>
              <p className="text-slate-400">我们正在努力为您带来这个功能，敬请期待。</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 flex-col md:flex-row pb-20 md:pb-0">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-4 md:p-10 max-w-7xl mx-auto w-full">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{getTabTitle()}</h1>
            <p className="text-slate-500 mt-1">高效地监控、管理和优化您的车队运营。</p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors">
              <i className="fas fa-file-export"></i>
              导出报告
            </button>
            <button 
              onClick={() => setActiveTab('fleet')}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
            >
              <i className="fas fa-plus"></i>
              添加新车辆
            </button>
          </div>
        </header>

        <section className="animate-in fade-in duration-700">
          {renderContent()}
        </section>
      </main>
      
      {/* Mobile Floating Action Button */}
      <button 
        className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 text-xl"
        onClick={() => alert("添加车辆功能即将上线！")}
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default App;
