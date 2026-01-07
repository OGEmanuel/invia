// store.ts
import { create } from 'zustand';

interface FormState {
  isFormSubmitting: boolean;
  setFormSubmitting: (submitting: boolean) => void;
}

export const useFormStore = create<FormState>(set => ({
  isFormSubmitting: false,
  setFormSubmitting: submitting => set({ isFormSubmitting: submitting }),
}));
