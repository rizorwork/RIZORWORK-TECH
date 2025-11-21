export interface ConsentItemData {
  id: string;
  text: string;
  required: boolean;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  consents: Record<string, boolean>;
  signature: string | null; // Base64 string
}

export interface TreatmentInstruction {
  item: string;
  timing: string;
}