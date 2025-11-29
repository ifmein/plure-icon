import { GoogleGenAI } from "@google/genai";
import { IconPromptOptions } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateIconImage = async (options: IconPromptOptions): Promise<string> => {
  try {
    const prompt = `
      Create a high-quality application icon.
      Theme: ${options.theme}
      Style: ${options.style}
      Background: ${options.backgroundColor}
      Shape: ${options.shape}
      Details: ${options.additionalDetails}
      
      Constraint Checklist & Confidence Score:
      1. Minimalist? Yes.
      2. Whitelist/Email theme? Yes.
      3. No Gradients? Yes.
      4. Sharp Square? Yes.
      
      Output a single, high-resolution icon image.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      // Note: responseMimeType and imageConfig are not fully supported on flash-image in all environments yet,
      // but standard text prompt generation works for returning inline image data.
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No candidates returned from the model.");
    }

    const content = response.candidates[0].content;
    
    // Iterate through parts to find the image
    if (content.parts) {
      for (const part of content.parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image data found in the response. The model might have returned only text.");

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate icon.");
  }
};