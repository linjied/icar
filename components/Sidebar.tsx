
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', icon: 'fa-chart-line', label: '控制台' },
    { id: 'fleet', icon: 'fa-truck', label: '车辆列表' },
    { id: 'maintenance', icon: 'fa-tools', label: '维护管理' },
    { id: 'fuel', icon: 'fa-gas-pump', label: '燃油日志' },
    { id: 'insights', icon: 'fa-brain', label: 'AI 智能洞察' }
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full md:relative md:w-64 bg-slate-900 text-white md:h-screen z-50 flex md:flex-col shadow-xl">
      <div className="hidden md:flex items-center justify-center py-8 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <i className="fas fa-bolt text-xl"></i>
          </div>
          <span className="text-xl font-bold tracking-tight">极点车队</span>
        </div>
      </div>
      
      <nav className="flex flex-1 justify-around md:flex-col md:py-6 md:px-4 overflow-x-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col md:flex-row items-center gap-2 md:gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === item.id 
                ? 'text-indigo-400 bg-slate-800 md:text-white md:bg-indigo-600' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <i className={`fas ${item.icon} text-lg`}></i>
            <span className="text-[10px] md:text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="hidden md:block p-6 mt-auto border-t border-slate-800">
        <div className="flex items-center gap-3">
          <img src="https://picsum.photos/seed/user/100" className="w-10 h-10 rounded-full border-2 border-indigo-500" alt="头像" />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">管理员用户</p>
            <p className="text-xs text-slate-400 truncate">车队经理</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
