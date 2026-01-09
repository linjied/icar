
import React, { useState } from 'react';
import ReactMarkdown from 'https://esm.sh/react-markdown';
import { getFleetInsights } from '../services/geminiService';
import { Vehicle, MaintenanceRecord } from '../types';

interface InsightsPanelProps {
  vehicles: Vehicle[];
  maintenance: MaintenanceRecord[];
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ vehicles, maintenance }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    setLoading(true);
    const result = await getFleetInsights(vehicles, maintenance);
    setInsight(result || null);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Gemini AI 智能车队洞察</h2>
            <p className="text-indigo-100 opacity-90 leading-relaxed">
              利用先进的人工智能技术分析您的车队表现。我们的模型可以预测维护需求，识别燃油优化模式，并提供战略性的物流建议，助您降低成本、提高效率。
            </p>
          </div>
          <button 
            onClick={generateInsights}
            disabled={loading}
            className={`px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <><i className="fas fa-circle-notch fa-spin"></i> 正在分析车队数据...</>
            ) : (
              <><i className="fas fa-brain"></i> 生成 AI 报告</>
            )}
          </button>
        </div>
        
        {/* Abstract shapes for background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl -ml-20 -mb-20"></div>
      </div>

      {insight ? (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 prose prose-slate max-w-none animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 mb-6 text-indigo-600">
            <i className="fas fa-sparkles"></i>
            <h3 className="text-xl font-bold m-0">车队分析报告 (由 Gemini 提供)</h3>
          </div>
          <ReactMarkdown>{insight}</ReactMarkdown>
        </div>
      ) : (
        !loading && (
          <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <i className="fas fa-magic text-2xl"></i>
            </div>
            <p className="text-slate-500 font-medium">点击上方按钮，开始对您的车队进行 AI 深度分析。</p>
          </div>
        )
      )}
    </div>
  );
};

export default InsightsPanel;
