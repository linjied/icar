
import { GoogleGenAI } from "@google/genai";
import { Vehicle, MaintenanceRecord } from "../types";

export const getFleetInsights = async (vehicles: Vehicle[], maintenance: MaintenanceRecord[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const fleetSummary = vehicles.map(v => ({
    model: `${v.make} ${v.model}`,
    mileage: v.mileage,
    lastService: v.lastServiceDate,
    status: v.status
  }));

  const prompt = `
    请分析以下车队数据，并为车队经理提供专业的战略洞察。
    请始终使用中文回答。
    重点关注：
    1. 维护优先级（哪些车辆需要紧急关注？）。
    2. 基于里程和维修历史的预估风险因素。
    3. 成本控制和运营优化的建议。
    
    数据：
    车辆列表：${JSON.stringify(fleetSummary)}
    近期维护记录：${JSON.stringify(maintenance.slice(0, 5))}
    
    请使用清晰的 Markdown 格式输出，包含标题和列表。内容要精炼且具有洞察力。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "暂时无法生成洞察报告。请检查您的网络连接或 API 配置。";
  }
};
