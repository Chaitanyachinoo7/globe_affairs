import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface SignalBrief {
  id: string;
  title: string;
  summary: string;
  relevance: string;
  category: "Geopolitics" | "Macroeconomics" | "Trade" | "Geoeconomics" | "History";
  impactScore: number; // 1-10
  historicalPrecedent: string;
  actors: string[];
  secondOrderImpacts: string[];
  region: string;
  status: "Emerging" | "Active" | "Cooling";
}

export async function generateSignals(region: string = "Global"): Promise<SignalBrief[]> {
  const prompt = `Generate 5 realistic intelligence-style signals for the region: ${region}.
Focus on geoeconomics, geopolitics, trade, and macroeconomics. 
Make them sound like serious intelligence briefs for analysts. 
Connect live-sounding events with historical precedents and second-order impacts.`;

  const responseTerm = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            relevance: { type: Type.STRING },
            category: { 
              type: Type.STRING,
              enum: ["Geopolitics", "Macroeconomics", "Trade", "Geoeconomics", "History"]
            },
            impactScore: { type: Type.NUMBER },
            historicalPrecedent: { type: Type.STRING },
            actors: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            secondOrderImpacts: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            region: { type: Type.STRING },
            status: { 
              type: Type.STRING,
              enum: ["Emerging", "Active", "Cooling"]
            }
          },
          required: ["id", "title", "summary", "relevance", "category", "impactScore", "historicalPrecedent", "actors", "secondOrderImpacts", "region", "status"]
        }
      }
    }
  });

  try {
    return JSON.parse(responseTerm.text || "[]");
  } catch (e) {
    console.error("Failed to parse signals", e);
    return [];
  }
}

export async function generateDeepDive(signal: SignalBrief): Promise<string> {
  const prompt = `Conduct a deep dive analysis on the following intelligence signal:
Title: ${signal.title}
Summary: ${signal.summary}
Historical Precedent: ${signal.historicalPrecedent}

Include:
1. Detailed causality chain.
2. Comparative Analysis with historical events.
3. Strategic implications for global trade and local markets.
4. Risk assessment for investors and policy makers.

Format in professional, clean Markdown.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt
  });

  return response.text || "Analysis unavailable.";
}
