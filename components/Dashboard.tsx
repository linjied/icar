
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Vehicle, VehicleStatus } from '../types';

interface DashboardProps {
  vehicles: Vehicle[];
}

const Dashboard: React.FC<DashboardProps> = ({ vehicles }) => {
  const stats = [
    { label: '车队总数', value: vehicles.length, icon: 'fa-truck-moving', color: 'bg-blue-500' },
    { label: '活跃中', value: vehicles.filter(v => v.status === VehicleStatus.ACTIVE).length, icon: 'fa-check-circle', color: 'bg-emerald-500' },
    { label: '维修中', value: vehicles.filter(v => v.status === VehicleStatus.MAINTENANCE).length, icon: 'fa-wrench', color: 'bg-amber-500' },
    { label: '平均里程', value: `${Math.round(vehicles.length > 0 ? vehicles.reduce((acc, v) => acc + v.mileage, 0) / vehicles.length : 0).toLocaleString()} km`, icon: 'fa-tachometer-alt', color: 'bg-indigo-500' }
  ];

  const statusData = [
    { name: '活跃', value: vehicles.filter(v => v.status === VehicleStatus.ACTIVE).length },
    { name: '维修', value: vehicles.filter(v => v.status === VehicleStatus.MAINTENANCE).length },
    { name: '闲置/其他', value: vehicles.filter(v => v.status !== VehicleStatus.ACTIVE && v.status !== VehicleStatus.MAINTENANCE).length },
  ];

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  const mileageData = vehicles.map(v => ({
    name: v.plateNumber,
    mileage: v.mileage
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`${stat.color} text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200/50`}>
              <i className={`fas ${stat.icon} text-xl`}></i>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-6 text-slate-800">车辆里程概览</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mileageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Bar dataKey="mileage" name="总里程" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-6 text-slate-800">车辆运营状态</h3>
          <div className="h-[300px] flex flex-col md:flex-row items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4 md:mt-0 md:pl-8">
              {statusData.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                  <span className="text-sm font-medium text-slate-600">{s.name}: {s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
