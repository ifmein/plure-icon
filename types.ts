export interface IconGenerationState {
  isLoading: boolean;
  imageUrl: string | null;
  error: string | null;
}

export interface IconPromptOptions {
  theme: string;
  style: string;
  backgroundColor: string;
  shape: string;
  additionalDetails: string;
}

export const DEFAULT_OPTIONS: IconPromptOptions = {
  theme: "Email Whitelist (Envelope with Shield/Checkmark)",
  style: "Minimalist, Flat, Vector Art",
  backgroundColor: "Solid Color (No Gradient)",
  shape: "Square (Sharp Corners, No Radius)",
  additionalDetails: "High contrast, professional, clean lines, white or light icon on dark solid background, or vice versa."
};