
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { Message } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;
  private static instance: GeminiService;

  private constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  async queryHealth(prompt: string, history: Message[]): Promise<{ text: string; urls: Array<{ title: string; uri: string }> }> {
    try {
      const contents = history.map(m => ({
        role: m.role === 'user' ? 'user' : ('model' as const),
        parts: [{ text: m.content }]
      }));
      contents.push({ role: 'user', parts: [{ text: prompt }] });

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: `Du bist der offizielle KI-Assistent des Nationalen Klimaportals für Heinsberg. 
          Dein Ton ist autoritär, klar, faktenbasiert und professionell. 
          Konzentriere dich auf evidenzbasierte Informationen zum Klimaschutz, lokalen Umweltrichtlinien und nachhaltigem Leben.
          Gib konkrete Tipps zum Energiesparen, CO2-Reduktion und Anpassung an Extremwetterereignisse.
          Nutze die Google-Suche, um deine Antworten mit aktuellen Klimadaten und offiziellen Regierungsrichtlinien zu untermauern.`,
          tools: [{ googleSearch: {} }]
        },
      });

      const text = response.text || "Es tut mir leid, ich konnte diese Anfrage momentan nicht verarbeiten.";
      
      const urls = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map((chunk: any) => ({
          title: chunk.web?.title || 'Quelle',
          uri: chunk.web?.uri || ''
        }))
        .filter((item: any) => item.uri !== '') || [];

      return { text, urls };
    } catch (error) {
      console.error("Gemini Query Error:", error);
      throw error;
    }
  }
}
